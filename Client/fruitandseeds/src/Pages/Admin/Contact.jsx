import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, MailOpen, Reply, Filter, Search } from 'lucide-react';

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/message");
        setMessages(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

 const filteredMessages = messages.filter((msg) => {
  if (filter === "read" && msg.status !== "Read") return false;
  if (filter === "unread" && msg.status !== "Unread") return false;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
    );
  }

  return true;
});


  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/message/${id}`, {
        status: "Read",
      });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: "Read" } : msg))
      );
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const selectMessage = (message) => {
    setSelectedMessage(message);
    if (message.status !== "Read") {
      markAsRead(message.id);
    }
  };

  const sendReply = async () => {
    if (replyText.trim() === "" || !selectedMessage) return;
    try {
      await axios.post("http://localhost:5000/api/message/reply", {
        messageId: selectedMessage.id,
        replyMessage: replyText,
      });
      alert(`Reply sent to ${selectedMessage.from}: ${replyText}`);
      setReplyText("");
      const updated = await axios.get("http://localhost:5000/api/message");
      setMessages(updated.data.data || updated.data);
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("An error occurred while sending the reply.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99BC85]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-[#FDFAF6] rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Mail className="text-[#97BE5A]" size={24} />
          <span>Messages Management</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8BA7] focus:border-[#FF8BA7]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="py-2 pr-1 bg-transparent focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[70vh]">
          {/* Messages List */}
          <div className="md:col-span-1 border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 bg-[#fefefe]">
              <h3 className="font-medium text-gray-700">Inbox ({filteredMessages.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 cursor-pointer transition-colors ${selectedMessage?.id === msg.id ? "bg-[#FDFAF6]" : "hover:bg-gray-50"} ${msg.status === "Unread" ? "bg-[#FFFAFC]" : ""}`}
                    onClick={() => selectMessage(msg)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {msg.status === "Unread" ? (
                            <Mail className="h-4 w-4 text-[#FF8BA7]" />
                          ) : (
                            <MailOpen className="h-4 w-4 text-gray-400" />
                          )}
                          <p className={`truncate font-medium ${msg.status === "Unread" ? "text-gray-900" : "text-gray-600"}`}>
                            {msg.from}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">{msg.message.substring(0, 60)}...</p>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {msg.adminReply && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#97BE5A]/20 text-[#97BE5A]">
                          Replied
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Search className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="mt-2">No messages match your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="md:col-span-2 flex flex-col border-t md:border-t-0 border-gray-200">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="mt-1 text-sm text-gray-500">
                        From: <span className="font-medium">{selectedMessage.from}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-white">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.adminReply && (
                    <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-[#FDFAF6]">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Reply className="h-4 w-4 text-[#99BC85]" />
                        <span>Admin Reply</span>
                      </div>
                      <div className="mt-2 prose-sm text-gray-700 whitespace-pre-line">
                        {selectedMessage.adminReply}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 bg-[#fefefe]">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8BA7] focus:border-[#FF8BA7]"
                    rows="3"
                    placeholder="Write your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <div className="mt-3 flex justify-end">
                    <button
                      className="px-4 py-2 bg-[#99BC85] text-white rounded-lg hover:bg-[#97BE5A] transition-colors flex items-center gap-2"
                      onClick={sendReply}
                    >
                      <Reply className="h-5 w-5" />
                      <span>Send Reply</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                <MailOpen className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg">Select a message to view</p>
                <p className="text-sm mt-2">Click any message from the list to read and reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
