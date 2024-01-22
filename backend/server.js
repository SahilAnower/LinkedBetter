import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// app.use("/api/auth", authRoutes);

// app.use(authenticate);

// app.use("/api/payment-providers", paymentProviderRoutes);

// app.use(errorHandler);

const port = process.env.PORT || 5060;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});
