import { BiKey } from "react-icons/bi";
import Button from "../Button";
import InputLabel from "../InputLabel";
import PageTitle from "../PageTitle";
import { FaCheckDouble } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { useState } from "react";
import { errorAlert } from "../../helpers/AlertHelper";

export default function PasswordSection({
  handleEdit,
}: {
  handleEdit: (password: string) => void;
}) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="flex flex-col gap-3 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl hover:-translate-y-1 transition-all duration-100 ease-in-out">
      <PageTitle
        IconComponent={BiKey}
        title={"Edit Password"}
        fontSize="text-lg"
        isCircle
        customBg="bg-purple-500"
      />
      <InputLabel
        mapper="password"
        text="Password"
        IconComponent={LuLock}
        placeholderText="Enter your new password"
        isRequired
        type="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        fontSize="text-sm text-white/80"
        customStyle="mt-2"
      />
      <InputLabel
        mapper="confirmPassword"
        text="Confirm Password"
        IconComponent={FaCheckDouble}
        placeholderText="Confirm your new password"
        isRequired
        type="password"
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
        fontSize="text-sm text-white/80"
        customStyle="mt-2"
      />
      <Button
        IconComponent={BiKey}
        text={"Update Profile"}
        variant={"blue"}
        type={"button"}
        handleClick={async () => {
          if (password === confirmPassword) {
            handleEdit(password);
          } else {
            await errorAlert("Password not match!");
          }
        }}
        disabled={!password || !confirmPassword}
        customStyle={"disabled:bg-gray-400 disabled:cursor-not-allowed!"}
      />
    </div>
  );
}
