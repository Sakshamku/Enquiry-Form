const Enquiry = require("../models/Enquiry");

const getEnquiries = async (req, res) => {
  const pageSize = 5;
  const { page = 1, search = "" } = req.query;
  const pageNumber = Number(page) || 1;

  const query = search.trim()
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    }
    : {};

  const total = await Enquiry.countDocuments(query);
  const enquiries = await Enquiry.find(query)
    .sort({ createdAt: -1 })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize);

  res.json({
    enquiries,
    total,
    page: pageNumber,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  });
};

const createEnquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const enquiry = await Enquiry.create({ name, email, phone, message });
  res.status(201).json(enquiry);
};

const updateEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  enquiry.name = req.body.name || enquiry.name;
  enquiry.email = req.body.email || enquiry.email;
  enquiry.phone = req.body.phone || enquiry.phone;
  enquiry.message = req.body.message || enquiry.message;

  const updatedEnquiry = await enquiry.save();
  res.json(updatedEnquiry);
};

const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Enquiry removed" });
};

module.exports = {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
