import FeedbackModel from "../database";
import { Request, Response } from "express";
import { SortOrder } from "mongoose";

function sanitizeInput(input: string): string {
  return input.trim();
}

async function submitFeedback(req: Request, res: Response) {
  const { name, email, category, text } = req.body;

  if (!name || !email || !text) {
    res.status(400).json({ error: "Please fill all required fields" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Please provide a valid email address" });
    return;
  }

  try {
    await FeedbackModel.create({
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      category: category,
      text: sanitizeInput(text),
      timestamp: new Date(),
      status: "not reviewed",
    });

    res.status(201).json({
      success: true,
      message: "feedback submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "could not submit feedback",
    });
  }
}

async function getAllFeedback(req: Request, res: Response) {
  try {
    const { category, sort } = req.query;

    let filter: any = {};
    if (category) {
      filter.category = category;
    }

    let sortOrder: SortOrder = "descending";
    if (sort === "ascending") {
      sortOrder = "ascending";
    }

    const feedbackList = await FeedbackModel.find(filter).sort({
      timestamp: sortOrder,
    });

    res.status(200).json(feedbackList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
}

export { submitFeedback, getAllFeedback };
