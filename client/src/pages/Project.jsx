import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";

export default function Project() {
  // useParams: A hook that returns the URL parameters for the current route. Useful for getting the id of the current project
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  const { name, description, client, status } = data.project;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <div className="d-flex justity-content-between align-items-center">
            <h1>{name}</h1>
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
              Home
            </Link>
          </div>

          <p className="mt-3">{description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{status}</p>

          {
            //if there is a client, show the client info
            client && (
              <>
                <ClientInfo client={client} />
              </>
            )
          }
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
