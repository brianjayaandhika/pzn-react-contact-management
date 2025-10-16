import { useNavigate, useParams } from "react-router";
import { errorAlert, successAlert } from "../helpers/AlertHelper";
import BackButton from "../components/BackButton";
import AddressForm from "../components/address/AddressForm";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import { GetAddress, UpdateAddress } from "@/lib/api/address/address.api";
import { GetContact } from "@/lib/api/contact/contact.api";

export default function EditAddressPage() {
  const navigate = useNavigate();
  const { contactId, addressId } = useParams();
  const [address, setAddress] = useState({});
  const [contact, setContact] = useState({});

  async function fetchAddressDetail() {
    const response = await GetAddress(contactId, addressId);

    if (response.data) {
      setAddress(response.data);
    } else {
      await errorAlert(`Error: ${response.errors || "Something went wrong"}`);
    }
  }

  useEffect(() => {
    fetchAddressDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdateAddress(
    street,
    city,
    province,
    country,
    postalCode
  ) {
    const response = await UpdateAddress(contactId, addressId, {
      street,
      city,
      province,
      country,
      postalCode,
    });

    if (response.data) {
      await successAlert("Update Address Success");

      navigate(`/dashboard/contact/${contactId}`);
    } else {
      await errorAlert("Error: " + response.errors);
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
        handleSubmit={handleUpdateAddress}
        contactId={contactId}
        address={address}
        title="Update address"
        icon={MdEditNote}
        contact={contact}
        btnText={"Save Changes"}
        btnIcon={BiEdit}
      />
    </div>
  );
}
