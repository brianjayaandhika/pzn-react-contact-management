import { buildQuery } from "@/lib/api/http/query";
import type { WebResponse } from "@/lib/api/http/http.types";
import type {
  Contact,
  ContactId,
  CreateContactRequest,
  UpdateContactRequest,
  ContactSearchQuery,
  ContactSearchSuccess,
} from "./contact.types";
import { httpJsonAuth } from "../http/client";

export async function CreateContact(
  payload: CreateContactRequest
): Promise<WebResponse<Contact>> {
  return httpJsonAuth("/api/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function UpdateContact(
  contactId: ContactId,
  payload: UpdateContactRequest
): Promise<WebResponse<Contact>> {
  return httpJsonAuth(`/api/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function GetContact(
  contactId?: ContactId
): Promise<WebResponse<Contact>> {
  return httpJsonAuth(`/api/contacts/${contactId}`, {
    method: "GET",
  });
}

export async function SearchContacts(
  query?: ContactSearchQuery
): Promise<
  WebResponse<ContactSearchSuccess["data"]> & Partial<ContactSearchSuccess>
> {
  const qs = buildQuery(query);
  return httpJsonAuth(`/api/contacts${qs}`, { method: "GET" });
}

export async function DeleteContact(
  contactId: ContactId
): Promise<WebResponse<"OK">> {
  return httpJsonAuth(`/api/contacts/${contactId}`, { method: "DELETE" });
}
