import { useEffect, useState } from "react";
import { ChatDAO, Socket, MessageDAO } from "./../../daos";
import { getHeaderAuth, cloneDeep } from "../../utils";
import { eventsMessages, keysLocalStorage } from "./../../constants";
import { message as messageAlert } from "antd";

const socket = new Socket();
socket.initSocketChatSpace();
const socketChat = socket.getSocketChatSpace();

const chatDAO = new ChatDAO(getHeaderAuth());
const messageDAO = new MessageDAO(getHeaderAuth());

const userLoggued = JSON.parse(localStorage.getItem(keysLocalStorage.user));

export const useChatLogic = () => {
  const [chats, setChats] = useState([]);
  const [chatIndexActive, setChatIndexActive] = useState(0);
  const [loadingChats, setLoadingChats] = useState(true);
  const [openListUsers, setOpenListUsers] = useState(false);
  const [loadingChatContainer, setLoadingChatContainer] = useState(false);

  // Get chats and set in the state
  const initChats = async () => {
    const response = await chatDAO.findAll();
    setLoadingChats(false);
    if (!response.data) return;

    const { data } = response;
    setChats(data);
  };

  /**
   * Send message and emit event of new message to server
   * @param {Number} chat_id
   * @param {String} message
   */
  const sendMessage = async (chat_id, message) => {
    const response = await messageDAO.create({ message, chat_id });
    if (!response.data) return messageAlert.error("Error enviando mensaje");

    socketChat.emit(`${eventsMessages.NEW_MESSAGE}`, {
      chatId: chat_id,
      message: response.data
    });
  };

  const onClickedUserFromList = async userId => {
    setLoadingChatContainer(true);
    let chatIndex = chats.findIndex(chat => chat.user.id === userId);
    if (chatIndex > -1) {
      setChatIndexActive(chatIndex);
      setLoadingChatContainer(false);
      return;
    }

    // TODO: handle error response
    const response = await chatDAO.create({ user_id: userId });
    const chat = response.data;
    const updatedChats = cloneDeep(chats);
    updatedChats.unshift(chat);
    setChats(updatedChats);
    setLoadingChatContainer(false);

    chat.user = userLoggued;

    socketChat.emit(eventsMessages.NEW_CHAT, { userId, chat: chat });
  };

  useEffect(() => {
    initChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => socketChat.disconnect();
  }, []);

  useEffect(() => {
    /**
     * Update messages in the state
     * @param {Object} data, message received
     */
    const onNewMessageReceived = data => {
      const updatedChats = cloneDeep(chats);
      const index = updatedChats.findIndex(chat => chat.id === data.chat_id);
      updatedChats[index].messages.push(data);
      setChats(updatedChats);
      setChatIndexActive(0);
    };

    for (let i = 0; i < chats.length; i++) {
      // New message event received.
      socketChat.on(
        `${eventsMessages.NEW_MESSAGE}-${chats[i].id}`,
        onNewMessageReceived
      );
    }

    socketChat.on(`${eventsMessages.NEW_CHAT}-${userLoggued.id}`, function(
      data
    ) {
      const updatedChats = cloneDeep(chats);
      updatedChats.unshift(data);
      setChats(updatedChats);
    });
  }, [chats]);

  return {
    chats,
    sendMessage,
    chatIndexActive,
    setChatIndexActive,
    loadingChats,
    openListUsers,
    setOpenListUsers,
    onClickedUserFromList,
    loadingChatContainer
  };
};
