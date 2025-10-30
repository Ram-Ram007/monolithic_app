import express from "express";
import userRoutes from "./routes/userRoute.js";  // import default export
import productRoute from "./routes/productRoute.js";
import authRoutes from "./routes/authRoute.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoutes);

// app.get("/getUsers", listUsers )
// app.get("/getProduct", listProduct)

export default app;
