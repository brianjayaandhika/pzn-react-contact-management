import formatDate from "@/helpers/dateFormatter";
import { Task, TaskPriority, TaskStatus } from "@/lib/api/task/task.types";
import _ from "lodash";
import Badge from "../Badge";
import Button from "../Button";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

function StatusCn(status: TaskStatus) {
  let el;

  switch (status) {
    case TaskStatus.ACTIVE:
      el = "bg-green-600 border text-white";
      break;
    case TaskStatus.IN_PROGRESS:
      el = "bg-sky-600 border text-white";
      break;
    case TaskStatus.DONE:
      el = "bg-gray-600 border text-white";
      break;
    case TaskStatus.BLOCKED:
      el = "bg-red-600 border text-white";
      break;
    default:
      el = "bg-gray-700 border text-white";
      break;
  }

  return el;
}

function PriorityCn(priority: TaskPriority) {
  let el;

  switch (priority) {
    case TaskPriority.HIGH:
      el = "bg-red-600 border text-white";
      break;
    case TaskPriority.MEDIUM:
      el = "bg-yellow-600 border text-white";
      break;
    case TaskPriority.LOW:
      el = "bg-green-600 border text-white";
      break;
    default:
      el = "bg-gray-700 border text-white";
      break;
  }

  return el;
}

export default function TaskCard({
  task,
  tab,
  handleClick,
  handleEdit,
  handleDelete,
}: {
  task: Task;
  tab?: number;
  handleClick: (path: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}) {
  if (!task) {
    return <div>Task is empty</div>;
  }

  return (
    <div
      onClick={() => handleClick(`/dashboard/task/${task.id}`)}
      className={`${
        tab == 2 && "grayscale-75"
      } w-full h-full group relative flex flex-col justify-between rounded-2xl border border-slate-700/70 bg-slate-800 shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] hover:shadow-[0_18px_15px_-12px_rgba(255,255,255,.1)] hover:bg-slate-700 transition-all duration-300 overflow-clip cursor-pointer`}
    >
      <div className="p-4 flex flex-col gap-3">
        <div className="h-1 w-full bg-gradient-to-r from-blue-400/50 via-indigo-400/40 to-purple-400/40" />
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {task?.title ? task.title : "Untitled"}
          </h3>
          <p className="text-xs text-white/50">
            Due: {formatDate(task?.due, false, true)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            label={`${task.priority} Priority`}
            customCn={PriorityCn(task.priority)}
          />
          <Badge
            label={task?.status ? task.status : "UNKNOWN"}
            customCn={StatusCn(task.status)}
          />
        </div>
        <p className="text-white/90 leading-relaxed line-clamp-3">
          {task?.description ? task.description : "No description provided."}
        </p>
        <p className="self-start text-xs text-white/50">
          {`Created at: ${formatDate(task?.createdAt, true)}`}
        </p>
      </div>
      <div className="w-fit flex gap-3 self-end px-4">
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
