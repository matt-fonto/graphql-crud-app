import { gql } from "@apollo/client";

// GET_CLIENTS is a query that will be used in the useQuery hook
const GET_CLIENTS = gql`
  # we can use the query name as a variable
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
