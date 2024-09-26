import { FastifyInstance } from "fastify";
import {
  createMapHandler,
  getMapBuoysHandler,
  getMapHandler,
  getMapLegsHandler,
  getMapRoutesHandler,
  getMapsHandler,
  putMapHandler,
} from "./map.controller";
import { $ref } from "./map.schema";

async function mapRoutes(server: FastifyInstance) {
  server.post(
    "/maps",
    {
      schema: {
        tags: ['map'],
        body: $ref("createMapSchema"),
        response: {
          201: $ref("mapResponseSchema"),
        },
      },
      preHandler: [server.authenticate],
    },
    createMapHandler
  );
  
  server.get(
    "/map/:id",
    {
      schema: {
        tags: ['map'],
        security: [ { bearerAuth: [] } ],
        response: {
          200: $ref("mapResponseSchema"),
        },
      },
      preHandler: [server.authenticate],
    },
    getMapHandler
  );
  
  server.put(
    "/map/:id",
    {
      schema: {
        tags: ['map'],
        security: [ { bearerAuth: [] } ],
        body: $ref("updateMapSchema"),
        response: {
          200: $ref("mapResponseSchema"),
        },
      },
      preHandler: [server.authenticate],
    },
    putMapHandler
  );
  
  server.get(
    "/maps",
    {
      schema: {
        tags: ['map'],
        security: [
          {
            bearerAuth: [],
          }
        ],
      },
      preHandler: [server.authenticate],
    },
    getMapsHandler
  );
  
  server.get(
    "/map/:id/buoys",
    {
      schema: {
        tags: ['map'],
        security: [
          {
            bearerAuth: [],
          }
        ],
      },
      preHandler: [server.authenticate],
    },
    getMapBuoysHandler
  );
  
  server.get(
    "/map/:id/legs",
    {
      schema: {
        tags: ['map'],
        security: [
          {
            bearerAuth: [],
          }
        ],
      },
      preHandler: [server.authenticate],
    },
    getMapLegsHandler
  );
  
  server.get(
    "/map/:id/routes",
    {
      schema: {
        tags: ['map'],
        security: [
          {
            bearerAuth: [],
          }
        ],
      },
      preHandler: [server.authenticate],
    },
    getMapRoutesHandler
  );
}

export default mapRoutes;