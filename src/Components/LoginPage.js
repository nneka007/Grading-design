import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loading, toggleLoading] = useState(false);
  let navigate = useNavigate();

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }
  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  async function submitHandler() {
    toggleLoading(true);
    const inputData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    const result = await axios.post(
      "https://api.citrone.co/api/login",
      inputData
    );
    toggleLoading(false);
    console.log(result);
    localStorage.setItem("token", result.data.access_token);
    setEnteredEmail("");
    setEnteredPassword("");
    navigate("/grading");
  }

  return (
    <div className="w-auto lg:mr-24">
      <div className="bg-white p-10 m-10 rounded-md w-auto">
        <div className="mb-5">
          <label>Email address</label>
          <div>
            <Input
              value={enteredEmail}
              type="email"
              onChange={emailChangeHandler}
              placeholder="Basic usage"
            />
          </div>
        </div>
        <div className="mb-5">
          <label>Password</label>
          <div>
            <Input.Password
              value={enteredPassword}
              onChange={passwordChangeHandler}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
        <div>
          <Button
            onClick={() => submitHandler()}
            type="primary"
            loading={loading}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
