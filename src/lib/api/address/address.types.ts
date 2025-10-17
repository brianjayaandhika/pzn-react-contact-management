export type AddressId = string;

export type Address = {
  id: AddressId;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
};

export type CreateAddressRequest = {
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
};

export type UpdateAddressRequest = {
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
};
