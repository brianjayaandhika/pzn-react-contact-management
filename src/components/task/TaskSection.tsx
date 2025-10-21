import { errorAlert } from "@/helpers/AlertHelper";
import { GetAllTask } from "@/lib/api/task/task.api";
import { Task } from "@/lib/api/task/task.types";
import { useEffect, useMemo, useState } from "react";
import PageTitle from "../PageTitle";
import { BiTask } from "react-icons/bi";

export default function TaskSection({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isOtherUrgent, setIsOtherUrgent] = useState<boolean>(false);

  // still trying to work on the way to show task (design choices)

  const renderTask = useMemo(() => {
    const test = Object.groupBy(tasks!, (e) => e.priority);
    console.log(test);

    const urgentTask = tasks?.filter(
      (item) => item.priority == 1 || item.priorityLabel === "High"
    );

    return urgentTask && urgentTask.length > 1;
  }, [tasks]);

  async function fetchTask() {
    const response = await GetAllTask();

    if (response.data) {
      setTasks(response.data);
    } else {
      await errorAlert(
        `Failed to fetch: ${response.errors || "Something went wrong"}`
      );
    }
  }

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    renderTask && renderTask.length > 2
      ? setIsOtherUrgent(true)
      : setIsOtherUrgent(false);
  }, [renderTask]);

  return (
    <div className="w-full min-h-full px-32 flex flex-col gap-6 relative mt-20 scroll-smooth">
      <PageTitle title="My Tasks" IconComponent={BiTask} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {renderTask &&
          renderTask.length > 0 &&
          renderTask?.slice(0, 2)?.map((task) => (
            <div
              key={task.id}
              className="w-full h-full bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-4 p-12 cursor-pointer hover:-translate-y-[2px] hover:bg-gray-800/80 duration-150 ease-in-out"
            >
              {task.title}
            </div>
          ))}
        <div className="w-full h-full bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-4 p-12 cursor-pointer hover:-translate-y-[2px] hover:bg-gray-800/80 duration-150 ease-in-out">
          <p className="text-xl">
            {renderTask && renderTask.length < 1
              ? "You have no urgent task!"
              : ""}
          </p>
          {isOtherUrgent && (
            <p className="text-base text-red-600">
              You have {renderTask && renderTask.length - 2} more urgent task!{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
