import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { RegisterUserDto } from 'src/user/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true // remove field not qualified for dto
    }))
    await app.init();
    await app.listen("3333")

    pactum.request.setBaseUrl("http://localhost:3333")
  });

  afterAll(() => {
    app.close()
  })

  describe("Users", () => {
    const dto: RegisterUserDto = {
      email: "alif123@gmail.com",
      password: "12345",
      firstName: "Alif"
    }
    describe("Signup", () => {
      it("should throw if no password provided", () => {
        return pactum.spec().post("/users/register").withBody({
          email: "alif@gmail.com",
          firstName: "Alif"
        }).expectStatus(400)
      })
      it("should create user", () => {
        return pactum.spec().post("/users/register").withBody(dto).expectStatus(201).inspect()
      })
    })
  })
});
