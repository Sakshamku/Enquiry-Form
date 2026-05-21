import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Table,
  Row,
  Col,
} from "react-bootstrap";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    index: "",
  });

  const [enquiryList, setEnquiryList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(enquiryList);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.index !== "") {
      // Update
      const updatedList = [...enquiryList];
      updatedList[formData.index] = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };
      setEnquiryList(updatedList);
    } else {
      // Add new
      setEnquiryList([...enquiryList, formData]);
    }

    setFormData({ name: "", email: "", phone: "", message: "", index: "" });
    setShowAlert(true);
  };

  const handleEdit = (index) => {
    const entry = enquiryList[index];
    setFormData({ ...entry, index });
  };

  const handleDelete = (index) => {
    const filteredList = enquiryList.filter((_, i) => i !== index);
    setEnquiryList(filteredList);
  };

  return (
    <Container className="mt-4">
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Thank you for your enquiry, {formData.name || "Guest"}! We will get
          back to you soon.
        </Alert>
      )}

      <Row>
        {/* Left Column - Enquiry Form */}
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <h3 className="mb-3">Enquiry Form</h3>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {formData.index !== "" ? "Update" : "Save"}
            </Button>
          </Form>
        </Col>

        {/* Right Column - Table */}
        <Col md={7} style={{ marginTop: "32px" }}>
          <h3 className="mb-3">Enquiry List</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiryList.length >= 1 ? (
                enquiryList.map((obj, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{obj.name}</td>
                    <td>{obj.email}</td>
                    <td>{obj.phone}</td>
                    <td>{obj.message}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(key)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(key)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default EnquiryForm;
