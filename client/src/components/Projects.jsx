import { useQuery } from "@apollo/client"; //hook that will execute the query
import { GET_PROJECTS } from "../queries/projectQueries"; //get our query
import Spinner from "./Spinner"; //for loading purposes
import ProjectCard from "./ProjectCard"; //the component that will render each row

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
