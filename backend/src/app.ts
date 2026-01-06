import express from "express";
import cors from "cors";
import checkoutRoute from "./routes/checkoutRoute";
import product from "./routes/productRoute";
import webhookRoute from "./routes/webhookRoute";
const app = express();
app.use("/api", express.raw({ type: "application/json" }), webhookRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/api", checkoutRoute);
app.use("/api", product);

export default app;
