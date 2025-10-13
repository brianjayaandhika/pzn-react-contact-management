import { useEffect, useState } from "react";
import NameSection from "../components/profile/NameSection";
import PasswordSection from "../components/profile/PasswordSection";
import { GetUserDetail, UpdateUser } from "../lib/api/UserApi";
import { confirmAlert, errorAlert, successAlert } from "../helpers/AlertHelper";

export default function ProfilePage() {
  const [user, setUser] = useState();

  async function fetchUserDetail() {
    const response = await GetUserDetail();
    const responseBody = await response.json();

    if (response.status === 200) {
      setUser(responseBody?.data);
    }
  }

  async function handleEditName(name) {
    const response = await UpdateUser({
      name: name && name,
    });

    const responseBody = await response.json();

    if (response.status === 200) {
      setUser(responseBody?.data);
      await successAlert("Success Update Name");
    } else {
      await errorAlert("Error: ", responseBody?.errors);
    }
  }

  async function handleEditPassword(password) {
    await confirmAlert({
      message: `Change your password?`,
      confirmText: "Yes",
      cancelText: "Cancel",
      cbConfirmText: "Password has been changed",
      cbConfirm: async () => {
        const response = await UpdateUser({
          password: password && password,
        });

        const responseBody = await response.json();

        if (response.status !== 200) {
          await errorAlert("Error:", responseBody?.errors);
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
