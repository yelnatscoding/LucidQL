import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

// If using Vite's public directory, use absolute paths for images:
const logo = "/lucidQL-logo.png";
const logoBrand = "/lucidQL.png";

interface TopNavProps {
  showModal: () => void;
  openSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ showModal, openSidebar }) => {
  return (
    <Navbar
      className="sticky-nav text-secondary"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="white"
    >
      <button className="openbtn bg-white" onClick={openSidebar}>
        ☰
      </button>
      <img className="logo" src={logo} alt="lucidQL logo" />
      <Navbar.Brand className="logo-text">
        <img className="logo-brand" src={logoBrand} alt="lucidQL brand" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Form className="d-inline">
            <Button
              className="openLinkModal"
              id="postgresURIbutton"
              variant="light"
              onClick={showModal}
            >
              Enter Postgres URI
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;
