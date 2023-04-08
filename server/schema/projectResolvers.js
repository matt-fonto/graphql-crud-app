const Project = require("../models/Project");

const projectResolvers = {
  // Project Queries
  Query: {
    projects: async () => {
      const projects = await Project.find();
      return projects;
    },
    project: async (parent, args) => {
      const project = await Project.findById(args.id);
      return project;
    },

    // Project Mutations
    Mutation: {
      //add a project
      addproject: async (parent, args) => {
        const { clientId, name, description, status } = args.project;

        const project = new Project({ clientId, name, description, status });
        const newProject = await project.save();
        return newProject;
      },
      //delete a project
      deleteProject: async (parent, args) => {
        const project = await Project.findByIdAndDelete(args.id);
        return project;
      },
      //update a project
      updateProject: async (parent, args) => {
        const { clientId, name, description, status } = args.project;
        const updateProject = {};

        if (clientId) updateClient.clientId = clientId;
        if (name) updateClient.name = name;
        if (description) updateClient.description = description;
        if (status) updateClient.status = status;

        const updatedProject = await Project.findByIdAndUpdate(
          id,
          updateProject,
          {
            new: true,
          }
        );

        return updatedProject;
      },
    },
  },
};

module.exports = projectResolvers;
