import React from "react";
import { Form, Input, Button } from "antd";
import { useLoginLogic } from "./LoginLogic";

const Login = ({ history }) => {
  const { formValues, onChangeValues, onSubmit } = useLoginLogic({ history });
  const { email, password } = formValues;

  return (
    <Form>
      <Form.Item>
        <Input value={email} onChange={onChangeValues} name="email" />
      </Form.Item>

      <Form.Item>
        <Input
          value={password}
          onChange={onChangeValues}
          name="password"
          type="password"
        />
      </Form.Item>

      <Form.Item>
        <Button onClick={onSubmit}>Login</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
