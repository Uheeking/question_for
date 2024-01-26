const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    title: "Uheeking 무물",
    description: "Uheeking에게 궁금한 것을 물어보세요!",
  },
  host: "http://localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swaggerFile/swagger-output.json";
const endpointsFiles = ["../api/*"];

swaggerAutogen(outputFile, endpointsFiles, doc);
