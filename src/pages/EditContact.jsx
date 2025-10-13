import { FaArrowCircleLeft, FaMailBulk, FaUserTag } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { GetContactDetail, updateContact } from "../lib/api/ContactApi";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import ContactForm from "../components/contact/ContactForm";
import { BiEdit, BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function EditContactPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  async function fetchContactData() {
    const response = await GetContactDetail(contactId);
    const responseBody = await response.json();

    console.log(responseBody);

    if (response.status === 200) {
      setContact(responseBody?.data);
    } else {
      await errorAlert(
        "Error: ",
        responseBody?.errors || "Something went wrong"
      );
    }
  }

  async function handleEditContact(e, firstName, lastName, email, phone) {
    e.preventDefault();

    const response = await updateContact(contactId, {
      firstName,
      lastName,
      email,
      phone,
    });

    const responseBody = await response.json();

    if (response.status === 200) {
      await successAlert("Edit Contact Success");

      navigate(`/dashboard/contact/${contactId}`);
    } else {
      await errorAlert("Error: " + responseBody?.error);
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
