const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

//import the resolvers for the client
const clientResolvers = require("./clientResolvers");

//Define the ClientType
const ClientType = new GraphQLObjectType({
  name: "Client",
  //fields: a call back function that returns an object that defines the fields and their type
  fields: () => ({
    //GraphQLID: identify unique elements
    //GraphQLString: identify string elements
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Define the RootQuery type
const RootClientQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //get all clients
    clients: {
      //the type of the return will be a GraphQL List
      type: new GraphQLList(ClientType),
      //resolve: a function that returns the data
      resolve: clientResolvers.Query.clients,
    },
    //get one client
    client: {
      //it will be of type ClientType, specified above
      type: ClientType,
      //args: the arguments that will be passed to the query
      args: { id: { type: GraphQLID } },
      //resolve: the data that will be returned
      resolve: clientResolvers.Query.client,
    },
  },
});

module.exports = { ClientType, RootClientQuery };
