import { TwitchToken } from '../v1';

export interface UserPrivate {
  subscription_expiry_date: string;

  // twitch
  twitch_display_name: string;
  twitch_name: string;
  twitch_id: string;
  twitch_error: boolean;
  twitch_token: TwitchToken;

  // stripe
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_customer_email: string;

  // paypal
  paypal_subscription_id: string;
}
