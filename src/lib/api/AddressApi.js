export const GetAddresses = async (contactId) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts/${contactId}/addresses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const GetAddressDetail = async ({ contactId, addressId }) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(
    `${base_url}/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
      },
    }
  );
};

export const CreateAddress = async (payload) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts/${payload.contactId}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(payload),
  });
};

export const UpdateAddress = async (payload) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(
    `${base_url}/contacts/${payload.contactId}/addresses/${payload.addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify(payload),
    }
  );
};

export const DeleteAddress = async ({ contactId, addressId }) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(
    `${base_url}/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
      },
    }
  );
};
