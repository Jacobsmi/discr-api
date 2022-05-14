import { NewUserData } from "../models/users";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(sub: string) {
    const userIdentity = await this.userRepository.getUserIdentity(sub);
    if (!userIdentity) {
      throw new Error("user_not_found");
    }
    const userData = await this.userRepository.getUserData(userIdentity.id);
    if (!userData) {
      throw new Error("user_data_not_found");
    }
    return userData;
  }
  async getUserIdentity(sub: string) {
    const userIdentity = await this.userRepository.getUserIdentity(sub);
    if (!userIdentity) {
    }
    return this.userRepository.getUserIdentity(sub);
  }

  async createUser(sub: string, newUserData: NewUserData) {
    const user = await this.getUserIdentity(sub);
    if (user) {
      throw new Error("user_already_exists");
    }
    const userIdentity = await this.userRepository.createUserIdentity(sub);
    await this.userRepository.createUserData(userIdentity.id, newUserData);
  }
}
