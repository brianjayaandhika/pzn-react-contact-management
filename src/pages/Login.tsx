import { Link, useNavigate } from "react-router";
import InputLabel from "../components/InputLabel";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../components/Button";
import { useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { useLocalStorage } from "react-use";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import { UserLogin } from "@/lib/api/user/user.api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setToken] = useLocalStorage("token", null);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await UserLogin({
      username,
      password,
    });

    console.log(response);

    if (response.data) {
      await successAlert("Login Success");
      setToken(response?.data?.token);
      navigate("/dashboard/contact");
    } else {
      await errorAlert(response?.errors || "Something went wrong...");
    }
  }

  return (
    <div className="container w-1/4 h-full p-5 flex flex-col justify-center items-center text-center border border-gray-700 rounded-xl bg-gray-800 ">
      <div className="rounded-full bg-blue-500 p-2 flex justify-center items-center mb-2">
        <BsPersonFillAdd size="36px" />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <p className="text-sm text-gray-300">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <InputLabel
          IconComponent={FaUser}
          mapper="username"
          text="Username"
          placeholderText="Enter your username"
          value={username}
          isRequired
          handleChange={(e) => setUsername(e.target.value)}
        />
        <InputLabel
          IconComponent={RiLockPasswordFill}
          mapper="password"
          text="Password"
          placeholderText="Enter your password"
          type="password"
          value={password}
          isRequired
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          IconComponent={IoLogIn}
          text="Sign In"
          variant="blue"
          disabled={!username || !password}
        />
      </form>
      <div className="flex gap-1 text-xs">
        <p className="text-gray-400">Don't have an account?</p>
        <span className="text-blue-400 cursor-pointer hover:text-blue-300">
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
}
