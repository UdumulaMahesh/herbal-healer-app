import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../Chatbot.css';

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechApiAvailable = !!SpeechRecognition;
let recognition;
if (isSpeechApiAvailable) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

// Health-related keyword responses (Moved outside component)
const getResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return "Hello! How can I assist you with your health concerns today? You can ask me about symptoms, herbal remedies, or book a doctor appointment.";
  }

  // Common symptoms
  if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
    return "For headaches, I recommend:\n\n🌿 Peppermint oil on temples\n🌿 Ginger tea\n🌿 Lavender tea\n\nWould you like more details about any of these remedies?";
  }

  if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
    return "For common cold, try:\n\n🌿 Ginger tea with honey\n🌿 Tulsi (Holy Basil) leaves\n🌿 Turmeric milk\n\nStay hydrated and get plenty of rest. If symptoms persist, consult a doctor.";
  }

  if (lowerMessage.includes('cough')) {
    return "For cough relief:\n\n🌿 Honey with black pepper\n🌿 Tulsi and ginger tea\n🌿 Mulethi (Licorice)\n\nAvoid cold drinks and stay warm.";
  }

  if (lowerMessage.includes('fever')) {
    return "For fever:\n\n🌿 Tulsi tea\n🌿 Ginger with honey\n🌿 Coriander seed water\n\nDrink plenty of fluids. If fever is high or persistent, please consult a doctor immediately.";
  }

  if (lowerMessage.includes('stomach') || lowerMessage.includes('acidity') || lowerMessage.includes('indigestion')) {
    return "For digestive issues:\n\n🌿 Fennel seeds after meals\n🌿 Ajwain (Carom seeds)\n🌿 Mint tea\n\nEat smaller meals and avoid spicy foods.";
  }

  if (lowerMessage.includes('anxiety') || lowerMessage.includes('stress')) {
    return "For anxiety and stress:\n\n🌿 Ashwagandha\n🌿 Brahmi tea\n🌿 Lavender oil\n\nTry meditation and deep breathing exercises. If anxiety is severe, please consult a mental health professional.";
  }

  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
    return "For better sleep:\n\n🌿 Chamomile tea before bed\n🌿 Ashwagandha with warm milk\n🌿 Brahmi\n\nMaintain a regular sleep schedule and avoid screens before bed.";
  }

  if (lowerMessage.includes('skin') || lowerMessage.includes('rash') || lowerMessage.includes('allergy')) {
    return "For skin issues:\n\n🌿 Neem paste\n🌿 Aloe vera gel\n🌿 Turmeric with sandalwood\n\nKeep the area clean and avoid allergens. For severe reactions, see a doctor.";
  }

  if (lowerMessage.includes('joint') || lowerMessage.includes('arthritis') || lowerMessage.includes('pain')) {
    return "For joint pain:\n\n🌿 Turmeric paste (apply externally)\n🌿 Ginger tea\n🌿 Ashwagandha\n\nRegular gentle exercise can help. Consult a doctor for persistent pain.";
  }

  // Doctor consultation
  if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment') || lowerMessage.includes('consult')) {
    return "You can book an appointment with our expert herbal doctors! Visit the 'Doctors' page from the menu or bottom navigation to see available practitioners and book a consultation.";
  }

  // Browse diseases
  if (lowerMessage.includes('disease') || lowerMessage.includes('condition') || lowerMessage.includes('browse')) {
    return "You can browse all diseases and their herbal remedies by visiting the 'Browse' page. We cover 12+ common health conditions with detailed natural treatments.";
  }

  // Emergency
  if (lowerMessage.includes('emergency') || lowerMessage.includes('severe') || lowerMessage.includes('critical')) {
    return "⚠️ For medical emergencies, please call emergency services immediately or visit the nearest hospital. This chatbot is for general health information only.";
  }

  // Thanks
  if (lowerMessage.match(/(thank|thanks|appreciate)/)) {
    return "You're welcome! Feel free to ask if you have any other health questions. Stay healthy! 🌿";
  }

  // Help
  if (lowerMessage.includes('help')) {
    return "I can help you with:\n\n✅ Common health symptoms\n✅ Herbal remedy suggestions\n✅ Disease information\n✅ Doctor appointments\n\nJust ask me about any health concern!";
  }

  // Default response
  return "I understand you're asking about health concerns. Could you please be more specific about your symptoms? For example, you can ask about headaches, cold, fever, stomach issues, etc. Or type 'help' to see what I can do!";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hello! I\'m your Health Assistant. 👋 How can I help you today? You can ask me questions or use the microphone to talk.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- SPEECH SYNTHESIS (TEXT-TO-SPEECH) ---
  const speakResponse = useCallback((text) => {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }, [isSpeechEnabled]);

  const handleSendMessage = useCallback((messageText, initiatedByVoice = false) => {
    // If messageText is not provided, default to inputMessage
    const textToProcess = (typeof messageText === 'string' ? messageText : inputMessage).trim();
    if (textToProcess === '') return;

    // Stop any speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Stop any listening
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    }

    const userMessage = {
      type: 'user',
      text: textToProcess,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponseText = getResponse(textToProcess);
      const botResponse = {
        type: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // *** MODIFICATION HERE ***
      // Only speak if initiated by voice
      if (initiatedByVoice) {
        speakResponse(botResponseText); // Speak the response
      }
    }, 1000);
  }, [inputMessage, isListening, speakResponse]);

  // --- SPEECH RECOGNITION (SPEECH-TO-TEXT) ---
  useEffect(() => {
    if (!isSpeechApiAvailable) return;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInputMessage(finalTranscript || interimTranscript);
      
      // If we have a final transcript, stop listening and send
      if (finalTranscript) {
        setIsListening(false);
        handleSendMessage(finalTranscript, true); // Send message automatically with voice flag
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        setIsListening(false);
        // Check if there's any final message to send
        const finalMessage = inputMessage.trim();
        if (finalMessage) {
          handleSendMessage(finalMessage, true); // Send message with voice flag
        }
      }
    };

    // Cleanup
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [handleSendMessage, isListening, inputMessage]); // Added handleSendMessage and isListening, removed isSpeechEnabled


  const handleListen = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      if (!isSpeechApiAvailable) {
        // A non-alert way to inform the user
        console.warn("Speech recognition is not available in your browser.");
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Sorry, speech recognition is not available in your browser.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        return;
      }
      try {
        recognition.start();
        setIsListening(true);
        setInputMessage(''); // Clear input when starting
      } catch (error) {
        console.error("Error starting recognition: ", error);
        if (error.name === 'InvalidStateError') {
          // Already started, so just stop it
          recognition.stop();
          setIsListening(false);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage, false); // Pass inputMessage and false
    }
  };

  const quickQuestions = [
    "I have a headache",
    "Cold and flu remedies",
    "Book a doctor",
    "Stress relief tips"
  ];

  const handleQuickQuestion = (question) => {
    // Set input, but pass question directly to handler
    setInputMessage(question); 
    handleSendMessage(question, false); // Pass question and false
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        {!isOpen && <span className="chatbot-badge">1</span>}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M6 18v-2"></path><path d="M10 18v-2"></path><path d="M14 18v-2"></path><path d="M18 18v-2"></path>
                </svg>
              </div>
              <div>
                <h3>Health Assistant</h3>
                <p>Online • Here to help</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`chatbot-icon-btn ${isSpeechEnabled ? 'active' : ''}`}
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                title={isSpeechEnabled ? "Disable Speech" : "Enable Speech"}
              >
                {isSpeechEnabled ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                )}
              </button>
              <button 
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="quick-questions">
                <p>Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button 
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="quick-question-btn"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <textarea
              className="chatbot-input"
              placeholder="Type or click the mic to talk..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            {isSpeechApiAvailable && (
              <button 
                className={`chatbot-icon-btn ${isListening ? 'active' : ''}`}
                onClick={handleListen}
                disabled={isTyping}
                title={isListening ? "Stop Listening" : "Start Listening"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            )}
            <button 
              className="chatbot-send-btn"
              onClick={() => handleSendMessage(inputMessage, false)} // Pass inputMessage and false
              disabled={inputMessage.trim() === '' || isListening}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

