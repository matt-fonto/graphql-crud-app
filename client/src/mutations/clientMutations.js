import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  # $name, $email, $phone are variables that will be passed in the mutation
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  # $id is a variable that will be passed in the mutation
  mutation deleteClient($id: ID!) {
    # deleteClient is the mutation name
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { DELETE_CLIENT, ADD_CLIENT };
