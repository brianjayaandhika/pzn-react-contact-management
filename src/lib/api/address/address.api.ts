import type { WebResponse } from "@/lib/api/http/http.types";
import type {
  Address,
  AddressId,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "./address.types";
import { httpJsonAuth } from "../http/client";

export async function CreateAddress(
  contactId: string,
  payload: CreateAddressRequest
): Promise<WebResponse<Address>> {
  return httpJsonAuth(`/api/contacts/${contactId}/addresses`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function UpdateAddress(
  contactId: string,
  addressId: AddressId,
  payload: UpdateAddressRequest
): Promise<WebResponse<Address>> {
  return httpJsonAuth(`/api/contacts/${contactId}/addresses/${addressId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function GetAddress(
  contactId: string,
  addressId?: AddressId
): Promise<WebResponse<Address>> {
  return httpJsonAuth(
    `/api/contacts/${contactId}/addresses/${addressId ? addressId : ""}`,
    {
      method: "GET",
    }
  );
}

export async function DeleteAddress(
  contactId: string,
  addressId: AddressId
): Promise<WebResponse<"OK">> {
  return httpJsonAuth(`/api/contacts/${contactId}/addresses/${addressId}`, {
    method: "DELETE",
  });
}

export async function ListAddresses(
  contactId: string
): Promise<WebResponse<Address[]>> {
  return httpJsonAuth(`/api/contacts/${contactId}/addresses`, {
    method: "GET",
  });
}
