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

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("descending");
  const categories = ["Suggestion", "Bug Report", "Feature Request"];
  const statuses = ["not reviewed", "in progress", "resolved", "rejected"];

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (sortOrder) params.append("sort", sortOrder);

        const response = await axios.get<FeedbackItem[]>(
          `${import.meta.env.VITE_API_URL}/feedback?${params.toString()}`
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
  }, [selectedCategory, sortOrder]);

  const filteredItems = selectedStatus
    ? feedbackItems.filter((item) => item.status === selectedStatus)
    : feedbackItems;

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedStatus("");
    setSortOrder("descending");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Feedback Dashboard</h1>
          <div className="text-sm text-gray-600">
            {filteredItems.length} feedback item
            {filteredItems.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Sort by Date
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="descending">Newest First</option>
                <option value="ascending">Oldest First</option>
              </select>
            </div>

            {(selectedCategory ||
              selectedStatus ||
              sortOrder !== "descending") && (
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 border border-purple-300 rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {(selectedCategory || selectedStatus) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedStatus && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Status:{" "}
                  {selectedStatus.charAt(0).toUpperCase() +
                    selectedStatus.slice(1)}
                  <button
                    onClick={() => setSelectedStatus("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

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

        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="bg-blue-600 bg-opacity-20 border border-blue-400 rounded-lg p-4 text-blue-200 mb-6">
            {selectedCategory || selectedStatus
              ? "No feedback items match the selected filters."
              : "No feedback items available."}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
