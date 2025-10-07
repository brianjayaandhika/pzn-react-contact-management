import { Link } from "react-router";
import InputLabel from "./InputLabel";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaAddressCard, FaCheckDouble, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Register() {
  return (
    <div className="container w-1/4 h-full p-4 flex flex-col justify-center items-center text-center border border-gray-700 rounded-xl bg-gray-800 ">
      <div className="rounded-full bg-blue-500 p-2 flex justify-center items-center mb-2">
        <BsPersonFillAdd size="36px" />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <p className="text-sm text-gray-300">Create a new account</p>
      </div>

      <form className="flex flex-col gap-4 w-full">
        <InputLabel
          IconComponent={FaUser}
          mapper="username"
          text="Username"
          placeholderText="Choose a username"
        />
        <InputLabel
          IconComponent={FaAddressCard}
          mapper="fullname"
          text="Fullname"
          placeholderText="Enter you full name"
        />
        <InputLabel
          IconComponent={RiLockPasswordFill}
          mapper="password"
          text="Password"
          placeholderText="Create a password"
          type="password"
        />
        <InputLabel
          IconComponent={FaCheckDouble}
          mapper="confirmpassword"
          text="Confirm Password"
          placeholderText="Confirm your password"
          type="password"
        />
        <button>icon Register</button>
      </form>
      <span>
        Already have an account? <Link to={"/login"}>Sign In</Link>
      </span>
    </div>
  );
}
