import { useState, useEffect, useRef, useCallback, FC } from "react";
import { getMessages, addMessage } from "../api/messages";
import { MessageOut } from "../types";

interface MessageListProps {
  token: string;
  role: string; // Added role prop to the component
}

const MessageList: FC<MessageListProps> = ({ token, role }) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>(""); // State for new message input
  const limit = 5;

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMessageRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const newMessages = await getMessages(token, page, limit);
        setMessages((prev) => [...prev, ...newMessages]);
        if (newMessages.length < limit) setHasMore(false);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token, page]);

  const handleAddMessage = async () => {
    if (role !== "admin") {
      setError("You do not have permission to add messages.");
      return;
    }

    try {
      await addMessage(token, {
        user_id: "admin",
        message: newMessage,
      });
      setMessages((prev) => [{ userID: "admin", message: newMessage }, ...prev]);
      setNewMessage("");
    } catch (err) {
      setError("Failed to add message.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Messages</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {role === "admin" && (
        <div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a new message"
            rows={4}
            style={{ width: "100%" }}
          />
          <button
            onClick={handleAddMessage}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Add Message
          </button>
        </div>
      )}
      <ul>
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          return (
            <li
              ref={isLast ? lastMessageRef : null}
              key={msg.userID + index}
              style={{ marginBottom: "1rem" }}
            >
              <strong>{msg.userID}:</strong> {msg.message}
            </li>
          );
        })}
      </ul>

      {loading && <p>Loading more...</p>}
      {!hasMore && !loading && <p>✅ All messages loaded.</p>}

    </div>
  );
};

export default MessageList;
