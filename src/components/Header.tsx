import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiContactsBook3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { confirmAlert, errorAlert } from "../helpers/AlertHelper";
import { UserLogout } from "../lib/api/user/user.api";

export default function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await confirmAlert({
      message: "You are logging out!",
      confirmText: "Logout",
      cbConfirmText: "Logout success",
      cbConfirm: async () => {
        const response = await UserLogout();
        if (response?.status === 200) {
          navigate("/login");
        } else {
          // combine into a single message string
          await errorAlert(
            `Logout failed${response?.status ? `: ${response.status}` : ""}`
          );
          throw new Error(response?.statusText || "Logout failed");
        }
      },
    });
  }

  return (
    <header className="w-full px-32 py-4 bg-blue-900 text-white flex gap-4 justify-between align-middle items-center absolute top-0 left-0">
      <Link
        to="/dashboard/contact"
        className="flex gap-1 justify-center items-center align-middle"
      >
        <RiContactsBook3Line size="24px" color="white" />
        <p className="font-bold">Contact Management</p>
      </Link>
      <div className="flex gap-4 ">
        <Link
          to="/dashboard/profile"
          className="flex gap-1 justify-center items-center align-middle text-sm"
        >
          <CgProfile />
          Profile
        </Link>
        <div
          className="flex gap-1 justify-center items-center align-middle text-sm cursor-pointer"
          onClick={handleLogout}
        >
          <IoLogOutOutline />
          Logout
        </div>
      </div>
    </header>
  );
}
