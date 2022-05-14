import express, { Request, Response } from "express";
import {} from "express-oauth2-jwt-bearer";
import parseToken from "../middleware/parseToken";
import { UserService } from "../services/userService";

const UserController = express.Router();
const userService = new UserService();

UserController.get("/", parseToken, async (req, res) => {
  return userService
    .getUser(req.user.sub)
    .then((data) => {
      return res.status(200).send({ user: data });
    })
    .catch((err) => {
      if (err === "user_not_found") return res.status(404).send({ error: err });
      else return res.status(500).send({ error: err });
    });
});

UserController.post("/", parseToken, async (req: Request, res: Response) => {
  return userService
    .createUser(req.user.sub, req.body)
    .then(() => {
      return res.status(200).send({});
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });
});

export default UserController;
