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
  let mockContactCreated, mockContactEdited, createdPhone

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

  describe('/contacts/:id, (GET)', () => {
    it('should return the mock contact', async () => {
      const response = await request(app.getHttpServer()).get(`/contacts/${mockContactCreated.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.contact).toEqual(mockContactCreated)
    })
  })

  describe('/contacts/:id (PUT)', () => {
    it('should edit firstName, secondName and email properties', async () => {
      const editData = {
        firstName: 'Davi Editado',
        lastName: 'Carvalho Editado',
        email: 'editado@editado.com',
        phones: mockContactCreated.phones
      }
      const response = await request(app.getHttpServer()).put(`/contacts/${mockContactCreated.id}`).send(editData)
      mockContactEdited = response.body.contact

      expect(mockContactEdited).toEqual({ ...mockContactCreated, ...editData })
      expect(mockContactEdited.phones).toEqual(mockContactCreated.phones)
    })
  })

  describe('/contacts/:contactId/phones (GET)', () => {
    it('should return a list of contact phones', async () => {
      const response = await request(app.getHttpServer()).get(`/contacts/${mockContactCreated.id}/phones`)

      expect(response.body.phones).toEqual(mockContactEdited.phones)
    })

    it('should return a empty array when not have contact phones', async () => {
      const response = await request(app.getHttpServer()).get(`/contacts/877897/phones`)

      expect(response.body.phones.length).toBe(0)
    })
  })

  describe('/contacts/:contactId/phones/:phoneId (GET)', () => {
    it('should return a contact phone', async () => {
      const response = await request(app.getHttpServer()).get(
        `/contacts/${mockContactCreated.id}/phones/${mockContactCreated.phones[0].id}`
      )

      expect(response.body.phone).toEqual(mockContactEdited.phones[0])
    })

    it('should return null when not have contact phone', async () => {
      const response = await request(app.getHttpServer()).get(`/contacts/877897/phones/22`)

      expect(response.body.phone).toBeNull()
    })
  })

  describe('/contact/:contactId/phone/:phoneId (PUT)', () => {
    it('should edit a contact phone', async () => {
      const payload = { prefix: '99', number: '88888888' }

      const response = await request(app.getHttpServer())
        .put(`/contacts/${mockContactCreated.id}/phones/${mockContactCreated.phones[0].id}`)
        .send(payload)
      const { body } = await request(app.getHttpServer()).get(
        `/contacts/${mockContactCreated.id}/phones/${mockContactCreated.phones[0].id}`
      )

      expect(response.statusCode).toBe(204)
      expect(body.phone).toEqual({ ...mockContactCreated.phones[0], ...payload })
    })
  })

  describe('/contact/:contactId/phone (POST)', () => {
    it("shouldn't create a contact phone when wrong data is passed", async () => {
      const payload = { prefix: '99' }

      const response = await request(app.getHttpServer())
        .post(`/contacts/${mockContactCreated.id}/phones`)
        .send(payload)

      expect(response.statusCode).toBe(400)
    })

    it('should create a contact phone', async () => {
      const payload = { prefix: '99', number: '12355547' }

      const response = await request(app.getHttpServer())
        .post(`/contacts/${mockContactCreated.id}/phones`)
        .send(payload)

      createdPhone = response.body.phone

      expect(response.statusCode).toBe(201)
      expect(response.body.phone.prefix).toEqual(payload.prefix)
      expect(response.body.phone.number).toEqual(payload.number)
    })
  })

  describe('/contact/:contactId/phones/:phoneId (DELETE)', () => {
    it('should delete a contact phone when it had at least one phone registered', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/contacts/${mockContactCreated.id}/phones/${createdPhone.id}`
      )

      expect(response.statusCode).toBe(204)
    })
    it("shouldn't delete a contact phone when it had only one phone registered", async () => {
      const response = await request(app.getHttpServer()).delete(
        `/contacts/${mockContactCreated.id}/phones/${mockContactCreated.phones[0].id}`
      )

      expect(response.statusCode).toBe(500)
    })
  })

  describe('/contacts/:id, (DELETE)', () => {
    it('should delete mock contact', async () => {
      const response = await request(app.getHttpServer()).delete(`/contacts/${mockContactEdited.id}`)

      expect(response.statusCode).toBe(204)
    })
  })

  afterAll(async () => {
    if (app) await app.close()
  })
})
