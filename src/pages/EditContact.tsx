import { FaArrowCircleLeft, FaMailBulk, FaUserTag } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { GetContact, UpdateContact } from "../lib/api/contact/contact.api";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import ContactForm from "../components/contact/ContactForm";
import { BiEdit, BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function EditContactPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  async function fetchContactData() {
    const response = await GetContact(contactId);

    if (response.data) {
      setContact(response.data);
    } else {
      await errorAlert(`Error: ${response.errors || "Something went wrong"}`);
    }
  }

  async function handleEditContact(e, firstName, lastName, email, phone) {
    e.preventDefault();

    const response = await UpdateContact(contactId, {
      firstName,
      lastName,
      email,
      phone,
    });

    if (response.data) {
      await successAlert("Edit Contact Success");

      navigate(`/dashboard/contact/${contactId}`);
    } else {
      await errorAlert("Error: " + response.errors);
    }
  }

  useEffect(() => {
    fetchContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <button
        className="flex align-middle justify-start gap-2 items-center text-blue-400 text-sm cursor-pointer"
        onClick={() => navigate("/dashboard/contact")}
      >
        <FaArrowCircleLeft />
        <p>Back to Contacts</p>
      </button>
      <ContactForm
        IconComponent={BiEdit}
        title="Edit Contact"
        handleSubmit={handleEditContact}
        buttonText="Save Changes"
        buttonIcon={BiSave}
        contact={contact}
      />
    </div>
  );
}
