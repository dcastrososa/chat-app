import React from "react";
import { useChatLogic } from "./ChatsLogic";
import ChatContainer from "./component/chat-container";
import ChatsList from "./component/chats-list";
import ModalListUsers from "./../../components/modal-list-users";
import Header from "./../../components/header";
import { Row, Spin, Col, Icon } from "antd";
import { Button } from "antd/lib/radio";

const Chats = () => {
  const {
    chats,
    sendMessage,
    chatIndexActive,
    setChatIndexActive,
    loadingChats,
    openListUsers,
    setOpenListUsers,
    onClickedUserFromList,
    loadingChatContainer
  } = useChatLogic();

  return (
    <>
      <Header />
      {!loadingChats ? (
        <>
          <Row>
            <Col span={10}>
              <Row>
                <Col span={18}>
                  {chats.length > 0 ? (
                    <ChatsList
                      chats={chats}
                      onClicked={index => setChatIndexActive(index)}
                    />
                  ) : (
                    <span>no tienes chats</span>
                  )}
                </Col>
                <Col span={6}>
                  <Button onClick={() => setOpenListUsers(true)}>
                    <Icon type="user-add" />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={14}>
              <ChatContainer
                chat={chats[chatIndexActive]}
                sendMessage={sendMessage}
                loading={loadingChatContainer}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Spin />
      )}

      <ModalListUsers
        open={openListUsers}
        handleClose={() => setOpenListUsers(false)}
        onClickedUser={onClickedUserFromList}
      />
    </>
  );
};

export default Chats;
