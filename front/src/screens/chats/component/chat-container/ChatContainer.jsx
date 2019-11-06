import React from "react";
import { Row, Col, Input, Button, Spin } from "antd";
import { useChatContainerLogic } from "./ChatContainerLogic";
import PropTypes from "prop-types";

/**
 * @param {Object} chat
 * @param {Function} sendMessage
 * @param {Boolean} loading
 */
const ChatContainer = ({ chat, sendMessage, loading }) => {
  const { message, setMessage } = useChatContainerLogic(sendMessage);
  
  return !loading ? (
    <Row>
      <div
        style={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}
      >
        {chat.user.email}
      </div>

      <Row>
        {chat.messages.map(message => (
          <div key={message.id}>
            <strong>{message.user.email}</strong> {message.message}
          </div>
        ))}
      </Row>
      <Row>
        <Col>
          <Input
            onChange={event => setMessage(event.target.value)}
            value={message}
          />
        </Col>
        <Col>
          <Button
            disabled={message === ""}
            onClick={async () => {
              await sendMessage(chat.id, message);
              setMessage("");
            }}
          >
            enviar mensaje
          </Button>
        </Col>
      </Row>
    </Row>
  ) : (
    <Spin />
  );
};

ChatContainer.propTypes = {
  chat: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ChatContainer;
