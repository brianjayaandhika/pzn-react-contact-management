import { FaCity, FaEdit, FaStreetView } from "react-icons/fa";
import { BiCode, BiFlag, BiHome } from "react-icons/bi";
import Button from "../Button";
import { FiDelete } from "react-icons/fi";
import getRandomColor from "../../helpers/getRandomColor";
import { GiIsland } from "react-icons/gi";
import { Address } from "@/lib/api/address/address.types";

export default function AddressCard({
  address,
  handleClick = () => {},
  handleEdit,
  handleDelete,
}: {
  address: Address;
  handleClick?: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <div className="w-full min-h-full bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col items-center align-middle gap-2 p-4 hover:-translate-y-[2px] hover:bg-gray-700/50 duration-150 ease-in-out">
      <div onClick={handleClick} className="flex flex-col gap-4 ">
        <div className="w-full max-h-60 flex gap-3 justify-start align-middle items-center">
          <div
            className={`${getRandomColor()} rounded-full flex justify-center items-center align-middle p-3 text-md`}
          >
            <BiHome />
          </div>
          <p className="text-lg font-bold">Address</p>
        </div>
        <table>
          <tbody className="w-full h-full table-fixed text-left flex flex-col gap-4 justify-start align-middle items-center">
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <FaStreetView />
                Street
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-ellipsis text-nowrap">
                : {address.street}
              </td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <FaCity />
                City
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap text-ellipsis">
                : {address.city}
              </td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <GiIsland />
                Province
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap text-ellipsis">
                : {address.province}
              </td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <BiFlag />
                Country
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
                : {address.country}
              </td>
            </tr>
            <tr className="table w-full table-fixed">
              <td className="flex gap-1 text-sm text-gray-300 align-middle items-center justify-start">
                <BiCode />
                Postal Code
              </td>
              <td className="text-sm text-gray-300 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
                : {address.postalCode}
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
