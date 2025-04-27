"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedbackRouter = (0, express_1.Router)();
const feedbackController_1 = require("../controllers/feedbackController");
feedbackRouter.post("/", feedbackController_1.submitFeedback);
feedbackRouter.get("/", feedbackController_1.getAllFeedback);
exports.default = feedbackRouter;
