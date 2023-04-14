import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

export default function DeleteProjectButton({ projectId }) {
  // navigate: A hook that returns a function to navigate to a new location.
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    // passing the projectId as a variable to the mutation
    variables: { id: projectId },
    // once the mutation is completed, navigate to the home page
    onCompleted: () => navigate("/"),
    // refetch the projects query to update the cache
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" />
        Delete Project
      </button>
    </div>
  );
}
