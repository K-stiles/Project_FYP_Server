import { gql } from "apollo-server-express";

const typeDefs = gql`
     type User {
          id: ID!
          firstName: String!
          lastName: String!
          email: String!
          phone: String!
          token: String!
          createdAt: String!
     }

     input RegistrationInput {
          firstName: String!
          lastName: String!
          email: String!
          password: String!
          phone: String!
     }
     input LoginInput {
          email: String!
          password: String!
     }

     type Query {
          user(userId: ID!): User
          users: [User]
     }

     type Mutation {
          createUser(input: RegistrationInput): User!
          loginUser(input: LoginInput): User!
          # updateUser(id:ID!):User!
          # deleteUser():User!
     }
`;

export default typeDefs;
