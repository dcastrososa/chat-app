import React from "react";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

export default () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};
