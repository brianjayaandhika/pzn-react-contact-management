import { MdLocationPin } from "react-icons/md";
import CreateAddressCard from "./CreateAddressCard";
import AddressCard from "./AddressCard";
import { DeleteAddress } from "../../lib/api/AddressApi";
import { confirmAlert } from "../../helpers/AlertHelper";

export default function AddressSection({
  contactId,
  addresses,
  handleNavigate,
  fetchAddresses,
}) {
  async function handleDelete(addressId) {
    await confirmAlert({
      message: `Delete this address?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      cbConfirmText: "Delete Successful",
      cbConfirm: async () => {
        const response = await DeleteAddress({ contactId, addressId });

        if (response.status === 200) {
          await fetchAddresses();
        }
      },
    });
  }

  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="flex gap-2 align-middle text-xl font-bold items-center text-blue-400">
        <MdLocationPin />
        <h1 className="text-white">Address</h1>
      </div>
      <div className="w-full grid gap-4 lg:grid-cols-2 grid-cols-1">
        <CreateAddressCard contactId={contactId} />
        {addresses?.map((address) => (
          <AddressCard
            key={address?.id}
            address={address}
            contactId={contactId}
            handleEdit={() =>
              handleNavigate(
                `/dashboard/edit_address/${contactId}/${address?.id}`
              )
            }
            handleDelete={() => handleDelete(address.id)}
          />
        ))}
      </div>
    </div>
  );
}
