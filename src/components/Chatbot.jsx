import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm your BloodConnect assistant. I'm currently in demo mode and can provide basic information about blood donation. For more detailed answers, please set up the Gemini API key.",
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const getMockResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('eligib') || input.includes('qualif') || input.includes('require')) {
      return "To donate blood, you typically need to be 18-65 years old, weigh at least 50kg, be in good health, and not have any transmittable diseases. There should be at least 56 days between donations. Specific requirements may vary, so it's best to consult with our medical staff.";
    } else if (input.includes('process') || input.includes('how to donate') || input.includes('what happens')) {
      return "The blood donation process is simple and safe:\n\n1. Registration and health check\n2. Mini health screening (hemoglobin, blood pressure)\n3. Comfortable donation (takes 8-10 minutes)\n4. Rest and refreshments\n\nThe entire process takes about 30-45 minutes. Your donation can save up to 3 lives!";
    } else if (input.includes('benefit') || input.includes('why donate') || input.includes('good for')) {
      return "Blood donation benefits both recipients and donors! You help save lives while also getting a free health checkup. Donating blood can reduce iron overload, stimulate new blood cell production, and give you the satisfaction of making a life-saving difference in your community.";
    } else if (input.includes('first time') || input.includes('nervous') || input.includes('scared')) {
      return "It's completely normal to be nervous about your first donation! Our staff are trained to make you comfortable. Eat a good meal beforehand, stay hydrated, and remember that you're doing something amazing. Most donors say it's much easier than they expected!";
    } else if (input.includes('blood type') || input.includes('group') || input.includes('o+') || input.includes('a+') || input.includes('b+') || input.includes('ab+')) {
      return "All blood types are needed! O-negative is the universal donor for red blood cells, while AB-positive is the universal plasma donor. However, every blood type is precious and can save lives. We'll match your donation with patients who need your specific type.";
    } else if (input.includes('how often') || input.includes('frequency') || input.includes('wait')) {
      return "You can donate whole blood every 56 days (about 8 weeks). Male donors can donate up to 4 times a year, and female donors up to 3 times a year. Platelet donations can be made more frequently. Your body replenishes the donated blood within a few weeks.";
    } else if (input.includes('safe') || input.includes('sterile') || input.includes('clean')) {
      return "Blood donation is extremely safe! We use sterile, single-use equipment for every donation. All needles are used once and then properly disposed. Our staff follow strict hygiene protocols to ensure your safety throughout the process.";
    } else if (input.includes('time') || input.includes('long') || input.includes('take')) {
      return "The actual blood donation takes only 8-10 minutes. With registration, health screening, and post-donation rest, the entire process typically takes 30-45 minutes. It's a small time commitment for such a life-saving act!";
    } else if (input.includes('pain') || input.includes('hurt') || input.includes('needle')) {
      return "Most donors describe the feeling as a quick pinch, similar to a mosquito bite. The discomfort is minimal and brief. Our staff are experts at making the experience as comfortable as possible. The life-saving impact far outweighs the momentary discomfort!";
    } else if (input.includes('after') || input.includes('recover') || input.includes('rest')) {
      return "After donating, we recommend:\n• Rest for 10-15 minutes\n• Drink plenty of fluids\n• Avoid heavy lifting for 24 hours\n• Eat iron-rich foods\nMost people feel completely normal immediately after donation and can resume normal activities.";
    } else {
      return "Thank you for your interest in blood donation! I can help with information about:\n• Eligibility requirements\n• The donation process\n• Health benefits\n• Blood types\n• Safety measures\n• Recovery after donation\n\nWhat specific question can I answer for you?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setApiError(false);

    try {
      // Use mock responses (API functionality removed)
      const botResponse = getMockResponse(inputMessage);

      const botMessage = {
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setApiError(true);
      
      // Fallback to mock response
      const botResponse = getMockResponse(inputMessage);
      const botMessage = {
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What are the eligibility requirements?",
    "How does the donation process work?",
    "What are the health benefits?",
    "How often can I donate blood?",
    "Is blood donation safe?",
    "What should I do after donating?"
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">BloodConnect Assistant</h3>
                <p className="text-red-100 text-xs">
                  Demo Mode • Basic Info
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-200 transition-colors"
              aria-label="Close chat"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>


          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isBot
                        ? 'bg-white border border-gray-200 text-gray-800'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-500' : 'text-red-100'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 text-center">Try asking:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        setTimeout(handleSendMessage, 100);
                      }}
                      className="text-left text-xs bg-white border border-gray-200 rounded-xl p-2 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about blood donation..."
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Demo Mode • Blood donation information
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;