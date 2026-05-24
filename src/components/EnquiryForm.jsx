import React from "react";
import { Button, Form } from "react-bootstrap";

const EnquiryForm = ({ formData, errors, onChange, onSubmit, onReset, isEditing }) => (
  <div className="enquiry-card p-4 h-100">
    <div className="d-flex justify-content-between align-items-start mb-4 gap-3">
      <div>
        <h4 className="mb-1">{isEditing ? "Edit Enquiry" : "New Enquiry"}</h4>
        <p className="small text-muted mb-0">
          {isEditing ? "Update enquiry details and save." : "Enter enquiry details and submit."}
        </p>
      </div>
      {isEditing ? (
        <Button variant="outline-secondary" size="sm" onClick={onReset}>
          Cancel
        </Button>
      ) : null}
    </div>

    <Form noValidate onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={formData.name}
          onChange={onChange}
          isInvalid={!!errors.name}
          placeholder="Enter full name"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          isInvalid={!!errors.email}
          placeholder="name@example.com"
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          name="phone"
          value={formData.phone}
          onChange={onChange}
          isInvalid={!!errors.phone}
          placeholder="10-digit phone number"
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          value={formData.message}
          onChange={onChange}
          isInvalid={!!errors.message}
          placeholder="Enter a short message"
        />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex flex-wrap gap-2">
        <Button type="submit" className="btn-primary px-4">
          {isEditing ? "Update enquiry" : "Save enquiry"}
        </Button>
        <Button variant="outline-secondary" onClick={onReset} disabled={!isEditing}>
          Clear
        </Button>
      </div>
    </Form>
  </div>
);

export default EnquiryForm;
