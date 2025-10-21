import InputLabel from "../InputLabel";
import { useEffect, useState } from "react";
import { MdCancel, MdDescription } from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "../Button";
import PageTitle from "../PageTitle";
import { Task, TaskPriority, TaskStatus } from "@/lib/api/task/task.types";
import SelectMenu from "../SelectMenu";
import BasicDateTimePicker from "../BasicDateTimePicker";
import dayjs, { Dayjs } from "dayjs";

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
    due: Dayjs
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
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [due, setDue] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      console.log(task?.due);
      setTaskTitle(task?.title);
      setDescription(task?.description);
      setStatus(task?.status);
      setPriority(task?.priority);
      setDue(dayjs(task?.due));
    }
  }, [task]);

  useEffect(() => {
    console.log(isPickerOpen);
  }, [isPickerOpen]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, taskTitle, description, status, priority, due!)
      }
      className="w-full flex gap-4 flex-col justify-center items-center align-middle "
    >
      <PageTitle IconComponent={IconComponent} title={title} />
      <div className="w-fit min-w-[600px] h-full  p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 grid gap-6 lg:grid-cols-2 grid-cols-1">
        <InputLabel
          mapper="taskTitle"
          text="Title "
          placeholderText="Enter Task Title"
          isRequired
          type="text"
          value={taskTitle}
          handleChange={(e) => setTaskTitle(e.target.value)}
          fontSize="text-sm"
          customStyle="lg:col-span-2"
        />
        <InputLabel
          isTextArea
          mapper="description"
          text="Description"
          IconComponent={MdDescription}
          placeholderText="Enter Task Description"
          isRequired
          type="text"
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
          fontSize="text-sm"
          customStyle="lg:col-span-2"
          rows={3}
        />
        <SelectMenu
          options={Object.keys(TaskStatus)}
          IconComponent={MdDescription}
          value={status}
          label="Status"
          mapper="status"
          handleChange={(e) => setStatus(e.target.value as TaskStatus)}
          defaultValue={TaskStatus.ACTIVE}
        />
        <SelectMenu
          options={Object.keys(TaskPriority)}
          IconComponent={MdDescription}
          value={priority}
          label="Priority"
          mapper="priority"
          handleChange={(e) => setPriority(e.target.value as TaskPriority)}
          defaultValue={TaskPriority.MEDIUM}
        />
        <BasicDateTimePicker
          text="Due"
          setDue={setDue}
          value={due!}
          onOpen={() => setIsPickerOpen(true)}
          onClose={() => setIsPickerOpen(false)}
        />
        <div className="lg:col-span-2 flex w-full gap-3 justify-end">
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
            disabled={isPickerOpen}
            IconComponent={buttonIcon}
            customStyle="text-nowrap w-fit! mb-0! disabled:bg-gray-400"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
