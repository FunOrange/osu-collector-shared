import { toFirestoreTimestamp } from '../v1/FirestoreTimestamp';
import { TwitchToken } from '../v1';
import * as V1 from '../v1';

export interface UserPrivate {
  user_id: number;
  subscription_expiry_date?: string;

  // twitch
  twitch_display_name?: string;
  twitch_name?: string;
  twitch_id?: string;
  twitch_error?: boolean;
  twitch_token?: TwitchToken;

  // stripe
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  stripe_customer_email?: string;

  // paypal
  paypal_subscription_id?: string;
}

export const toV1UserPrivate = (row: UserPrivate): V1.User['private'] => {
  const userPrivate = {
    linkedTwitchAccount:
      row.twitch_display_name || row.twitch_name || row.twitch_id
        ? {
            displayName: row.twitch_display_name,
            name: row.twitch_name,
            id: row.twitch_id,
          }
        : undefined,
    twitchError: row.twitch_error,
    twitchToken: row.twitch_token,
    stripeSubscriptionId: row.stripe_subscription_id,
    stripeCustomer:
      row.stripe_customer_id || row.stripe_customer_email
        ? {
            id: row.stripe_customer_id,
            email: row.stripe_customer_email,
          }
        : undefined,
    subscriptionExpiryDate: toFirestoreTimestamp(row.subscription_expiry_date),
    paypalSubscriptionId: row.paypal_subscription_id,
  };
  return userPrivate;
};
