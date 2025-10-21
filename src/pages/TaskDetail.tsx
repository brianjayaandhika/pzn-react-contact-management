import { FaAddressCard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { errorAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import PageTitle from "../components/PageTitle";
import { Task } from "@/lib/api/task/task.types";
import { GetTask } from "@/lib/api/task/task.api";
import TaskDisplay from "@/components/task/TaskDisplay";

export default function TaskDetailPage() {
  const navigate = useNavigate();
  const { taskId } = useParams<string>();
  const [task, setTask] = useState<Task | null>(null);

  function handleNavigate(path: string): void {
    navigate(path);
    window.scrollTo(0, 0);
  }

  async function fetchTaskData(): Promise<void> {
    const response = await GetTask(taskId);

    if (response.data) {
      setTask(response?.data);
    } else {
      await errorAlert(`Error: ${response?.errors || "Something went wrong"}`);
      response?.errors === "Contact not found" &&
        navigate("/dashboard/contact");
    }
  }

  useEffect(() => {
    fetchTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-full w-[600px] flex gap-8 flex-col mt-20 ">
      <BackButton text="Back to Task Dashboard" path="/dashboard/task" />
      <PageTitle
        IconComponent={FaAddressCard}
        title="Task Details"
        customStyle="self-center"
      />

      <div className="w-full h-full p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 flex flex-col gap-4">
        {task && <TaskDisplay task={task} handleNavigate={handleNavigate} />}
      </div>
    </div>
  );
}
