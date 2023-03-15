// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import {
//   ApolloServerPluginLandingPageLocalDefault,
//   ApolloServerPluginInlineTrace,
// } from "apollo-server-core";
// import cors from "cors"

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import dbConnection from "./utils/dbConnection.js";

const PORT = process.env.PORT || 4000;

// dbConnection();
// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req }),
//     csrfPrevention: true,
//     cache: "bounded",
//     plugins: [
//       ApolloServerPluginLandingPageLocalDefault({
//         embed: true,
//       }),
//       ApolloServerPluginInlineTrace(),
//     ],
//   });

//   await server.start();
//   const app = express();

//   server.applyMiddleware({
//     app,
//     path: "/",
//     // path: "/graphql",
//   });
//   await new Promise((r) => app.listen({ port: PORT }, r));
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }

// startServer();

// ========NEW======================
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
// import { json } from "body-parser";
// import { typeDefs, resolvers } from "./schema";

import cors from "cors";

const app = express();
const httpServer = http.createServer(app);
dbConnection();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    // "/graphql",
    cors(),
    // cors({
    //   origin: [
    //     "https://www.your-app.example",
    //     "http://localhost:3000",
    //     "https://online-bus-reservation-system-py0y9yjcf-k-stiles.vercel.app/",
    //   ],
    // }),

    express.json(),
    expressMiddleware(server)
  );

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}
startServer();
