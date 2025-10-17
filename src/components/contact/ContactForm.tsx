import { FaMailBulk, FaUserTag } from "react-icons/fa";
import InputLabel from "../InputLabel";
import { useEffect, useState } from "react";
import { PiPhone } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "../Button";
import PageTitle from "../PageTitle";
import { Contact } from "@/lib/api/contact/contact.types";

type Props = {
  title: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) => void;
  IconComponent: React.ComponentType;
  buttonText: string;
  buttonIcon: React.ComponentType;
  contact?: Contact | null;
};

export default function ContactForm({
  title,
  handleSubmit,
  IconComponent,
  buttonText,
  buttonIcon,
  contact = null,
}: Props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
  }, [contact]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, firstName, lastName, email, phone)}
      className="w-full flex gap-4 flex-col justify-center items-center align-middle"
    >
      <PageTitle IconComponent={IconComponent} title={title} />
      <div className="w-fit h-full p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 grid gap-6 lg:grid-cols-2 grid-cols-1">
        <InputLabel
          mapper="firstName"
          text="First Name"
          IconComponent={FaUserTag}
          placeholderText="Enter First Name"
          isRequired
          type="text"
          value={firstName}
          handleChange={(e) => setFirstName(e.target.value.trim())}
          fontSize="text-sm"
        />
        <InputLabel
          mapper="lastName"
          text="Last Name"
          IconComponent={FaUserTag}
          placeholderText="Enter Last Name"
          isRequired
          type="text"
          value={lastName}
          handleChange={(e) => setLastName(e.target.value.trim())}
          fontSize="text-sm"
        />
        <InputLabel
          mapper="email"
          text="Email"
          IconComponent={FaMailBulk}
          placeholderText="Enter Email"
          isRequired
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value.trim())}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <InputLabel
          mapper="phone"
          text="Phone"
          IconComponent={PiPhone}
          placeholderText="Enter Phone"
          isRequired
          type="text"
          value={phone}
          handleChange={(e) => setPhone(e.target.value.trim())}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <div className="col-span-2 flex w-full gap-3 justify-end">
          <Button
            variant="gray"
            text="Cancel"
            IconComponent={MdCancel}
            customStyle="text-nowrap w-fit! mb-0!"
            handleClick={() => navigate("/dashboard/contact")}
            type="button"
          />
          <Button
            variant="blue"
            text={buttonText}
            IconComponent={buttonIcon}
            customStyle="text-nowrap w-fit! mb-0!"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
