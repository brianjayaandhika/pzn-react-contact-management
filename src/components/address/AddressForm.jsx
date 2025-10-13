import { FaCity, FaRoad, FaUser } from "react-icons/fa";
import InputLabel from "../InputLabel";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Button from "../Button";
import { useNavigate } from "react-router";
import { BiFlag } from "react-icons/bi";
import { GiIsland } from "react-icons/gi";
import PageTitle from "../PageTitle";

export default function AddressForm({
  handleSubmit,
  contactId,
  address,
  title,
  icon,
  btnText,
  btnIcon,
  contact,
}) {
  const navigate = useNavigate();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    if (address) {
      setStreet(address.street);
      setCity(address.city);
      setProvince(address.province);
      setCountry(address.country);
      setPostalCode(address.postalCode);
    }
  }, [address]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(street, city, province, country, postalCode);
      }}
      className="max-w-full w-[700px] flex gap-4 flex-col justify-center items-center align-middle self-center"
    >
      <PageTitle IconComponent={icon} title={title} />

      <div className="w-full h-full p-6 rounded-2xl border-2 border-gray-700 bg-gray-800 grid gap-6 lg:grid-cols-2 grid-cols-1">
        <div className="w-full flex gap-4 align-middle items-center border-b-1 border-gray-700 pb-7 col-span-2">
          <div className="bg-blue-400 rounded-full flex justify-center items-center align-middle p-3 text-md">
            <FaUser />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">
              {contact.firstName} {contact.lastName}
            </p>
            <p className="text-xs text-white/60">
              {contact.email} • {contact.phone}
            </p>
          </div>
        </div>

        <InputLabel
          mapper="street"
          text="Street"
          IconComponent={FaRoad}
          placeholderText="Enter street address"
          isRequired
          type="text"
          value={street}
          handleChange={(e) => setStreet(e.target.value)}
          fontSize="text-sm"
          customStyle="col-span-2"
        />
        <InputLabel
          mapper="city"
          text="City"
          IconComponent={FaCity}
          placeholderText="Enter city"
          isRequired
          type="text"
          value={city}
          handleChange={(e) => setCity(e.target.value)}
          fontSize="text-sm"
        />
        <InputLabel
          mapper="province"
          text="Province/State"
          IconComponent={GiIsland}
          placeholderText="Enter province or state"
          isRequired
          type="text"
          value={province}
          handleChange={(e) => setProvince(e.target.value)}
          fontSize="text-sm"
        />
        <InputLabel
          mapper="Country"
          text="Country"
          IconComponent={BiFlag}
          placeholderText="Enter country"
          isRequired
          type="text"
          value={country}
          handleChange={(e) => setCountry(e.target.value)}
          fontSize="text-sm"
        />
        <InputLabel
          mapper="PostalCode"
          text="Postal Code"
          IconComponent={BiFlag}
          placeholderText="Enter postal code"
          isRequired
          type="text"
          value={postalCode}
          handleChange={(e) => setPostalCode(e.target.value)}
          fontSize="text-sm"
        />
        <div className="col-span-2 flex w-full gap-3 justify-end">
          <Button
            variant="gray"
            text="Cancel"
            IconComponent={MdCancel}
            customStyle="text-nowrap w-fit! mb-0!"
            handleClick={() => navigate(`/dashboard/contact/${contactId}`)}
            type="button"
          />
          <Button
            variant="blue"
            text={btnText}
            IconComponent={btnIcon}
            customStyle="text-nowrap w-fit! mb-0!"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
