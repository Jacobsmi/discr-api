import { PrismaClient } from "@prisma/client";
import { NewUserData } from "../models/users";

export class UserRepository {
  private readonly prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  async getUserIdentity(sub: string) {
    return this.prismaClient.userIdentity.findUnique({
      where: { auth0Sub: sub },
    });
  }

  async createUserIdentity(sub: string) {
    return this.prismaClient.userIdentity.create({ data: { auth0Sub: sub } });
  }
  async createUserData(id: number, newUserData: NewUserData) {
    return this.prismaClient.userData.create({
      data: {
        id: id,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
      },
    });
  }
}
