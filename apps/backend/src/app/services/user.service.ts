import { RequestContext } from '@mikro-orm/core';
import { User, UserPreferences } from '../models/user.model';

/**
 * Service for user related functionalities
 */
export class UserService {
  get userRepo() {
    return RequestContext.getEntityManager().getRepository(User);
  }

  /**
   * finds a user from a given email
   * @param email user email
   * @returns { User | null } user if such user exists or null
   */
  async getUserByEmail(email: string) {
    return await this.userRepo.findOne(
      { email },
      { populate: ['organization'] }
    );
  }

  /**
   * finds a user by the user id throws error if cloud not be found
   * @param uid user Id
   * @returns user
   * @throws {NotFoundError}
   */
  async getUserById(uid: string) {
    return await this.userRepo.findOneOrFail({ uid });
  }

  /**
   * creates a user with the given data
   * @param data user data
   * @returns persisted user with uid
   */
  async createUser(data: Partial<User>) {
    const user = this.userRepo.create({
      name: data.name || data.email,
      picture: data.picture,
      uid: data.uid,
      email: data.email,
      timeZone: 'Asia/Colombo',
      preferences: new UserPreferences(),
    });
    await this.userRepo.persistAndFlush(user);
    return user;
  }

  async saveUser(user: User) {
    await this.userRepo.persistAndFlush(user);
    RequestContext.getEntityManager().clearCache(`user-${user.email}`);
  }

  getUsersByOrgId(orgId: string) {
    return this.userRepo.find({ organization: { orgId } });
  }
}
