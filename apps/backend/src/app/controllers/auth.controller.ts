import { RequestContext } from '@mikro-orm/core';
import { assert } from 'console';
import { Asset } from '../models/asset.model';
import { InviteType, UserInvite } from '../models/user-invite.model';
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

  async inviteEmailToOrganization(data: { orgId: string; email: string }) {
    const em = RequestContext.getEntityManager();
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 7);

    const invite = em.create(UserInvite, {
      type: InviteType.ORGANIZATION,
      expiresAt: expireAt,
      email: data.email,
      organization: { orgId: data.orgId },
    });

    em.persistAndFlush(invite);
    return invite;
  }

  async getPendingUserInvitesForOrg(data: { orgId: string }) {
    const em = RequestContext.getEntityManager();

    return em.find(UserInvite, {
      organization: { orgId: data.orgId },
      used: false,
      type: InviteType.ORGANIZATION,
    });
  }

  async getPendingOrgInvitesForEmail(data: { email: string }) {
    const em = RequestContext.getEntityManager();

    return em.find(
      UserInvite,
      {
        email: data.email,
        used: false,
        type: InviteType.ORGANIZATION,
      },
      { populate: ['organization'] }
    );
  }

  async acceptInvite(data: { email: string; inviteId: string }) {
    const em = RequestContext.getEntityManager();

    const invite = await em.findOneOrFail(UserInvite, {
      id: data.inviteId,
      email: data.email,
    });

    assert(invite.expiresAt <= new Date());

    invite.used = true;

    if (invite.type === InviteType.ORGANIZATION) {
      const user = await this.userService.getUserByEmail(data.email);
      user.organization = invite.organization;
    } else if (invite.type === InviteType.COURSE) {
      // todo: enroll in course
    }
    em.flush();
  }
}
