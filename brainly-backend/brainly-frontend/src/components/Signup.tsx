import { useRef } from "react";
import { Button } from "./ui/Button";
import { InputBox } from "./ui/InputBox";
import { BACKEND_URL } from "../config"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function handleSignUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username + "" + password)
    await axios
      .post(
        `${BACKEND_URL}/api/v1/signup`,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (res) {
        alert(res.data);
        navigate("/signin")
      })
      .catch(function (error) {
        alert(error);
      });

      
  }



  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl min-h-68   shadow-xl min-w-60">
        <div className="p-8 mt-4">
          <InputBox ref={usernameRef} type="text" placeholder="UserName" />
          <InputBox type="password" ref={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center -mt-4">
          <Button
            variant="primary"
            text="Sign Up"
            size="md"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
}
