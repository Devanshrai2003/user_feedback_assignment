import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

const FeedbackModel = mongoose.model("feedback", FeedbackSchema);

export default FeedbackModel;
