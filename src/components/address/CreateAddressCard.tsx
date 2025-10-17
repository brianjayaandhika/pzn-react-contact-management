import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router";

export default function CreateAddressCard({
  contactId,
}: {
  contactId: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/create_address/${contactId}`)}
      className="w-full min-h-full h-[250px] bg-gray-800/50 rounded-2xl border border-gray-600 outline-dashed outline-1 outline-gray-700  flex flex-col justify-center items-center align-middle gap-4 p-12 cursor-pointer hover:-translate-y-[2px] hover:bg-gray-700/50 duration-150 ease-in-out"
    >
      <div className="rounded-full bg-blue-800 flex justify-center items-center align-middle p-4 text-3xl">
        <IoMdAdd />
      </div>
      <p className="text-lg font-bold">Add Address</p>
    </div>
  );
}
