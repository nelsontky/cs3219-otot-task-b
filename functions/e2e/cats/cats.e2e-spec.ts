import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { CatsModule } from "../../src/cats/cats.module";
import { CatsService } from "../../src/cats/cats.service";
import { CreateCatDto } from "../../src/cats/dto/create-cat.dto";
import { UpdateCatDto } from "../../src/cats/dto/update-cat.dto";

describe("Cats", () => {
  let app: INestApplication;
  let catsService = {
    findAll: () => [{ id: "abc", name: "Garfield", age: 3 }],
    findOne: (id: string) => [{ id, name: "Garfield", age: 3 }],
    create: (createCatDto: CreateCatDto) => ({}),
    update: (id: string, updateCatDto: UpdateCatDto) => ({}),
    remove: (id: string) => ({}),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe("/GET cats", () => {
    it("should return an array of cats", () => {
      return request(app.getHttpServer())
        .get("/cats")
        .expect(200)
        .expect(catsService.findAll());
    });

    it("should return a single cat", () => {
      return request(app.getHttpServer())
        .get("/cats/abc")
        .expect(200)
        .expect(catsService.findOne("abc"));
    });
  });

  describe(`/POST cats`, () => {
    it("should return an empty body and 201 on success", () => {
      const tom = {
        name: "Tom",
        age: 5,
      };

      return request(app.getHttpServer())
        .post("/cats")
        .send(tom)
        .expect(201)
        .expect(catsService.create(tom));
    });

    it("should return 400 for invalid input", () => {
      const tom = {
        name: 7331,
        age: "5",
      };

      return request(app.getHttpServer()).post("/cats").send(tom).expect(400);
    });
  });

  describe(`/PUT cats`, () => {
    it("should return an empty body and 201 on success", () => {
      const tom = { name: "Tom" };
      return request(app.getHttpServer())
        .put("/cats/abc")
        .send(tom)
        .expect(200)
        .expect(catsService.update("abc", tom));
    });
  });

  describe(`/DELETE cats`, () => {
    it("should return an empty body and 200 on success", () => {
      return request(app.getHttpServer())
        .delete("/cats/abc")
        .expect(200)
        .expect(catsService.remove("abc"));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
