import { errorAlert } from "@/helpers/AlertHelper";
import { GetAllTask } from "@/lib/api/task/task.api";
import { Task } from "@/lib/api/task/task.types";
import { useEffect, useMemo, useState } from "react";
import PageTitle from "../PageTitle";
import { BiTask } from "react-icons/bi";
import _ from "lodash";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
import { BsArrowRightCircleFill } from "react-icons/bs";
import TaskList from "./TaskList";
import { spawn } from "child_process";

export default function TaskSection({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHighPriority, setIsHighPriority] = useState<boolean>(false);

  // still trying to work on the way to show task (design choices)

  function selectTaskToRender(): Task[] {
    let taskToRender: Task[] = tasks;

    if (tasks) {
      const groupByPriority = _.groupBy(tasks, (e) => e.priority);

      if (
        groupByPriority &&
        groupByPriority["HIGH"] &&
        groupByPriority["HIGH"].length >= 2
      ) {
        taskToRender = groupByPriority["HIGH"];
        setIsHighPriority(true);
      }
    }

    return taskToRender;
  }

  const renderTask = useMemo(() => {
    return selectTaskToRender();
  }, [tasks]);

  async function fetchTask() {
    const response = await GetAllTask({
      timeStatus: "ACTIVE",
    });

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

  return (
    <div className="w-full min-h-full px-32 flex flex-col gap-6 relative mt-20 scroll-smooth">
      <PageTitle title="My Tasks" IconComponent={BiTask} />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateTaskCard handleNavigate={handleNavigate} />
        {!_.isEmpty(renderTask) ? (
          renderTask
            ?.slice(0, 2)
            ?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleClick={handleNavigate}
              />
            ))
        ) : (
          <div className="w-full min-h-full h-[250px] bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-4 p-12">
            <p className="text-lg">You have no due tasks</p>
          </div>
        )}
      </div>
      <div
        onClick={() => handleNavigate("/dashboard/task")}
        className="flex gap-2 justify-center items-center align-middle cursor-pointer text-sm text-white/80 hover:text-white/50"
      >
        {isHighPriority && renderTask.length > 2 ? (
          <span className="text-sm text-red-400">
            You have other urgent tasks!{" "}
            <span className="text-white">View Other Task</span>
          </span>
        ) : (
          <span>View Other Task</span>
        )}
        <BsArrowRightCircleFill />
      </div>
    </div>
  );
}
