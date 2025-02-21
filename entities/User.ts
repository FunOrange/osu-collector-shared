import { assoc, pick, pipe } from "ramda";

export const UserSample = {
  id: 2051389,
  username: "FunOrange",
  country_code: "CA",
  country_name: "Canada",
  country_rank: 123,
  global_rank: 123,
  avatar_url: "https://assets.ppy.sh/user/avatar/2051389/1.jpg?1622017904",
  cover_url:
    "https://assets.ppy.sh/user-profile-covers/2051389/79eeeff0f4953380974ff0d3a113c0d7bbe61fea4edd1539ecbad28eb82b653a.jpeg",
};
export type User = typeof UserSample;
export const UserKeys = Object.keys(UserSample) as (keyof User)[];

export function trimRawUser(raw: any): User {
  return pipe(
    pick(UserKeys),
    assoc("country_name", raw.country.name),
    assoc("country_rank", raw.statistics.country_rank),
    assoc("global_rank", raw.statistics.global_rank),
  )(raw);
}
