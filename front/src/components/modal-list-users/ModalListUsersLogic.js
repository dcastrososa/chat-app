import { useState, useEffect } from "react";
import { UserDAO } from "./../../daos";
import { getHeaderAuth } from "./../../utils";

const userDAO = new UserDAO(getHeaderAuth());

export const useModalListUsersLogic = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const initUsers = async () => {
    const response = await userDAO.findAll();
    setLoading(false);

    if (response.data) setUsers(response.data);
  };

  useEffect(() => {
    initUsers();
  }, []);

  return { loading, users };
};
