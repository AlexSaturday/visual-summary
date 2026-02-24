import { Router } from "express";
import { getProjects, createProject } from "../controllers/project.controller";
import dayRoutes from "./day.routes";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.use("/:projectId/days", dayRoutes);

export default router;