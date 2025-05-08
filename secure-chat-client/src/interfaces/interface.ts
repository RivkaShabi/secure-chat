export interface UserContextType {
  currentUsername: string;
  setCurrentUsername: (username: string) => void;
}

export interface MessageType {
  sender: string;
  encryptedContent: string;
}

export interface ChatMessagesProps {
  messages: { sender: string; message: string }[];
  messagesEndRef: React.RefObject<HTMLDivElement | null> | null;
}

export interface ChatHeaderProps {
  onFetchHistory: () => void;
}