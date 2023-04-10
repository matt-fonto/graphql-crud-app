import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex justify-content-center">
            <img src={logo} alt="logo" className="img-fluid" />
            <h2>GraphQL Project</h2>
          </div>
        </a>
      </div>
    </nav>
  );
}
