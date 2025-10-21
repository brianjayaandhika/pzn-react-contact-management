import { useNavigate } from "react-router";
import ContactSection from "@/components/contact/ContactSection";
import TaskSection from "@/components/task/TaskSection";

export default function DashboardPage() {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <div className="flex flex-col gap-6">
      <TaskSection handleNavigate={handleNavigate} />
      <ContactSection handleNavigate={handleNavigate} />
    </div>
  );
}
