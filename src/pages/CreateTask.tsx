import { useNavigate } from "react-router";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TaskPriority, TaskStatus } from "@/lib/api/task/task.types";
import TaskForm from "@/components/task/TaskForm";
import { MdAddTask } from "react-icons/md";
import { CreateTask } from "@/lib/api/task/task.api";
import { Dayjs } from "dayjs";

export default function CreateTaskPage() {
  const navigate = useNavigate();

  async function handleCreateTask(
    e: React.FormEvent,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    due: Dayjs
  ) {
    e.preventDefault();

    const response = await CreateTask({
      title,
      description,
      status,
      priority,
      due,
    });

    if (response.data) {
      await successAlert("Task is created");
      navigate("/dashboard/contact");
    } else {
      await errorAlert("Error: " + response?.errors);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <BackButton text="Back to Dashboard" path="/dashboard" />
      <TaskForm
        title="Create New Task"
        IconComponent={MdAddTask}
        handleSubmit={handleCreateTask}
        buttonText="Add Task"
        buttonIcon={IoMdAddCircleOutline}
      />
    </div>
  );
}
