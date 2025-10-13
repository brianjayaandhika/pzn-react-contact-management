import { FaAddressCard } from "react-icons/fa";
import AddressSection from "../components/address/AddressSection";
import ContactDisplay from "../components/contact/ContactDisplay";
import { useNavigate, useParams } from "react-router";
import { GetContactDetail } from "../lib/api/ContactApi";
import { useEffect, useState } from "react";
import { errorAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import { GetAddresses } from "../lib/api/AddressApi";
import PageTitle from "../components/PageTitle";

export default function ContactDetailPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState([]);
  const [addresses, setAddresses] = useState([]);

  function handleNavigate(path) {
    navigate(path);
    window.scrollTo(0, 0);
  }

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

  async function fetchAddresses() {
    const response = await GetAddresses(contactId);
    const responseBody = await response.json();

    console.log(responseBody);

    if (response.status === 200) {
      setAddresses(responseBody?.data);
    } else {
      await errorAlert(
        "Error: ",
        responseBody?.errors || "Something went wrong"
      );
    }
  }

  useEffect(() => {
    fetchContactData();
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-full w-[600px] flex gap-8 flex-col mt-20">
      <BackButton text="Back to Contacts" path="/dashboard/contact" />
      <PageTitle IconComponent={FaAddressCard} title="Contact Details" />

      <div className="w-full h-full p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 flex flex-col gap-4">
        <ContactDisplay contact={contact} handleNavigate={handleNavigate} />
        <AddressSection
          contactId={contactId}
          addresses={addresses}
          handleNavigate={handleNavigate}
          fetchAddresses={fetchAddresses}
        />
      </div>
    </div>
  );
}
