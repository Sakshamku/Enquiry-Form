import axios from "axios";

const API_URL = "/api/enquiries";

const getEnquiries = async ({ search = "", page = 1 }) => {
  return axios.get(API_URL, {
    params: { search, page },
  });
};

const createEnquiry = async (enquiryData) => {
  return axios.post(API_URL, enquiryData);
};

const updateEnquiry = async (id, enquiryData) => {
  return axios.put(`${API_URL}/${id}`, enquiryData);
};

const deleteEnquiry = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const enquiryService = {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default enquiryService;
