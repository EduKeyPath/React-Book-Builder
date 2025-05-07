import React, { useState } from "react";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import './chatbot.css';

export default function ChatBotComponent() {
    const [toggleChatBot, setToggleChatbot] = useState(false);
    const [messages, setMessages] = useState<Array<ChatCompletionRequestMessage>>([{ role: "system", content: "System is math teacher." }]);
    const [inputText, setInputText] = useState('');
    const configuration = new Configuration({
        apiKey: '', // your api key;
    });
    const openai = new OpenAIApi(configuration);
    const handleMessageSubmit = async (e:any) => {
        try {
            e.preventDefault();
            // Add user message to the chat
            let newMessages: Array<ChatCompletionRequestMessage> = [...messages, { role: 'user', content: inputText }];
            setInputText('');

            // Send user message to the AI chatbot
            const response:any = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: newMessages,
                temperature: 0.6,
                n: 1,
                stop: '\n',
            });
            // Add AI's response to the chat
            newMessages = [...newMessages, { role: 'assistant', content: response.data.choices[0].message.content }];
            setMessages(newMessages);
        }
        catch (ex) {
            debugger;
            console.log(ex);
        }
    };

    const showChatBot = () => {
        setToggleChatbot(!toggleChatBot);
    }

    return (
        <>
            <div className="chatbot-container">
                <button type="button" onClick={showChatBot} className="ds-btn ds-btn--secondary ds-btn-icon chat-icon">
                    <span className="material-icons-outlined ds-btn__icon" aria-hidden="true">
                        {
                            !!toggleChatBot ? 'close' : 'smart_toy'
                        }
                    </span>
                </button>
                {
                    !!toggleChatBot ? 
                    <div className="chatbot-msg-wrapper">
                        <h3 className="subhd">Helper!</h3>
                        <div className="chatbot-thread-container">
                            {messages.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                {message.content}
                            </div>
                            ))}
                        </div>
                        <div className="chatbot-input-container">
                            <form onSubmit={handleMessageSubmit}>
                                <input
                                    type="text"
                                    className="fld"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button type="submit" className="ds-btn ds-btn--tertiary ds-btn-icon">
                                    <span className="material-icons-outlined ds-btn__icon" aria-hidden="true">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    : null
                }                
            </div>            
        </>
    )
}