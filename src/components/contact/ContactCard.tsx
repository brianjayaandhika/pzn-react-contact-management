import { FaEdit, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import Button from "../Button";
import { FiDelete } from "react-icons/fi";
import getRandomColor from "../../helpers/getRandomColor";

export default function ContactCard({
  firstName,
  lastName,
  email,
  phone,
  handleClick,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="w-full min-h-full h-[300px] bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-2 p-4 cursor-pointer hover:-translate-y-[2px] hover:bg-gray-800/80 duration-150 ease-in-out">
      <div onClick={handleClick} className="flex flex-col gap-4 ">
        <div className="w-full flex gap-4 justify-start align-middle items-center">
          <div
            className={`${getRandomColor()} rounded-full flex justify-center items-center align-middle p-3 text-md`}
          >
            <FaUser />
          </div>
          <p className="text-lg font-bold">
            {firstName} {lastName}
          </p>
        </div>
        <table>
          <tbody className="w-full table-fixed text-left flex flex-col gap-4 justify-start align-middle items-center">
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <FaUser />
                First Name
              </td>
              <td className="text-sm text-gray-300">: {firstName}</td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <FaUser />
                Last Name
              </td>
              <td className="text-sm text-gray-300">: {lastName}</td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <MdEmail />
                Email
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
                : {email}
              </td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <BiPhone />
                Phone
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
                : {phone}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-fit flex gap-3 self-end">
        <Button
          type="button"
          variant="blue"
          text="Edit"
          IconComponent={FaEdit}
          handleClick={handleEdit}
        />
        <Button
          type="button"
          variant="red"
          text="Delete"
          IconComponent={FiDelete}
          handleClick={handleDelete}
        />
      </div>
    </div>
  );
}
