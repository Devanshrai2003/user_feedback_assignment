"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const feedbackTypes = ["Suggestion", "Bug Report", "Feature Request"];
const statusTypes = ["not reviewed", "reviewed"];
const FeedbackSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, enum: feedbackTypes, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
    status: { type: String, enum: statusTypes, default: "not reviewed" },
});
const FeedbackModel = mongoose_1.default.model("feedback", FeedbackSchema);
exports.default = FeedbackModel;
