import { useNavigate } from "react-router";
import { createContact } from "../lib/api/ContactApi";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import ContactForm from "../components/contact/ContactForm";
import { RiUserAddLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function CreateContactPage() {
  const navigate = useNavigate();

  async function handleCreateContact(e, firstName, lastName, email, phone) {
    e.preventDefault();

    const response = await createContact({
      firstName,
      lastName,
      email,
      phone,
    });

    const responseBody = await response.json();

    if (response.status === 200) {
      await successAlert(
        "Create Contact " +
          responseBody.data.firstName +
          " " +
          responseBody.data.lastName +
          " Success"
      );

      navigate("/dashboard/contact");
    } else {
      await errorAlert("Error: " + responseBody?.error);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <BackButton text="Back to Contacts" path="/dashboard/contact" />
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
