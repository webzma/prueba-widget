import React, { useState, useRef, useEffect } from "react";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-96">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-800 dark:text-white">
              Chat
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center">
                No hay mensajes aún
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded px-3 py-1 self-end max-w-[80%] ml-auto"
                >
                  {msg}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2"
          >
            <input
              type="text"
              className="w-full rounded border border-gray-300 dark:border-gray-600 px-2 py-1 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition text-2xl"
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
