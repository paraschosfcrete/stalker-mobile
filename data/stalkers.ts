export type Stalker = {
  id: string;
  name: string;
  hp: number;
  shooting: number;
};

export const stalkers: Stalker[] = [
  {
    id: "eino",
    name: "Eino",
    hp: 14,
    shooting: 3,
  },
  {
    id: "moloch",
    name: "Moloch",
    hp: 18,
    shooting: 2,
  },
];
