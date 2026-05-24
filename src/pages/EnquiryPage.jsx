import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, InputGroup, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import enquiryService from "../services/api/enquiryService";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryTable from "../components/EnquiryTable";
import PaginationControls from "../components/PaginationControls";
import Loader from "../components/Loader";
import Message from "../components/Message";

// (debug logs removed)

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const EnquiryPage = () => {
  // Hooks must run unconditionally; we'll check imports after initializing hooks
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [editingId, setEditingId] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        if (!value.trim()) return "Email is required.";
        return /^\S+@\S+\.\S+$/.test(value.trim())
          ? ""
          : "Please enter a valid email.";
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        return /^\d{10}$/.test(value.trim())
          ? ""
          : "Phone number must be exactly 10 digits.";
      case "message":
        return value.trim().length >= 10
          ? ""
          : "Message must be at least 10 characters.";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => error === "");
  };

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setApiError("");

    try {
      const response = await enquiryService.getEnquiries({
        search: searchQuery,
        page,
      });

      setEnquiries(response.data.enquiries);
      setTotalCount(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors(initialErrors);
    setEditingId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors to continue.");
      return;
    }

    try {
      if (editingId) {
        await enquiryService.updateEnquiry(editingId, formData);
        toast.success("Enquiry updated successfully.");
      } else {
        await enquiryService.createEnquiry(formData);
        toast.success("Enquiry submitted successfully.");
      }

      resetForm();
      if (page !== 1) {
        setPage(1);
      } else {
        loadEnquiries();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save enquiry."
      );
    }
  };

  const handleEdit = (enquiry) => {
    setEditingId(enquiry._id);
    setFormData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmed) return;

    try {
      await enquiryService.deleteEnquiry(id);
      toast.success("Enquiry deleted successfully.");

      if (enquiries.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        loadEnquiries();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete enquiry."
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Container className="mt-4 enquiry-page">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h2 className="section-title mb-1">Smart Enquiry Management</h2>
          <p className="text-muted small mb-0">
            Manage your enquiries with full CRUD, search, pagination, and secure API integration.
          </p>
        </div>
        <div className="text-md-end">
          <span className="badge rounded-pill bg-primary px-3 py-2">
            {totalCount} enquiry{totalCount === 1 ? "" : "ies"}
          </span>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <EnquiryForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
            isEditing={Boolean(editingId)}
          />
        </Col>

        <Col lg={7}>
          <div className="enquiry-card p-4 h-100">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 gap-3">
              <div>
                <h4 className="mb-1">Enquiry List</h4>
                <p className="small text-muted mb-0">Search and review enquiries from the backend API.</p>
              </div>

              <InputGroup className="search-input">
                <InputGroup.Text>Search</InputGroup.Text>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Name, email or phone"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </div>

            {loading ? (
              <Loader />
            ) : apiError ? (
              <Message variant="danger">{apiError}</Message>
            ) : enquiries.length === 0 ? (
              <Message variant="info">
                No enquiries found. Try a different search or add a new enquiry.
              </Message>
            ) : (
              <>
                <EnquiryTable enquiries={enquiries} onEdit={handleEdit} onDelete={handleDelete} />
                <PaginationControls
                  page={page}
                  totalPages={totalPages}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EnquiryPage;
