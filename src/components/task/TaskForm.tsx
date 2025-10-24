import InputLabel from "../InputLabel";
import { useEffect, useState } from "react";
import {
  MdCancel,
  MdDescription,
  MdFormatListNumbered,
  MdTitle,
} from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "../Button";
import PageTitle from "../PageTitle";
import { Task, TaskPriority, TaskStatus } from "@/lib/api/task/task.types";
import { GrInProgress } from "react-icons/gr";

type Props = {
  title: string;
  handleSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    due: Date
  ) => void;
  IconComponent: React.ComponentType;
  buttonText: string;
  buttonIcon: React.ComponentType;
  task?: Task | null;
};

export default function TaskForm({
  title,
  handleSubmit,
  IconComponent,
  buttonText,
  buttonIcon,
  task = null,
}: Props) {
  const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ACTIVE);
  const [priority, setPriority] = useState<TaskPriority>(2);
  const [due, setDue] = useState<Date | string>();

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDue(task.due);
    }
  }, [task]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, taskTitle!, description!, status!, priority!, due!)
      }
      className="w-full flex gap-4 flex-col justify-center items-center align-middle"
    >
      <PageTitle IconComponent={IconComponent} title={title} />
      <div className="w-fit h-full p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 grid gap-6 lg:grid-cols-2 grid-cols-1">
        <InputLabel
          mapper="taskTitle"
          text="Title "
          IconComponent={MdTitle}
          placeholderText="Enter Title"
          isRequired
          type="text"
          value={taskTitle}
          handleChange={(e) => setTaskTitle(e.target.value.trim())}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <InputLabel
          isTextArea
          mapper="description"
          text="Description"
          IconComponent={MdDescription}
          placeholderText="Enter Description"
          isRequired
          type="text"
          value={description}
          handleChange={(e) => setDescription(e.target.value.trim())}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <InputLabel
          mapper="status"
          text="Status"
          IconComponent={GrInProgress}
          placeholderText="Enter Status"
          isRequired
          type="textarea"
          value={status}
          handleChange={(e) => setStatus(TaskStatus.ACTIVE)}
          fontSize="text-sm"
          customStyle=""
        />
        <InputLabel
          mapper="Priority"
          text="Priority"
          IconComponent={MdFormatListNumbered}
          placeholderText="Enter Priority"
          isRequired
          type="number"
          value={priority}
          handleChange={(e) => setPriority(1)}
          fontSize="text-sm"
          customStyle=""
        />
        <InputLabel
          mapper="Due"
          text="Due"
          IconComponent={MdFormatListNumbered}
          placeholderText="Enter Due"
          isRequired
          type="date"
          value={due?.toString()}
          handleChange={(e) => setDue(new Date().toDateString())}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <div className="col-span-2 flex w-full gap-3 justify-end">
          <Button
            variant="gray"
            text="Cancel"
            IconComponent={MdCancel}
            customStyle="text-nowrap w-fit! mb-0!"
            handleClick={() => navigate("/dashboard/contact")}
            type="button"
          />
          <Button
            variant="blue"
            text={buttonText}
            IconComponent={buttonIcon}
            customStyle="text-nowrap w-fit! mb-0!"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
