import BackButton from "@/components/BackButton";
import Badge from "@/components/Badge";
import PageTitle from "@/components/PageTitle";
import TaskList from "@/components/task/TaskList";
import { confirmAlert, errorAlert } from "@/helpers/AlertHelper";
import { DeleteTask, GetAllTask } from "@/lib/api/task/task.api";
import { Task } from "@/lib/api/task/task.types";
import _ from "lodash";
import { useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function TaskDashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState<number>(1);

  function handleNavigate(path: string) {
    navigate(path);
  }

  async function handleDelete(task: Task) {
    await confirmAlert({
      message: `Delete task ${task.title}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      cbConfirmText: "Delete Successful",
      cbConfirm: async () => {
        const response = await DeleteTask(task.id);

        if (response.data) {
          await fetchTask(tab);
        }
      },
    });
  }

  async function fetchTask(tab: number) {
    const response = await GetAllTask({
      timeStatus: tab === 1 ? "ACTIVE" : "HISTORY",
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
    fetchTask(tab);
  }, [tab]);

  return (
    <div className="w-full min-h-[78vh] px-32 h-full mt-20 flex flex-col gap-4 justify-start items-start align-middle">
      <BackButton text="Back to dashboard" path="/dashboard" />
      <PageTitle title="My Tasks" IconComponent={BsListTask} />
      <div className="w-full h-full flex gap-2">
        {["Active", "History"]?.map((item, index) => (
          <Badge
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setTab(index + 1);
            }}
            label={item}
            customCn={`${
              tab === index + 1 ? "bg-blue-400! text-gray-800!" : ""
            } cursor-pointer  `}
          />
        ))}
      </div>
      {/* Filter Buttons */}
      <TaskList
        tasks={tasks}
        tab={tab}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
      />
    </div>
  );
}
