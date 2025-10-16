import { useEffect, useState } from "react";
import NameSection from "../components/profile/NameSection";
import PasswordSection from "../components/profile/PasswordSection";
import { confirmAlert, errorAlert, successAlert } from "../helpers/AlertHelper";
import { GetCurrentUser, UpdateCurrentUser } from "@/lib/api/user/user.api";

export default function ProfilePage() {
  const [user, setUser] = useState();

  async function fetchUserDetail() {
    const response = await GetCurrentUser();

    if (response.data) {
      setUser(response.data);
    }
  }

  async function handleEditName(name) {
    const response = await UpdateCurrentUser({
      name: name && name,
    });

    if (response.data) {
      setUser(response.data);
      await successAlert("Success Update Name");
    } else {
      await errorAlert(`Error: ${response.errors || "Something went wrong"}`);
    }
  }

  async function handleEditPassword(password) {
    await confirmAlert({
      message: `Change your password?`,
      confirmText: "Yes",
      cancelText: "Cancel",
      cbConfirmText: "Password has been changed",
      cbConfirm: async () => {
        const response = await UpdateCurrentUser({
          password: password && password,
        });

        if (!response.data) {
          await errorAlert(
            `Error: ${response.errors || "Something went wrong"}`
          );
        }
      },
    });
  }

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full px-32 gap-4">
      <NameSection user={user} handleEdit={handleEditName} />
      <PasswordSection handleEdit={handleEditPassword} />
    </div>
  );
}
