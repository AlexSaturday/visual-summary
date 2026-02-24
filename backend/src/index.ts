import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes";
import { prisma } from "./prisma";

prisma.$connect()
  .then(() => console.log("DB connected"))
  .catch((e) => console.error("DB error:", e));


const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
console.log("projectRoutes:", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));