import { gql } from "@apollo/client";

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

export { DELETE_CLIENT };
