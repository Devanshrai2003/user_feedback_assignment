import { useState, useEffect } from "react";
import axios from "axios";
import { FeedbackCard } from "./feedbackCard";

export interface FeedbackItem {
  _id: string;
  name: string;
  email: string;
  category: string;
  text: string;
  timestamp: string;
  status: string;
}

export default function Dashboard() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<FeedbackItem[]>(
          `${import.meta.env.VITE_API_URL}/feedback`
        );
        setFeedbackItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Feedback Dashboard</h1>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-600 bg-opacity-20 border border-red-400 rounded-lg p-4 text-red-200 mb-6">
            {error}
          </div>
        )}

        {!isLoading && !error && feedbackItems.length === 0 && (
          <div className="bg-blue-600 bg-opacity-20 border border-blue-400 rounded-lg p-4 text-blue-200 mb-6">
            No feedback items available.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackItems.map((item) => (
            <FeedbackCard
              key={item._id}
              _id={item._id}
              name={item.name}
              email={item.email}
              category={item.category}
              text={item.text}
              timestamp={item.timestamp}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
