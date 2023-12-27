import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/graphql/schemas/client.schema";
import connectDB from "./src/config/database";

connectDB();
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server,{
    listen: {port: 3000}
})

console.log('Server ready at port', 3000);