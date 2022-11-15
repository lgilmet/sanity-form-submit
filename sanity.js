import { createClient } from "next-sanity";

const sanityClient = require("@sanity/client");

// token name: "test form submitter"
const formSubmitToken =
  "skUG5Rdi38wBMBEWV5Uvw8P39MrU4kz3OR6LJVBHCA0c5jGqOg4pfyEMh0cTfF8idW1tA4mOD1vCexsYj12tMquq6xk4nY3MzdCsmCaIWdk3KF0VKkeW3zPHWKFevtbCHTOvMXDmhNuEQyNZywp9qqjdLftW6WiXgwALVwlUAR6X4Ng7q7yO";

export const config = {
  dataset: "production",
  projectId: "9at38x01",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: formSubmitToken,
};

export const client = sanityClient(config);

// export const sanityClient = createClient(config);
