import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { CatsModule } from "../../src/cats/cats.module";

describe("Cats", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe("/GET cats", () => {
    it("should return an array of cats", () => {
      return request(app.getHttpServer())
        .get("/cats")
        .expect(200)
        .expect([{ name: "Garfield", id: "0", age: 2 }]);
    });

    it("should return a single cat", () => {
      return request(app.getHttpServer())
        .get("/cats/0")
        .expect(200)
        .expect({ name: "Garfield", id: "0", age: 2 });
    });

    it("should return a 404 for a not found id", () => {
      return request(app.getHttpServer()).get("/cats/1").expect(404);
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
        .expect({});
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
      return request(app.getHttpServer())
        .put("/cats/0")
        .send({ name: "Tom" })
        .expect(200)
        .expect({});
    });

    it("should return a 404 for a not found id", () => {
      return request(app.getHttpServer())
        .put("/cats/100")
        .send({ name: "Tom" })
        .expect(404);
    });
  });

  describe(`/DELETE cats`, () => {
    it("should return an empty body and 200 on success", () => {
      return request(app.getHttpServer())
        .delete("/cats/0")
        .expect(200)
        .expect({});
    });

    it("should return a 404 for a not found id", () => {
      return request(app.getHttpServer()).delete("/cats/100").expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
