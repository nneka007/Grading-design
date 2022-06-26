import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card } from "antd";
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
    const result = await axios
      .post("https://api.citrone.co/api/login", inputData)
      .then((res) => {
        toggleLoading(false);
        localStorage.setItem("token", res.data.access_token);
        setEnteredEmail("");
        setEnteredPassword("");
        navigate("/grading");
      })
      .catch((err) => {
        alert("Error logging in");
        toggleLoading(false);
      });
  }

  return (
    <div className="mx-36 mt-12">
      <Card>
        <div className="bg-white m-5 rounded-md w-auto">
          <div className="mb-5">
            <label>Email address</label>
            <div>
              <Input
                value={enteredEmail}
                type="email"
                onChange={emailChangeHandler}
                placeholder="Enter email here"
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
      </Card>
    </div>
  );
}
export default Login;
