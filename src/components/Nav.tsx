import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  currentPage: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <Navbar expand="lg" className="no-style-navbar">
      <Container className="justify-content-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
            <Nav.Link as="div">
              <NavLink
                to="/"
                className={`nav-link ${currentPage === "/" ? "active" : ""}`}
              >
                Candidate Search
              </NavLink>
            </Nav.Link>
            <Nav.Link as="div">
              <NavLink
                to="/SavedCandidates"
                className={`nav-link ${
                  currentPage === "/SavedCandidates" ? "active" : ""
                }`}
              >
                Potential Candidates
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
