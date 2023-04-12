import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//bring appolo client
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

// Cache: Apollo Client uses a normalized cache to store your data. This means that all of your objects are stored in a single lookup table by ID. When you read an object from the cache, you can be confident that you'll get back a consistent result if no other code has modified that object.
// InMemoryCache: The InMemoryCache is the default cache implementation used by Apollo Client. It is a normalized data store that supports efficient reads and writes by using object references instead of storing the entire object in the cache.
const cache = new InMemoryCache({
  // typePolicies: this is where we define the cache
  typePolicies: {
    Query: {
      fields: {
        //this is the name of the query
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

//create the apollo client by passing the uri and the cache
const client = new ApolloClient({
  //uri: where the graphql server is located
  uri: "http://localhost:5000/graphql",
  //cache:
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
