import { useState } from "react";
import { FaMailBulk, FaPhone, FaSearch, FaUser } from "react-icons/fa";
import {
  MdClear,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import InputLabel from "../InputLabel";
import Button from "../Button";

export default function SearchContact({
  handleSearch,
  handleClear,
}: {
  handleSearch: (name: string, email: string, phone: string) => Promise<void>;
  handleClear: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div
      className={`${
        isCollapsed ? "h-[275px]" : "h-[90px]"
      } w-full bg-gray-800 px-4 py-8 rounded-2xl border border-gray-700 flex justify-start transition-all duration-400 ease-in-out overflow-hidden flex-col gap-8`}
    >
      <div
        className="w-full flex justify-between items-start cursor-pointer"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="">
          <span className="text-blue-400 text-md flex gap-3 items-center">
            <FaSearch />
            <p className="text-white font-semibold">Search Contacts</p>
          </span>
        </div>
        <div className="">
          {isCollapsed ? (
            <MdOutlineKeyboardArrowUp size="24px" />
          ) : (
            <MdOutlineKeyboardArrowDown size="24px" />
          )}
        </div>
      </div>
      <div
        className={`
          ${isCollapsed ? "opacity-100" : "opacity-0"}
          w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-200 ease-in-out overflow-hidden`}
      >
        <InputLabel
          IconComponent={FaUser}
          mapper="contactName"
          text="Name"
          type="text"
          placeholderText="Search By Name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
          fontSize="text-sm"
        />
        <InputLabel
          IconComponent={FaMailBulk}
          mapper="email"
          text="Email"
          type="text"
          placeholderText="Search By Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          fontSize="text-sm"
        />
        <InputLabel
          IconComponent={FaPhone}
          mapper="phone"
          text="Phone"
          type="text"
          placeholderText="Search By Phone"
          value={phone}
          handleChange={(e) => setPhone(e.target.value)}
          fontSize="text-sm"
        />
        <div className="w-full col-span-3 flex gap-4 justify-end">
          <Button
            customStyle="w-fit! px-25"
            variant="blue"
            text="Search"
            IconComponent={FaSearch}
            type="button"
            handleClick={(e) => {
              e.preventDefault();
              handleSearch(name, email, phone);
            }}
          />
          <Button
            customStyle="w-fit!"
            variant="gray"
            IconComponent={MdClear}
            type="button"
            handleClick={(e) => {
              e.preventDefault();
              handleClear();
              setName("");
              setPhone("");
              setEmail("");
            }}
          />
        </div>
      </div>
    </div>
  );
}
