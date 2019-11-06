import React from "react";
import { keysLocalStorage } from "../../constants";
import "./style.sass";

export default () => {
  const userLogued = JSON.parse(localStorage.getItem(keysLocalStorage.user));
  return (
    <div className="header">
      <div className="email">{userLogued.email}</div>
    </div>
  );
};
