import { Task } from "@/lib/api/task/task.types";
import TaskCard from "./TaskCard";
import _, { isEmpty } from "lodash";
import { useMemo } from "react";
import formatDate from "@/helpers/dateFormatter";

type TaskTuple = [string, Task[]];

export default function TaskList({
  tasks,
  tab,
  handleNavigate,
  handleDelete,
}: {
  tasks: Task[];
  tab: number;
  handleNavigate: (path: string) => void;
  handleDelete: (task: Task) => void;
}) {
  const taskToRender = useMemo(() => {
    if (isEmpty(tasks)) {
      return [];
    }

    const groupByDueTime = _.groupBy(tasks, (t) => {
      return formatDate(t.due, true, tab == 2 ? false : true);
    });

    return Object.entries(groupByDueTime) as TaskTuple[];
  }, [tasks]);

  function renderingTask() {
    if (_.isEmpty(taskToRender)) {
      return (
        <div className="w-full min-h-full h-[250px] bg-gray-800 rounded-2xl border outline-dashed outline-1 outline-gray-700 border-gray-700 flex flex-col justify-center items-center align-middle gap-4 p-12">
          <p className="text-lg">You have no tasks</p>
        </div>
      );
    }

    return taskToRender?.map((taskDetail) => (
      <div className="flex flex-col gap-2 border-b-2 pb-8 border-gray-600/50">
        <h1 className="text-lg font-bold">{taskDetail[0]}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskDetail[1]?.map((task: Task) => (
            <TaskCard
              tab={tab}
              key={task.id}
              task={task}
              handleClick={handleNavigate}
              handleDelete={() => handleDelete(task)}
              handleEdit={() => handleNavigate(`/dashboard/edit_task/${task.id}`)}
            />
          ))}
        </div>
      </div>
    ));
  }

  return <div className="flex flex-col gap-4">{renderingTask()}</div>;
}
