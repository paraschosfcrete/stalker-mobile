export type Equipment = {
  id: string;
  name: string;
  type: string;
  stats: {
    defense: number;
  };
};

export type StartingData = {
  Koupons: number;
  equipment: Equipment[];
};

export const startingData: StartingData = {
  Koupons: 5000,

  equipment: [
    {
      id: "leather-jacket",
      name: "Leather Jacket",
      type: "armor",
      stats: {
        defense: 1,
      },
    },
  ],
};
