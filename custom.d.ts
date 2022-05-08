declare namespace Express {
  export interface Request extends Express.Request {
    user: RequestUserInfo;
  }
}
type RequestUserInfo = {
  sub: string;
};
