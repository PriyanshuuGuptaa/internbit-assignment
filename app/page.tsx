"use client";

import { useState } from 'react';
import SlackButton from './components/SlackButton';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputMessage }), // Send the input message
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Message sent successfully!");
      } else {
        setMessage(`Failed to send message: ${result.error}`);
      }
    } catch (error) {
      setMessage("Error occurred while sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Send a Message to Slack</h1>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded text-black"
        />
        <SlackButton onClick={handleSendMessage} />
        {loading && <p>Sending...</p>}
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </main>
  );
}
