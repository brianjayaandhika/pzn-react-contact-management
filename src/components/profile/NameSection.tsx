import { FaUser, FaUserEdit } from "react-icons/fa";
import PageTitle from "../PageTitle";
import InputLabel from "../InputLabel";
import Button from "../Button";
import { BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";
import { User } from "@/lib/api/user/user.types";

export default function NameSection({
  user,
  handleEdit,
}: {
  user: User;
  handleEdit: (name: string) => void;
}) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-3 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl hover:-translate-y-1 transition-all duration-100 ease-in-out">
      <PageTitle
        IconComponent={FaUserEdit}
        title={"Edit Profile"}
        fontSize="text-lg"
        isCircle
      />
      <InputLabel
        mapper="fullname"
        text="Full Name"
        IconComponent={FaUser}
        placeholderText="Enter a new name"
        isRequired
        type="text"
        value={name}
        handleChange={(e) => setName(e.target.value)}
        fontSize="text-sm text-white/80"
        customStyle="mt-2"
      />
      <Button
        IconComponent={BiSave}
        text={"Update Profile"}
        variant={"blue"}
        type={"button"}
        handleClick={() => handleEdit(name)}
      />
    </div>
  );
}
