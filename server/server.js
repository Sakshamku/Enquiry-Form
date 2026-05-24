const express = require("express");
require("express-async-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const enquiryRoutes = require("./routes/enquiryRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/enquiries", enquiryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Smart Enquiry Management API is running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
