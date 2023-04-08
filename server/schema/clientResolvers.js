const Client = require("../models/Client");
// const { ClientType } = require("./clientTypes");

const clientResolvers = {
  //QUERIES
  //Query: a property that defines the queries that can be made to the API
  Query: {
    //get all clients
    clients: async () => {
      const clients = await Client.find();
      return clients;
    },
    //get a single client
    client: async (parent, args) => {
      const client = await Client.findById(args.id);
      return client;
    },

    //MUTATIONS
    Mutation: {
      //add a client
      addClient: async (parent, args) => {
        const { name, email, phone } = args.client;

        const client = new Client({ name, email, phone });
        const newClient = await client.save();
        return newClient;
      },
      //delete a client
      deleteClient: async (parent, args) => {
        const client = await Client.findByIdAndDelete(args.id);
        return client;
      },
      //update a client
      updateClient: async (parent, args) => {
        const { id, name, email, phone } = args.client;
        const updateClient = {};

        if (name) updateClient.name = name;
        if (email) updateClient.email = email;
        if (phone) updateClient.phone = phone;

        const updatedClient = await Client.findByIdAndUpdate(id, updateClient, {
          new: true,
        });

        return updatedClient;
      },
    },
  },
};

module.exports = clientResolvers;
