import { MdLocationPin } from "react-icons/md";
import CreateAddressCard from "./CreateAddressCard";
import AddressCard from "./AddressCard";
import { DeleteAddress } from "../../lib/api/address/address.api";
import { confirmAlert } from "../../helpers/AlertHelper";
import { Address } from "@/lib/api/address/address.types";

export default function AddressSection({
  contactId,
  addresses,
  handleNavigate,
  fetchAddresses,
}: {
  contactId: string;
  addresses: Address[];
  handleNavigate: (path: string) => void;
  fetchAddresses: () => Promise<void>;
}) {
  async function handleDelete(addressId: string) {
    await confirmAlert({
      message: `Delete this address?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      cbConfirmText: "Delete Successful",
      cbConfirm: async () => {
        const response = await DeleteAddress(contactId!, addressId);

        if (response.data) {
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
