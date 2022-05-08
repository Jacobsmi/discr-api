import { NextFunction, Request, Response } from "express";
import jwtDecode from "jwt-decode";

interface Auth0Token {
  sub: string;
}

function parseToken(req: Request, res: Response, next: NextFunction) {
  const user: RequestUserInfo = { sub: "" };
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ status: "failure", message: "no authorization" });
  }
  const token = req.headers.authorization;
  token.replace("Bearer ", "");
  const decodedToken: Auth0Token = jwtDecode(token);
  if (!decodedToken.sub) {
    return res.status(401).send({ status: "failure", message: "no sub id" });
  }
  user.sub = decodedToken.sub;
  req.user = user;
  next();
}
export default parseToken;
