import { FirestoreTimestamp } from './FirestoreTimestamp';

export interface User {
  id: number;
  favouriteTournaments: number[];
  uploads: any[];
  favourites: number[];
  osuweb: OsuwebUser;
  private?: Private;
  paidFeaturesAccess?: boolean;
  hasActiveTwitchSub?: boolean;
}

export interface OsuwebUser {
  id: number;
  username: string;
  country_code: string;
  country: {
    name: string;
  };
  statistics: {
    country_rank: number;
    global_rank: number;
  };
  avatar_url: string;
  cover: {
    url: string;
  };
  cover_url: string;
}

interface Private {
  linkedTwitchAccount: LinkedTwitchAccount;
  twitchError: boolean;
  twitchToken: TwitchToken;
  stripeSubscriptionId: string;
  stripeCustomer: StripeCustomer;
  subscriptionExpiryDate: FirestoreTimestamp;
  paypalSubscriptionId: string;
}

interface LinkedTwitchAccount {
  displayName: string;
  name: string;
  id: string;
}

export interface TwitchToken {
  expiresIn: number;
  scope: string[];
  obtainmentTimestamp: number;
  accessToken: string;
  refreshToken: string;
}

interface StripeCustomer {
  id: string;
  email: string;
}
