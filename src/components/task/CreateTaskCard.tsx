import { MdAddTask } from "react-icons/md";

export default function CreateTaskCard({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  return (
    <div
      onClick={() => handleNavigate("/dashboard/create_task")}
      className="w-full min-h-full h-[250px] bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-4 p-12 cursor-pointer hover:-translate-y-[2px] hover:bg-gray-800/80 duration-150 ease-in-out"
    >
      <div className="rounded-full bg-blue-800 flex justify-center items-center align-middle p-4 text-3xl">
        <MdAddTask />
      </div>
      <p className="text-lg font-bold">Create New Task</p>
    </div>
  );
}
