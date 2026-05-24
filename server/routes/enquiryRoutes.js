const express = require("express");
const {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const router = express.Router();

router.route("/").get(getEnquiries).post(createEnquiry);
router.route("/:id").put(updateEnquiry).delete(deleteEnquiry);

module.exports = router;
