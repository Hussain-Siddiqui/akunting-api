const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Auth/index.js");
const productRoute = require("./routes/product/index.js");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
console.log("MongoDB Connected")
// MongoDB Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));
 
  
app.use("/api/auth", authRoutes);
app.use("/product",productRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
