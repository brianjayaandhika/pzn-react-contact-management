import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import { BiEdit, BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";
import TaskForm from "@/components/task/TaskForm";
import { GetTask, UpdateTask } from "@/lib/api/task/task.api";
import { Task, TaskPriority, TaskStatus } from "@/lib/api/task/task.types";
import { Dayjs } from "dayjs";

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  async function fetchTaskData() {
    const response = await GetTask(taskId);

    if (response.data) {
      setTask(response.data);
    } else {
      await errorAlert(`Error: ${response.errors || "Something went wrong"}`);
    }
  }

  async function handleEditTask(
    e: React.FormEvent,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    due: Dayjs
  ) {
    e.preventDefault();

    const response = await UpdateTask(taskId!, {
      title,
      description,
      status,
      priority,
      due,
    });

    if (response.data) {
      await successAlert("Edit Task Success");

      navigate("/dashboard/task");
    } else {
      await errorAlert("Error: " + response.errors);
    }
  }

  useEffect(() => {
    fetchTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <button
        className="flex align-middle justify-start gap-2 items-center text-blue-400 text-sm cursor-pointer"
        onClick={() => navigate("/dashboard/task")}
      >
        <FaArrowCircleLeft />
        <p>Back to Contacts</p>
      </button>
      <TaskForm
        IconComponent={BiEdit}
        title="Edit Task"
        handleSubmit={handleEditTask}
        buttonText="Save Changes"
        buttonIcon={BiSave}
        task={task}
      />
    </div>
  );
}
