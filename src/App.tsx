import React from "react";
import {BrowserRouter} from "react-router-dom";
import Routing from './route';
import ChatBotComponent from './chatbot/chatbot';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ChatBotComponent />
        <Routing/>
      </BrowserRouter>
    </>
  );
}

export default App;
