const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

//import the resolvers for the project
const projectResolvers = require("./projectResolvers");

//Define the ProjectType
const ProjectType = new GraphQLObjectType({
  name: "Project",
  //fields: a call back function that returns an object that defines the fields and their type
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    //adding relationship between Project and Client
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Define the RootQuery type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //get all the projects
    projects: {
      //it will be a list of ProjectType
      type: new GraphQLList(ProjectType),
      resolve: projectResolvers.Query.projects,
    },
    //get a single project
    project: {
      //it will be a list of ProjectType
      type: new GraphQLList(ProjectType),
      resolve: projectResolvers.Query.projects,
    },
  },
});

module.exports = { ProjectType, RootProjectQuery };
