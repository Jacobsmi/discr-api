import { NewUserData } from "../models/users";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserIdentity(sub: string) {
    return this.userRepository.getUserIdentity(sub);
  }

  async createUser(sub: string, newUserData: NewUserData) {
    const userIdentity = await this.userRepository.createUserIdentity(sub);
    await this.userRepository.createUserData(userIdentity.id, newUserData);
  }
}
