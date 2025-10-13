import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";
import Layout from "./components/layout/Layout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import CreateContactPage from "./pages/CreateContact.jsx";
import ContactDetailPage from "./pages/ContactDetail.jsx";
import CreateAddressPage from "./pages/CreateAddress.jsx";
import DashboardContactPage from "./pages/DashboardContact.jsx";
import EditContactPage from "./pages/EditContact.jsx";
import EditAddressPage from "./pages/EditAddress.jsx";
import ProfilePage from "./pages/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<DashboardContactPage />} />
          <Route path="create_contact" element={<CreateContactPage />} />
          <Route path="contact/:contactId" element={<ContactDetailPage />} />
          <Route path="edit_contact/:contactId" element={<EditContactPage />} />
          <Route
            path="create_address/:contactId"
            element={<CreateAddressPage />}
          />
          <Route
            path="edit_address/:contactId/:addressId"
            element={<EditAddressPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
