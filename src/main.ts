import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Davi Carvalho - Code Chalenge')
    .setDescription(
      'Criar uma API REST em Node e MySQL que gerencie e disponibilize uma agenda de contatos de pessoas. Neste sistema, deve conter: \n\n - Endpoint para cadastro, edição, exclusão e listagem de contatos. \n - Cada contato deve conter apenas: .Id .Primeiro Nome .Último Nome .E-mail .Telefones (muitos - plural) \n\n - Todos os campos acima são obrigatórios. \n\n - O usuário deve ter no mínimo 1 telefone. \n\n - Na listagem, deve ser possível realizar filtro por nomes ou email.'
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: 'CSP API - Docs'
  })

  await app.listen(3000)
}
bootstrap()
