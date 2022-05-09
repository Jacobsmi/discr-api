import express, { Request, Response } from "express";
import {} from "express-oauth2-jwt-bearer";
import parseToken from "../middleware/parseToken";
import { UserService } from "../services/userService";

const UserController = express.Router();
const userService = new UserService();
UserController.get("/", parseToken, async (req, res) => {
  const user = await userService.getUserIdentity(req.user.sub);
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }
  return res.status(200).send({});
});

UserController.post("/", parseToken, async (req: Request, res: Response) => {
  const user = await userService.getUserIdentity(req.user.sub);
  if (user) {
    return res.status(400).send({ message: "user already exists" });
  }

  await userService.createUser(req.user.sub, req.body);
  return res.status(200).send({});
});

export default UserController;
