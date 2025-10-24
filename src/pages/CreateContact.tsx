import { useNavigate } from "react-router";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import ContactForm from "../components/contact/ContactForm";
import { RiUserAddLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CreateContact } from "@/lib/api/contact/contact.api";

export default function CreateContactPage() {
  const navigate = useNavigate();

  async function handleCreateContact(
    e: React.FormEvent,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    e.preventDefault();

    const response = await CreateContact({
      firstName,
      lastName,
      email,
      phone,
    });

    if (response.data) {
      await successAlert(
        "Create Contact " +
          response.data.firstName +
          " " +
          response.data.lastName +
          " Success"
      );

      navigate("/dashboard/contact");
    } else {
      await errorAlert("Error: " + response?.errors);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <BackButton text="Back to Dashboard" path="/dashboard" />
      <ContactForm
        title="Create New Contact"
        IconComponent={RiUserAddLine}
        handleSubmit={handleCreateContact}
        buttonText="Add Contact"
        buttonIcon={IoMdAddCircleOutline}
      />
    </div>
  );
}
