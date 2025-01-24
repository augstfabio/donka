import React, { createContext, useState, useContext } from 'react';
import BannerAlert from '../components/BannerAlert';

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("info");

  const showMessage = (msg, msgType = "info", duration = 5000) => {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && <BannerAlert message={message} type={type} />}
    </MessageContext.Provider>
  );
};
