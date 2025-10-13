export const getContacts = async (params) => {
  const base_url = import.meta.env.VITE_API_PATH;
  let queryParam = "?";

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) queryParam += `${key}=${value}&`;
    }
  }

  return await fetch(`${base_url}/contacts${queryParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const GetContactDetail = async (contactId) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts/${contactId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const createContact = async (request) => {
  console.log(request);
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(request),
  });
};

export const updateContact = async (contactId, request) => {
  console.log(request);
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(request),
  });
};

export const deleteContact = async (contactId) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};
