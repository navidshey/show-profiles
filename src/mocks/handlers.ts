import { rest } from "msw";
import Episode from "../api/episode/episode";
import ProfileLocation from "../api/location/location";
import CharactersPagingList from "../api/profile/profile";

export const handlers = [
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
    const responseProfile: CharactersPagingList = {
      info: {
        count: "2",
        next: undefined,
        pages: 1,
        prev: "",
      },
      results: [
        {
          created: "2017-11-04T18:48:46.250Z",
          episode: [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
          ],
          gender: "Male",
          id: 1,
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3",
          },
          name: "Rick Sanchez",
          origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          species: "Human",
          status: "Alive",
          type: "",
          url: "https://rickandmortyapi.com/api/character/1",
        },
        {
          created: "2017-11-04T18:50:21.651Z",
          episode: [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
          ],
          gender: "Male",
          id: 2,
          image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3",
          },
          name: "Morty Smith",
          origin: { name: "unknown", url: "" },
          species: "Human",
          status: "Alive",
          type: "",
          url: "https://rickandmortyapi.com/api/character/2",
        },
      ],
    };
    return res(ctx.status(200), ctx.json(responseProfile));
  }),

  rest.get("https://rickandmortyapi.com/api/episode/1", (req, res, ctx) => {
    const responseEpisode: Episode[] = [
      {
        air_date: "December 2, 2013",
        characters: ["https://rickandmortyapi.com/api/character/1"],
        created: "2017-11-10T12:56:33.798Z",
        episode: "S01E01",
        id: 1,
        name: "Pilot",
        url: "https://rickandmortyapi.com/api/episode/1",
      },
    ];

    return res(ctx.status(200), ctx.json(responseEpisode));
  }),

  rest.get("https://rickandmortyapi.com/api/episode/4", (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  rest.get("https://rickandmortyapi.com/api/location/1,2", (req, res, ctx) => {
    const responseEpisode: ProfileLocation[] = [
      {
        created: "2017-11-10T12:42:04.162Z",
        dimension: "Dimension C-137",
        id: 1,
        name: "Earth (C-137)",
        residents: ["https://rickandmortyapi.com/api/character/38"],
        type: "Planet",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      {
        created: "2017-11-10T13:06:38.182Z",
        dimension: "unknown",
        id: 2,
        name: "Abadango",
        residents: ["https://rickandmortyapi.com/api/character/6"],
        type: "Cluster",
        url: "https://rickandmortyapi.com/api/location/2",
      },
    ];

    return res(ctx.status(200), ctx.json(responseEpisode));
  }),

  rest.get("https://rickandmortyapi.com/api/location/4,4", (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export const mockValidCharacter = {
  created: "2017-11-04T18:48:46.250Z",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  gender: "Male",
  id: 1,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  name: "Rick Sanchez",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/2",
  },
  species: "Human",
  status: "Alive",
  type: "",
  url: "https://rickandmortyapi.com/api/character/1",
};
export const mockInValidCharacter = {
  created: "2017-11-04T18:48:46.250Z",
  episode: ["https://rickandmortyapi.com/api/episode/4"],
  gender: "Male",
  id: 4,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/4",
  },
  name: "Rick Sanchez",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/4",
  },
  species: "Human",
  status: "Alive",
  type: "",
  url: "https://rickandmortyapi.com/api/character/4",
};
export const mockLocation: ProfileLocation = {
  created: "2017-11-10T13:08:13.191Z",
  dimension: "unknown",
  id: 3,
  name: "Citadel of Ricks",
  residents: [
    "https://rickandmortyapi.com/api/character/8",
    "https://rickandmortyapi.com/api/character/14",
  ],
  type: "Space station",
  url: "https://rickandmortyapi.com/api/location/3",
};
