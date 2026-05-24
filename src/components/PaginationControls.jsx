import React from "react";
import { Button } from "react-bootstrap";

const PaginationControls = ({ page, totalPages, onPrevious, onNext }) => (
  <div className="d-flex align-items-center justify-content-between pagination-controls mt-3">
    <Button variant="outline-primary" size="sm" onClick={onPrevious} disabled={page === 1}>
      Previous
    </Button>
    <span className="page-badge">Page {page} of {totalPages}</span>
    <Button variant="outline-primary" size="sm" onClick={onNext} disabled={page === totalPages}>
      Next
    </Button>
  </div>
);

export default PaginationControls;
