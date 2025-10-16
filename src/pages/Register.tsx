import { Link, useNavigate } from "react-router";
import InputLabel from "../components/InputLabel";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaAddressCard, FaCheckDouble, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../components/Button";
import { useState } from "react";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import { UserRegister } from "@/lib/api/user/user.api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      await errorAlert("Password don't match");
      return;
    }

    const response = await UserRegister({
      username,
      password,
      name,
    });

    if (response.data) {
      await successAlert("User created successfully");
      navigate("/login");
    } else {
      await errorAlert(response.errors);
    }
  }

  return (
    <div className="container w-1/4 h-full p-5 flex flex-col justify-center items-center text-center border border-gray-700 rounded-xl bg-gray-800 ">
      <div className="rounded-full bg-blue-500 p-2 flex justify-center items-center mb-2">
        <BsPersonFillAdd size="36px" />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <p className="text-sm text-gray-300">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <InputLabel
          IconComponent={FaUser}
          mapper="username"
          text="Username"
          placeholderText="Choose a username"
          value={username}
          isRequired
          handleChange={(e) => setUsername(e.target.value)}
        />
        <InputLabel
          IconComponent={FaAddressCard}
          mapper="fullname"
          text="Fullname"
          placeholderText="Enter your full name"
          value={name}
          isRequired
          handleChange={(e) => setName(e.target.value)}
        />
        <InputLabel
          IconComponent={RiLockPasswordFill}
          mapper="password"
          text="Password"
          placeholderText="Create a password"
          type="password"
          value={password}
          isRequired
          handleChange={(e) => setPassword(e.target.value)}
        />
        <InputLabel
          IconComponent={FaCheckDouble}
          mapper="confirmpassword"
          text="Confirm Password"
          placeholderText="Confirm your password"
          type="password"
          value={confirmPassword}
          isRequired
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          IconComponent={BsPersonFillAdd}
          text="Register"
          variant="blue"
        />
      </form>
      <div className="flex gap-1 text-xs">
        <p className="text-gray-400">Already have an account?</p>
        <span className="text-blue-400 cursor-pointer hover:text-blue-300">
          <Link to={"/login"}>Sign In</Link>
        </span>
      </div>
    </div>
  );
}
