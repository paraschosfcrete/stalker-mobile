export type StashEntry = {
  id: string;
  name: string;
  quantity: number;
};

export type Stash = {
  money: number;
  armor: StashEntry[];
  weapons: StashEntry[];
  items: StashEntry[];
  artifacts: StashEntry[];
  ammo: StashEntry[];
};

export const createStash = (playerCount: number): Stash => {
  return {
    money: 5000,

    armor: [
      {
        id: "leather-jacket",
        name: "Leather Jacket",
        quantity: playerCount,
      },
    ],

    weapons: [],
    items: [],
    artifacts: [],
    ammo: [],
  };
};
