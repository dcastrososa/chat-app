import { useState } from "react";
import { cloneDeep } from "./../../utils";
import { UserDAO } from "./../../daos";
import { message } from "antd";
import { keysLocalStorage } from "./../../constants";

const initialValues = {
  email: "",
  password: ""
};

const userDAO = new UserDAO();

export const useLoginLogic = ({ history }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const onChangeValues = event => {
    const { name, value } = event.target;
    const updatedValues = cloneDeep(formValues);
    updatedValues[name] = value;
    setFormValues(updatedValues);
  };

  const onSubmit = async () => {
    const response = await userDAO.login(formValues);

    if (!response.success) {
      return message.error("Credenciales Invalidas");
    }

    const { data } = response;
    localStorage.setItem(keysLocalStorage.user, JSON.stringify(data.user));
    localStorage.setItem(keysLocalStorage.tokenUser, data.token);
    history.push("/chats");
  };

  return { formValues, onChangeValues, onSubmit };
};
