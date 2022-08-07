import { string } from 'yup';
import { Asset } from '../models/asset.model';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';

export class AuthController {
  constructor(
    private userService: UserService,
    private orgService: OrganizationService
  ) {}

  async getUserFromRequest(payload: {
    email: string;
    uid: string;
    name: string;
    picture: string;
  }) {
    // TODO: does every payload has a email ?
    let user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      // create a user if a user does not exist in the db
      user = await this.userService.createUser({
        email: payload.email,
        uid: payload.uid,
        name: payload.name,
        picture: payload.picture,
      });
    }

    return user;
  }

  async registerAsOrganization(data: {
    userEmail: string;
    orgName: string;
    logo: any;
    description: string;
  }) {
    const user = await this.userService.getUserByEmail(data.userEmail);
    const logoAsset = Object.assign(new Asset(), data.logo);

    const orgData = {
      name: data.orgName,
      logo: logoAsset,
      description: data.description,
    };

    const org = await this.orgService.createOrg(orgData);
    user.organization = org;

    this.userService.saveUser(user);
    return user;
  }
}
