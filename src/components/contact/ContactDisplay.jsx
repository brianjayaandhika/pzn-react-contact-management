import { BiEdit } from "react-icons/bi";
import { FaMailBulk, FaPhone, FaUser, FaUserTag } from "react-icons/fa";
import Button from "../Button";

export default function ContactDisplay({ contact, handleNavigate }) {
  return (
    <div className="w-full grid gap-4 lg:grid-cols-2 grid-cols-1">
      <div className="w-full flex gap-4 flex-col justify-center items-center align-middle col-span-2 mb-4">
        <div className="rounded-full bg-blue-900 text-3xl  justify-center items-center align-middle p-6">
          <FaUser />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center align-middle w-fit text-xl font-bold">
          {contact?.firstName} {contact?.lastName}
          <div className="w-[80%] border-2 border-blue-900 "></div>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <FaUserTag />
          <p className="text-xs text-white/70">First Name</p>
        </div>
        <p>{contact?.firstName}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <FaUserTag />
          <p className="text-xs text-white/70">Last Name</p>
        </div>
        <p>{contact?.lastName}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col col-span-2">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <FaMailBulk />
          <p className="text-xs text-white/70">Email</p>
        </div>
        <p>{contact?.email}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col col-span-2">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <FaPhone />
          <p className="text-xs text-white/70">Phone</p>
        </div>
        <p>{contact?.phone}</p>
      </div>

      <div className="col-span-2 flex w-full gap-3 justify-end">
        <Button
          variant="blue"
          text="Edit Contact"
          IconComponent={BiEdit}
          customStyle="text-nowrap w-fit! mb-0!"
          handleClick={() =>
            handleNavigate(`/dashboard/edit_contact/${contact.id}`)
          }
        />
      </div>
    </div>
  );
}
