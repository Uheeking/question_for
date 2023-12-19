const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const { DB } = process.env;

beforeEach(async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
});

afterEach(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing the database connection:", error.message);
  }
});

describe("GET /api/question", () => {
  it("모든 질문 불러오기", async () => {
    const res = await request(app).get("/api/question");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("GET /api/question/:id", () => {
  it(":id에 해당되는 제품 1개만 불러오기", async () => {
    const questionId = 0;
    const response = await request(app).get(`/api/question/${questionId}`);
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body[questionId].name).toBe("유희왕");
  });
});
