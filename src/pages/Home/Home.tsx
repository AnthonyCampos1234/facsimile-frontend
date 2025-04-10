import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

function Home() {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: 'user' | 'system' }>
  >([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Add system response here
      setMessages((prev) => [
        ...prev,
        { text: 'System response...', sender: 'system' }
      ]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <button onClick={handleClearChat} className={styles.clearButton}>
            Clear Chat
          </button>
        </div>
        <div className={styles.messagesArea}>
          <div className={styles.messageWrapper}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
