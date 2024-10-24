import { Button, Input } from "antd";
import React, { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { useRetailer } from "@/store/r";
import { funcMap } from "@/const/retail";
import Sales from "./sales";
import { getAiData } from "@/fetch/retailer";

const LoadingIndicator = () => (
  <div className="flex justify-start ">
    <div className="bg-gray-100 rounded-lg p-1">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  </div>
);

const ChatInterface = () => {
  const { loading, messages, open } = useRetailer((state) => state);
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        behavior: behavior,
        top: messagesRef.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      scrollToBottom("auto");
    }
  }, [open]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 transition-all"
        ref={messagesRef}
      >
        {messages.map(({ isAi, content, component, isLoading }, index) => (
          <div
            key={index}
            className={`flex ${isAi ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`${
                component ? "w-[80%]" : "max-w-[80%]"
              } rounded-lg p-4 ${
                isAi ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white"
              }`}
            >
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <>
                  {component && component}
                  {content && <Markdown>{content}</Markdown>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ChatBottom />
    </div>
  );
};

const ChatBottom = () => {
  const {
    loading,
    inputMessage,
    setInputMessage,
    setMessages,
    replaceMessage,
    setLoading,
  } = useRetailer((state) => state);

  const clickSend = async () => {
    if (!inputMessage.trim()) return;
    setLoading(true);
    setInputMessage("");
    try {
      setMessages({ role: "User", isAi: false, content: inputMessage });
      setMessages({
        role: "AI Agen",
        isAi: true,
        isLoading: true,
      });
      await getAiData({
        params: { id: "1", question: inputMessage },
        cb: (text: string, done: boolean) => {
          replaceMessage({
            role: "AI Agent",
            isAi: true,
            content: text,
          });
          if (!done) return;
          if (!text.startsWith("```json")) return;
          try {
            const jData = JSON.parse(
              text.replace("```json", "").replace("```", "")
            );
            jData["predicts"] &&
              replaceMessage({
                role: "AI Agent",
                isAi: true,
                component: <Sales data={jData["predicts"]} />,
              });
          } catch {}
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap pt-1">
        {/* {funcMap.map(({ name, hide, path, formatFun }) => {
          if (hide) return <></>;
          return (
            <div key={name} className="mb-1 mr-1">
              <Button size="small" onClick={() => click(name, path, formatFun)}>
                {name}
              </Button>
            </div>
          );
        })} */}
      </div>
      <div className="border-t p-1 bg-white">
        <div className="flex space-x-4 items-center">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Button
            type="primary"
            disabled={loading || !inputMessage?.trim()}
            loading={loading}
            onClick={clickSend}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
