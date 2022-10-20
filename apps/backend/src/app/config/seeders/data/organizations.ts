import { AssetType, AssetStatus } from '../../../models/asset.model';
import { BillingPlan, Organization } from '../../../models/organization.model';
import { DeepPartial } from './courses/liner-algebra';

export const organizations_data: DeepPartial<Organization[]> = [
  {
    name: 'Massactusetts Institute of Technology',
    description: 'Hello We Are the Best.',
    theme: {
      logo: {
        type: AssetType.IMAGE,
        status: AssetStatus.ACTIVE,
        mime: 'image/jpeg',
        name: '',
        url: 'https://pbs.twimg.com/profile_images/912676696620359680/e-G5lqVs_400x400.jpg',
      },
      theme: { primary: '#1dbf7b', secondary: '#f50057' },
    },
    billing: {
      plan: BillingPlan.BASIC,
    },
    domains: { subdomain: 'mit' },
  },
  {
    name: 'Univeristy of Sandford',
    description: 'Hello We Are the Best.',
    theme: {
      logo: {
        type: AssetType.IMAGE,
        status: AssetStatus.ACTIVE,
        mime: 'image/jpeg',
        name: '',
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/800px-Stanford_University_seal_2003.svg.png',
      },
      theme: {
        primary: '#1dbf7b',
        secondary: '#f50057',
      },
    },
    billing: {
      plan: BillingPlan.BASIC,
    },
    domains: { subdomain: 'sfd' },
  },
];
