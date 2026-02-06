import { type Collection } from "@/app/types/models";

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Drafts",
    baseUrl: "localhost:3000",
    endpoints: [
      {
        id: "1",
        name: "My First Request",
        method: "GET",
        url: "/first-request",
      },
    ],
  },
  {
    id: "2",
    name: "FindEats",
    baseUrl: "localhost:3000",
    endpoints: [
      { id: "2", name: "Restaurants", method: "GET", url: "/restaurants" },
      { id: "3", name: "Onboard", method: "POST", url: "/onboard" },
    ],
  },
];
