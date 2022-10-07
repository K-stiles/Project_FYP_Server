import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import dbConnection from "./utils/dbConnection.js";

const PORT = process.env.PORT || 4000;

dbConnection();
async function startServer() {
   const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: "bounded",
      plugins: [
         ApolloServerPluginLandingPageLocalDefault({
            embed: true,
         }),
      ],
   });

   await server.start();
   const app = express();

   server.applyMiddleware({
      app,
      path: "/graphql",
   });
   await new Promise((r) =>
      app.listen(
         {
            port: PORT,
         },
         r
      )
   );
   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
