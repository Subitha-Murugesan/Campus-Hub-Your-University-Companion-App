import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Sparkles, Clock, MapPin, Book, Coffee, HelpCircle } from 'lucide-react';
import { generateChatbotResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lara';
  timestamp: Date;
}

interface ChatbotAssistantProps {
  onClose: () => void;
}

export function ChatbotAssistant({ onClose }: ChatbotAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Lara, your FAU campus assistant. How can I help you today?",
      sender: 'lara',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedQuestions = [
    { icon: Clock, text: "What are library opening hours?" },
    { icon: MapPin, text: "How do I get to the Engineering building?" },
    { icon: Book, text: "When is course registration?" },
    { icon: Coffee, text: "Where is the nearest cafeteria?" },
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userInput = inputText;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call the actual Gemini API
      const response = await generateChatbotResponse(userInput);
      const laraMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'lara',
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, laraMessage]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing your message. Please try again.",
        sender: 'lara',
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Chat Window */}
      <div className="relative w-full sm:max-w-md h-[80vh] sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl flex flex-col rounded-t-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl">Lara</h2>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>AI Campus Assistant</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                } rounded-2xl px-4 py-3 shadow-sm`}
              >
                {message.sender === 'lara' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs text-purple-600">Lara</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600">Lara</span>
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-600 mb-2">Suggested questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question.text)}
                    className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700 line-clamp-2">{question.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-3xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about FAU..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`p-3 rounded-xl transition-colors ${
                inputText.trim() && !isTyping
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="px-6 py-3 text-center border-b border-gray-200 bg-blue-50 space-y-2">
          <p className="text-xs text-gray-500">
            Fully developed by <span className="font-semibold text-gray-700">SUBITHA MURUGESAN</span>
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
              subithaa10@gmail.com
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Developer Credit - Bottom */}
      <div className="px-6 py-3 text-center border-t border-gray-200 bg-gray-50 space-y-2">
        <p className="text-xs text-gray-500">
          Fully developed by <span className="font-semibold text-gray-700">SUBITHA MURUGESAN</span>
        </p>
        <div className="flex items-center justify-center gap-3 text-xs">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            subithaa10@gmail.com
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export function ChatbotButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse" />
    </button>
  );
}