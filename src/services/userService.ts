import { UserRepository } from "../repositories/userRepository";

export class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserIdentity(sub: string) {
    return this.userRepository.getUserIdentity(sub);
  }
}
