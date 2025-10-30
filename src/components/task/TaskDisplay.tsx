import { BiEdit } from "react-icons/bi";
import { FaMailBulk, FaPhone, FaUser, FaUserTag } from "react-icons/fa";
import Button from "../Button";
import { Task } from "@/lib/api/task/task.types";
import { BsListTask } from "react-icons/bs";
import { MdDescription, MdLowPriority } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoTime } from "react-icons/io5";
import formatDate from "@/helpers/dateFormatter";

export default function TaskDisplay({
  task,
  handleNavigate,
}: {
  task: Task;
  handleNavigate: (path: string) => void;
}) {
  return (
    <div className="w-full grid gap-4 lg:grid-cols-2 grid-cols-1">
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col col-span-2">
        <div className="flex gap-2 text-base text-blue-400 items-center ">
          <BsListTask />
          <p className="text-xs text-white/70">Title</p>
        </div>
        <p>{task?.title}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col col-span-2">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <MdDescription />
          <p className="text-xs text-white/70">Description</p>
        </div>
        <p>{task?.description}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col ">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <GiProgression />
          <p className="text-xs text-white/70">Status</p>
        </div>
        <p>{task?.status}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col ">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <MdLowPriority />
          <p className="text-xs text-white/70">Priority</p>
        </div>
        <p>{task?.priority}</p>
      </div>
      <div className="w-full p-4 bg-gray-700/50 text-white border border-gray-600 rounded-lg hover:bg-gray-700/90 flex gap-4 flex-col col-span-2">
        <div className="flex gap-2 text-base text-blue-400 items-center">
          <IoTime />
          <p className="text-xs text-white/70">Due</p>
        </div>
        <p>{formatDate(task?.due)}</p>
      </div>

      <div className="col-span-2 flex w-full gap-3 justify-end">
        <Button
          type="button"
          variant="blue"
          text="Edit Task"
          IconComponent={BiEdit}
          customStyle="text-nowrap w-fit! mb-0!"
          handleClick={() => handleNavigate(`/dashboard/edit_task/${task.id}`)}
        />
      </div>
    </div>
  );
}
