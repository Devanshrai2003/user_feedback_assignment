"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitFeedback = submitFeedback;
exports.getAllFeedback = getAllFeedback;
const database_1 = __importDefault(require("../database"));
function sanitizeInput(input) {
    return input.trim();
}
function submitFeedback(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield database_1.default.create({
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "could not submit feedback",
            });
        }
    });
}
function getAllFeedback(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, sort } = req.query;
            let filter = {};
            if (category) {
                filter.category = category;
            }
            let sortOrder = "descending";
            if (sort === "ascending") {
                sortOrder = "ascending";
            }
            const feedbackList = yield database_1.default.find(filter).sort({
                timestamp: sortOrder,
            });
            res.status(200).json(feedbackList);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch feedbacks" });
        }
    });
}
