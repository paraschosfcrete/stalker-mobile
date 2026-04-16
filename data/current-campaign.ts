import { createStash, Stash } from "@/data/stash";
import { Stalker } from "@/data/stalkers";

export type CampaignStalker = Pick<Stalker, "id" | "name" | "hp" | "shooting">;

export type Campaign = {
  id: string;
  name: string;
  stalkers: CampaignStalker[];
  stash: Stash;
};

let currentCampaign: Campaign | null = null;

export const createCurrentCampaign = (name: string, stalkers: CampaignStalker[]): Campaign => {
  currentCampaign = {
    id: `${Date.now()}-${name.trim().toLowerCase().replace(/\s+/g, "-")}`,
    name: name.trim(),
    stalkers,
    stash: createStash(stalkers.length),
  };

  return currentCampaign;
};

export const getCurrentCampaign = () => currentCampaign;
