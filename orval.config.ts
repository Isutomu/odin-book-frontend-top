import { defineConfig } from "orval";

export default defineConfig({
  "odin-book-api": {
    output: {
      mode: "split",
      httpClient: "fetch",
      client: "react-query",
      target: "./src/api/endpoints.ts",
      baseUrl: process.env.API_URL,
      mock: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: true,
        },
      },
    },
    input: {
      target: "./openapi-schema.yaml",
    },
  },
});
