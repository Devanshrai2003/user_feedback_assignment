import { Router } from "express";
const feedbackRouter = Router();
import {
  submitFeedback,
  getAllFeedback,
} from "../controllers/feedbackController";

feedbackRouter.post("/", submitFeedback);

feedbackRouter.get("/", getAllFeedback);

export default feedbackRouter;
