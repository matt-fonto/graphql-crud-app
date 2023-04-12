import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    // variables: what we want to send to the mutation
    variables: { name, email, phone },
    // update: what we want to do after the mutation
    // cache: the cache of the query that we want to update
    // data: the data that we want to add to the cache
    update(cache, { data: { addClient } }) {
      // clients: the name of the query that we want to update
      // cache.readQuery: read the query that we want to update
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      // cache.writeQuery: write the query that we want to update
      cache.writeQuery({
        // query: the query that we want to update
        query: GET_CLIENTS,
        // data: the data that we want to add to the cache
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (name === "" || email === "" || phone === "") {
      alert("All fields are required");
      return;
    }

    // Add the client to the database
    addClient(name, email, phone);

    // Clear the form
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add a new client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Body */}
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    // e.target.value = it means that the value of the input will be the value of the state
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    // e.target.value = it means that the value of the input will be the value of the state
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    // e.target.value = it means that the value of the input will be the value of the state
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
