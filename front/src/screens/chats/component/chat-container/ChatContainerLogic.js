import { useState } from "react";

export const useChatContainerLogic = () => {
  const [message, setMessage] = useState("");

  return { message, setMessage };
};
