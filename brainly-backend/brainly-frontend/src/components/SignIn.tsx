import { useRef } from "react";
import { Button } from "./ui/Button";
import { InputBox } from "./ui/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

export default function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function handleSignIn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/signin`,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate('/home')
    } catch (err) {
      console.log(err);
    }

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
            text="Sign In"
            size="md"
            onClick={handleSignIn}
          />
        </div>
      </div>
    </div>
  );
}
