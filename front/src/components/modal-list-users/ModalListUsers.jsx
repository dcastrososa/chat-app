import React from "react";
import { Modal, Spin, List, Typography } from "antd";
import PropTypes from "prop-types";
import { useModalListUsersLogic } from "./ModalListUsersLogic";

const { Item } = List;
const { Text } = Typography;

const ModalListUsers = ({ open, handleClose, onClickedUser }) => {
  const { users, loading } = useModalListUsersLogic();
  return (
    <Modal visible={open} onCancel={handleClose} onOk={handleClose}>
      {!loading ? (
        <List>
          {users.map(user => (
            <Item
              key={user.id}
              onClick={() => {
                handleClose();
                onClickedUser(user.id);
              }}
            >
              <Text>{user.email}</Text>
            </Item>
          ))}
        </List>
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

ModalListUsers.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickedUser: PropTypes.func
};

export default ModalListUsers;
