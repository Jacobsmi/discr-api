import { PrismaClient } from "@prisma/client";

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
}
