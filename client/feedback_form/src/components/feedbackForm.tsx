import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FeedbackFormData {
  name: string;
  email: string;
  category: string;
  text: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    category: "",
    text: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitFeedback(formData);
      console.log(response);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", category: "", text: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-12 p-8 bg-[#12122b] shadow-2xl rounded-2xl border border-[#2c2c5c]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Submit Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#1a1a3d] border border-[#3a3a7c] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#1a1a3d] border border-[#3a3a7c] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-[#1a1a3d] border border-[#3a3a7c] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">
              What kind of feedback do you wish to provide?
            </option>
            <option value="Suggestion">Suggestion</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="text" className="mb-1 font-medium">
            Feedback
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows={4}
            className="bg-[#1a1a3d] border border-[#3a3a7c] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {submitSuccess && (
          <div className="mt-4 p-3 bg-green-600 bg-opacity-20 border border-green-400 rounded-lg text-green-200">
            Thank you for your feedback!
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-600 bg-opacity-20 border border-red-400 rounded-lg text-red-200">
            {errorMessage}
          </div>
        )}

        <button
          className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );

  async function submitFeedback(formData: {
    name: string;
    email: string;
    category: string;
    text: string;
  }) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/feedback`,
      formData
    );
    return response.data;
  }
}
