import React from "react";
import PropTypes from "prop-types";
import { List } from "antd";

const { Item } = List;

/**
 * @param {Array} chats
 * @param {Function} onClicked
 */
const ChatsList = ({ chats, onClicked }) => {
  return (
    <List>
      {chats.map((chat, index) => (
        <Item
          key={chat.id}
          onClick={() => onClicked(index)}
          style={{ display: "block" }}
        >
          <p>{chat.user.email}</p>
          <p style={{ fontWeight: "bold" }}>
            {chat.messages.length > 0 &&
              chat.messages[chat.messages.length - 1].message}
          </p>
        </Item>
      ))}
    </List>
  );
};

ChatsList.propTypes = {
  chats: PropTypes.array.isRequired,
  onClicked: PropTypes.func.isRequired
};

export default ChatsList;
