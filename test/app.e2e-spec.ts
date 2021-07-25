import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())

    await app.init()
  })

  const mockContact = {
    firstName: 'Davi',
    lastName: 'Carvalho',
    email: 'davi@davi.com',
    phones: [{ prefix: '33', number: '988888888' }]
  }
  let mockContactCreated, mockContactEdited

  describe('/contacts (POST)', () => {
    it('should reject invalid request body', async () => {
      const response = await request(app.getHttpServer()).post('/contacts').send({ ok: 'test' })

      expect(response.statusCode).toBe(400)
    })

    it('should create a new contact', async () => {
      const response = await request(app.getHttpServer()).post('/contacts').send(mockContact)
      mockContactCreated = response.body.contact
      const expectedContact = {
        ...mockContact,
        id: mockContactCreated.id,
        phones: [{ ...mockContact.phones[0], id: mockContactCreated.phones[0].id }]
      }

      expect(response.statusCode).toBe(201)
      expect(response.body.contact).toEqual(expectedContact)
    })
  })

  describe('/contact/:id, (GET)', () => {
    it('should return the mock contact', async () => {
      const response = await request(app.getHttpServer()).get(`/contact/${mockContactCreated.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.contact).toEqual(mockContactCreated)
    })
  })

  describe('/contact/:id (PUT)', () => {
    it('should edit firstName, secondName and email properties', async () => {
      const editData = {
        firstName: 'Davi Editado',
        lastName: 'Carvalho Editado',
        email: 'editado@editado.com',
        phones: mockContactCreated.phones
      }
      const response = await request(app.getHttpServer()).put(`/contact/${mockContactCreated.id}`).send(editData)
      mockContactEdited = response.body.contact

      expect(mockContactEdited).toEqual({ ...mockContactCreated, ...editData })
      expect(mockContactEdited.phones).toEqual(mockContactCreated.phones)
    })

    it('should insert phone on updated contact', async () => {
      mockContactEdited.phones = [...mockContactEdited.phones, { prefix: '99', number: '999999999' }]
      const response = await request(app.getHttpServer())
        .put(`/contact/${mockContactEdited.id}`)
        .send(mockContactEdited)

      mockContactEdited = response.body.contact

      expect(response.body.contact.phones[1].id).not.toBeUndefined()
      expect(response.body.contact.phones[1].prefix).toEqual('99')
      expect(response.body.contact.phones[1].number).toEqual('999999999')
    })

    it('should remove phone on updated contact', async () => {
      mockContactEdited.phones = [mockContactEdited.phones[0]]

      const response = await request(app.getHttpServer())
        .put(`/contact/${mockContactEdited.id}`)
        .send(mockContactEdited)

      mockContactEdited = response.body.contact

      expect(response.body.contact.phones.length).toEqual(1)
      expect(response.body.contact.phones[0].number).not.toEqual('999999999')
    })

    it('should edit phone on updated contact', async () => {
      mockContactEdited.phones = [{ id: mockContactEdited.phones[0].id, prefix: '55', number: '55555555' }]

      const response = await request(app.getHttpServer())
        .put(`/contact/${mockContactEdited.id}`)
        .send(mockContactEdited)

      mockContactEdited = response.body.contact

      expect(response.body.contact.phones.length).toEqual(1)
      expect(response.body.contact.phones[0].number).toEqual('55555555')
      expect(response.body.contact.phones[0].prefix).toEqual('55')
    })
  })

  describe('/contact/:id, (DELETE)', () => {
    it('should delete mock contact', async () => {
      const response = await request(app.getHttpServer()).delete(`/contact/${mockContactEdited.id}`)
      console.log(response.body)
      expect(response.statusCode).toBe(204)
    })
  })

  afterAll(async () => {
    if (app) await app.close()
  })
})
