import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ message = "Loading enquiries..." }) => (
  <div className="loader-container py-5 text-center text-muted">
    <Spinner animation="border" role="status" />
    <span className="ms-3">{message}</span>
  </div>
);

export default Loader;
