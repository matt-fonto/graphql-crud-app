//Here, we declare types to define the GraphQL schema's fields and their types
//GraphQL is a strongly types language, and the schema must specify the types of ata that can be queried and returned by the API

//Mongoose Models
const Project = require("../models/Project");
const Client = require("../models/Client");

// const { projects, clients } = require("../data.json");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

/* Create a GraphQL schema that defines:
1. ClientType with fours fields: id, name, email, phone
2. RootQuery with one field: client

RootQuery will return an object with the fields defined in the ClientType when queried
 */

//Client Type
//GraphQLObjectType: a constructor function that takes in an object with two properties: name and fields
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

//Project Type
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //get all clients
    clients: {
      //the type of the return will be a GraphQL List
      type: new GraphQLList(ClientType),
      //resolve: a function that returns the data
      resolve(parent, args) {
        return Client.find();
      },
    },
    //get one client
    client: {
      //it will be of type ClientType, specified above
      type: ClientType,
      //args: the arguments that will be passed to the query
      args: { id: { type: GraphQLID } },
      //resolve: the data that will be returned
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    //get all the projects
    projects: {
      //it will be a list of ProjectType
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find(); //return every project
      },
    },
    //get a single project
    project: {
      //it will be of type ProjectType
      type: ProjectType,
      //args: the arguments that will be passed to the query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id); //return the project with the id passed in the query
      },
    },
  },
});

//MUTATIONS
//Mutations are used to modify the data in the database
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, //GraphQLNonNull: a wrapper that makes the field required
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        //create a new instance of the Client model
        const client = new Client({
          name: args.name, //the name passed in the query
          email: args.email, //the email passed in the query
          phone: args.phone, //the phone passed in the query
        });

        //save the client to the database
        return client.save();
      },
    },
    //delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      },
    },
    //update a client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        const updateClient = {};

        if (args.name) updateClient.name = args.name;
        if (args.email) updateClient.email = args.email;
        if (args.phone) updateClient.phone = args.phone;

        return Client.findByIdAndUpdate(args.id, updateClient, { new: true });
      },
    },
    //add a project
    addProject: {
      //the type of the mutation will be ProjectType
      type: ProjectType,
      //args: the arguments that will be passed to the mutation
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        //status is an enum type
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "To Begin" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "To Begin",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    //delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    //update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }, //the only required argument is the id
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "To Begin" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          //new: true: return the updated project
          { new: true }
        );
      },
    },
  },
});

//export the schema
module.exports = new GraphQLSchema({
  //query: the root query
  query: RootQuery,
  mutation,
});
