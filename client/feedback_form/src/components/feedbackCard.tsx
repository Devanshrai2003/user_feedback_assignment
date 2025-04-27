interface FeedbackItem {
  _id: string;
  name: string;
  email: string;
  category: string;
  text: string;
  timestamp: string;
  status: string;
}

export function FeedbackCard({
  name,
  email,
  category,
  text,
  timestamp,
  status,
}: FeedbackItem) {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-xl">
      {/* Header with name and status - dark blue background */}
      <div className="flex justify-between items-center p-4 bg-[#141459] text-white">
        <div className="flex items-center space-x-3">
          {/* Avatar with lighter blue */}
          <div className="w-10 h-10 rounded-full bg-[#373783] flex items-center justify-center text-lg font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-white">{name}</h3>
            <p className="text-sm text-gray-300">{email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "not reviewed"
                ? "bg-yellow-500 text-[#02042d]"
                : status === "in progress"
                ? "bg-blue-400 text-[#02042d]"
                : status === "resolved"
                ? "bg-green-400 text-[#02042d]"
                : status === "rejected"
                ? "bg-red-400 text-[#02042d]"
                : "bg-gray-400 text-[#02042d]"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Body with feedback content - white background for contrast */}
      <div className="p-4">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 bg-[#02042d] text-white rounded text-xs font-medium mb-2">
            {category}
          </span>
          <div className="text-gray-700 mt-2">{text}</div>
        </div>

        {/* Footer with timestamp - subtle blue accent */}
        <div className="text-xs text-[#141459] font-medium mt-4 border-t border-gray-200 pt-3">
          Submitted: {formatDate(timestamp)}
        </div>
      </div>
    </div>
  );
}
