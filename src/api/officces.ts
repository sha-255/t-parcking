import { ACCESS_STR, API_STR, getHeaders } from "./";

const headers = getHeaders();

export const getAllOffices = async () /*: Promise<[] | undefined>*/ => {
  // try {
  //   const response = await fetch(API_STR + "offices", {
  //     method: "GET",
  //     headers,
  //   });
  //   return (await response.json()).data as Promise<[]>;
  // } catch (error) {
  //   console.error(error);
  // }
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem(ACCESS_STR)
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_STR + "offices", requestOptions);
    const result = await response.json();
    return await result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOfficeById = async (id: number) => {
  try {
    const response = await fetch(`${API_STR}offices/${id}`, {
      method: "GET",
      headers: headers,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addOffice = async (name: string, street: string) => {
  const raw = JSON.stringify({
    name,
    street,
  });

  try {
    const response = await fetch(API_STR + "offices", {
      method: "POST",
      headers: headers,
      body: raw,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateOffice = async (
  officeId: number,
  name: string,
  street: string
) => {
  const raw = JSON.stringify({
    name,
    street,
  });

  const requestOptions = {
    method: "PATCH",
    headers: headers,
    body: raw,
  };

  try {
    const response = await fetch(
      `${API_STR}offices/${officeId}`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteOffice = async (officeId: number) => {
  try {
    await fetch(`${API_STR}offices/${officeId}`, {
      method: "DELETE",
      headers: headers,
      redirect: "follow",
    });
  } catch (error) {
    console.error(error);
  }
};
