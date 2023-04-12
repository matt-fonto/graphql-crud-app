import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

export default function Clients() {
  // useQuery: hook that will execute the query
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          {/* table head */}
          <thead>
            {/* row */}
            <tr className="table-primary">
              {/* th: table header */}
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              {/* The trash icon will be here */}
              <th scope="col"></th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {/* map over the data */}
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
