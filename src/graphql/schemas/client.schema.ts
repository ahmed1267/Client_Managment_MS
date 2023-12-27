export const typeDefs = `#graphql 
type Client {
  _id: ID!
  type: String
  name: String
  email: String
  phone: String
  address: String
  dataLifeTime: Int
  createdAt: Int!  
  deletedAt: Int   
  protectAgainstAutoDisable: Boolean
  maintenanceAppEnabled: Boolean
}

input ClientInput {
  type: String
  name: String
  email: String
  phone: String
  address: String
  dataLifeTime: Int
  protectAgainstAutoDisable: Boolean
  maintenanceAppEnabled: Boolean
}

input ClientInputWithID {
  _id: ID!
  type: String
  name: String
  email: String
  phone: String
  address: String
  dataLifeTime: Int
  protectAgainstAutoDisable: Boolean
  maintenanceAppEnabled: Boolean
}

type Query {
  getOneClient(_id: ID!): Client
  getManyClients: [Client]
}

type Mutation {
  createClient(input: ClientInput!): String
  updateClient(input: ClientInputWithID!): String
}`
