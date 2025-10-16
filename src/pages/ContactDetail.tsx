import { FaAddressCard } from "react-icons/fa";
import AddressSection from "../components/address/AddressSection";
import ContactDisplay from "../components/contact/ContactDisplay";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { errorAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import PageTitle from "../components/PageTitle";
import { GetContact } from "@/lib/api/contact/contact.api";
import { Contact } from "@/lib/api/contact/contact.types";
import { ListAddresses } from "@/lib/api/address/address.api";
import { Address } from "@/lib/api/address/address.types";

export default function ContactDetailPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [addresses, setAddresses] = useState<Address[] | null>(null);

  function handleNavigate(path: string): void {
    navigate(path);
    window.scrollTo(0, 0);
  }

  async function fetchContactData(): Promise<void> {
    const response = await GetContact(contactId);

    if (response.data) {
      setContact(response?.data);
      fetchAddresses();
    } else {
      await errorAlert(`Error: ${response?.errors || "Something went wrong"}`);
      response?.errors === "Contact not found" &&
        navigate("/dashboard/contact");
    }
  }

  async function fetchAddresses(): Promise<void> {
    const response = await ListAddresses(contactId!);

    if (response.data) {
      setAddresses(response?.data);
    } else {
      await errorAlert(`Error: ${response?.errors || "Something went wrong"}`);
    }
  }

  useEffect(() => {
    fetchContactData();
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
