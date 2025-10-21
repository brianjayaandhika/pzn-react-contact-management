import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";
import Layout from "./components/layout/Layout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import CreateContactPage from "./pages/CreateContact.jsx";
import ContactDetailPage from "./pages/ContactDetail.jsx";
import CreateAddressPage from "./pages/CreateAddress.jsx";
import EditContactPage from "./pages/EditContact.jsx";
import EditAddressPage from "./pages/EditAddress.jsx";
import ProfilePage from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage.js";
import CreateTaskPage from "./pages/CreateTask";
import TaskDashboardPage from "./pages/TaskDashboard";
import EditTaskPage from "./pages/EditTask";
import TaskDetailPage from "./pages/TaskDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create_contact" element={<CreateContactPage />} />
          <Route path="create_task" element={<CreateTaskPage />} />
          <Route path="task" element={<TaskDashboardPage />} />

          {/* Contact Page */}
          <Route path="contact">
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path=":contactId" element={<ContactDetailPage />} />
          </Route>

          {/* Edit Contact Page */}
          <Route path="edit_contact">
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path=":contactId" element={<EditContactPage />} />
          </Route>

          {/* Create Address Page */}
          <Route path="create_address">
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path=":contactId" element={<CreateAddressPage />} />
          </Route>

          {/* Edit Address Page */}
          <Route path="edit_address">
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path=":contactId/:addressId" element={<EditAddressPage />} />
          </Route>

          {/* Task Page */}
          <Route path="task">
            <Route index element={<TaskDashboardPage />} />
            <Route path=":taskId" element={<TaskDetailPage />} />
          </Route>

          {/* Edit Task Page */}
          <Route path="edit_task">
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path=":taskId" element={<EditTaskPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
