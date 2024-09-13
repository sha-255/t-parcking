export const API_STR = "http://74.201.177.247/api/";
export const ACCESS_STR = "access";

export const getToken = (): string | void => {
  localStorage.getItem(ACCESS_STR);
};

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_STR, token);
};

export const getHeaders = (): Headers => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getToken()}`);
  return myHeaders;
};
