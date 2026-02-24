import { Router } from "express";
import {
  getDays,
  createDay,
  updateDay,
  deleteDay,
} from "../controllers/day.controller";

const router = Router({ mergeParams: true }); // чтобы params проектa был доступен

router.get("/", getDays);          // GET /projects/:projectId/days
router.post("/", createDay);       // POST /projects/:projectId/days
router.put("/:dayId", updateDay); // PUT /projects/:projectId/days/:dayId
router.delete("/:dayId", deleteDay); // DELETE /projects/:projectId/days/:dayId

export default router;