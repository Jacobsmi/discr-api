import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import UserController from "./controllers/userController";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

const issuer = process.env.AUTH0_ISSUER;
const audience = process.env.AUTH0_AUDIENCE;

if (!issuer || !audience) {
  throw new Error("Failed to initialize Auth0");
}
app.use(
  auth({
    audience: audience,
    issuerBaseURL: `https://${issuer}`,
  })
);

app.use("/user", UserController);

app.listen(PORT, () =>
  console.log(`API listening at http://localhost:${5000}`)
);
