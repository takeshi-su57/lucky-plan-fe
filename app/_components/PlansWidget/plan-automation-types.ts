import { BotForwardDetails } from "@/graphql/gql/graphql";

export type FollowerBotGroup = {
  key: string;
  followerAddress: string;
  followerContract: BotForwardDetails["followerContract"];
  bots: BotForwardDetails[];
};
