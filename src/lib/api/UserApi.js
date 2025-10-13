export const UserRegister = async ({ username, password, name }) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      name,
    }),
  });
};

export const UserLogin = async ({ username, password }) => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const UserLogout = async () => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/auth/logout`, {
    method: "DELETE",
    headers: {
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const GetUserDetail = async () => {
  const base_url = import.meta.env.VITE_API_PATH;

  return await fetch(`${base_url}/users/current`, {
    method: "GET",
    headers: {
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const UpdateUser = async (payload) => {
  const base_url = import.meta.env.VITE_API_PATH;
  console.log(payload);

  return await fetch(`${base_url}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(payload),
  });
};
