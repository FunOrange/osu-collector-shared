import { UserPrivate } from '../v2/UserPrivate';
import { FirestoreTimestamp, fromFirestoreTimestamp, toFirestoreTimestamp } from './FirestoreTimestamp';

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
  linkedTwitchAccount?: LinkedTwitchAccount;
  twitchError?: boolean;
  twitchToken?: TwitchToken;
  stripeSubscriptionId?: string;
  stripeCustomer?: StripeCustomer;
  subscriptionExpiryDate?: FirestoreTimestamp;
  paypalSubscriptionId?: string;
}

export const toV2UserPrivate = (userId: number, privateData: Private): UserPrivate => {
  if (!privateData) return null;
  return {
    user_id: userId,
    subscription_expiry_date: fromFirestoreTimestamp(privateData.subscriptionExpiryDate),
    twitch_display_name: privateData.linkedTwitchAccount?.displayName ?? null,
    twitch_name: privateData.linkedTwitchAccount?.name ?? null,
    twitch_id: privateData.linkedTwitchAccount?.id ?? null,
    twitch_error: privateData.twitchError || false,
    twitch_token: privateData.twitchToken ?? null,
    stripe_subscription_id: privateData.stripeSubscriptionId ?? null,
    stripe_customer_id: privateData.stripeCustomer?.id ?? null,
    stripe_customer_email: privateData.stripeCustomer?.email ?? null,
    paypal_subscription_id: privateData.paypalSubscriptionId ?? null,
  };
};

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
