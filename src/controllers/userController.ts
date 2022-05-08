import express, { Request, Response } from "express";
import {} from "express-oauth2-jwt-bearer";
import parseToken from "../middleware/parseToken";
import { UserService } from "../services/userService";

const UserController = express.Router();
const userService = new UserService();
UserController.get("/", parseToken, async (req, res) => {
  const user = await userService.getUserIdentity(req.user.sub);
  if (!user) {
    return res
      .status(404)
      .send({ status: "success", message: "user not found" });
  }
  return res.status(200).send({ status: "success" });
});

UserController.post("/", parseToken, async (req: Request, res: Response) => {
  return res.status(200).send({ status: "success" });
});

export default UserController;
