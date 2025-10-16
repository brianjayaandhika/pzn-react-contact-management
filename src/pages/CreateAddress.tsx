import { useNavigate, useParams } from "react-router";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import { CreateAddress } from "../lib/api/address/address.api";
import AddressForm from "../components/address/AddressForm";
import { RiUserAddLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GetContact } from "@/lib/api/contact/contact.api";

export default function CreateAddressPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  async function handleCreateAddress(
    street,
    city,
    province,
    country,
    postalCode
  ) {
    const response = await CreateAddress(contactId, {
      street,
      city,
      province,
      country,
      postalCode,
    });

    if (response.data) {
      await successAlert("Create Address Success");

      navigate(`/dashboard/contact/${contactId}`);
    } else {
      await errorAlert("Error: " + response?.errors);
    }
  }

  async function fetchContactData() {
    const response = await GetContact(contactId);

    if (response.data) {
      setContact(response.data);
    } else {
      await errorAlert(`Error: ${response.errors || "Something went wrong"}`);
    }
  }

  useEffect(() => {
    fetchContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-screen px-32 mt-20 justify-start items-start align-">
      <BackButton
        text="Back to Contacts Details"
        path={`/dashboard/contact/${contactId}`}
      />
      <AddressForm
        handleSubmit={handleCreateAddress}
        contactId={contactId}
        title="Add new address"
        icon={RiUserAddLine}
        contact={contact}
        btnText={"Add Address"}
        btnIcon={IoMdAddCircleOutline}
      />
    </div>
  );
}
