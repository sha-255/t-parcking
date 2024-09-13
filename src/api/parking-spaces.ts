import { API_STR, getHeaders } from "./";

const headers = getHeaders();

export interface IFilters {
  status?: string;
  floor?: number;
  sector?: number;
  office_id?: number;
  user_id?: number;
  width?: number;
  height?: number;
  length?: number;
}

export const getParkingSpaces = async (
  filters?: IFilters
): Promise<[] | undefined> => {
  const url = getWithSearchParams(new URL(`${API_STR}parking-spaces`), filters);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return (await (
      await response.json()
    ).data) as Promise<[] | undefined>;
  } catch (error) {
    console.error(error);
  }
};

const getWithSearchParams = (url: URL, filters?: IFilters): URL => {
  if (!filters) return url;
  const copyUrl = new URL(url.toString());
  Object.keys(filters).forEach((key: string) => {
    const value = filters[key as keyof IFilters];
    if (value !== undefined) {
      copyUrl.searchParams.set(`filter[${key}]`, value.toString());
    }
  });
  return copyUrl;
};

export const getParkingSpacesById = async (id: number) => {
  try {
    const response = await fetch(`${API_STR}parking-spaces/${id}`, {
      method: "GET",
      headers: headers,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export interface IParkingSpace {
  floors: ISector[];
  description: string;
  status: string;
  office_id: number;
  width: number;
  height: number;
  length: number;
}

export interface ISector {
  counts: ICount[];
}

export interface ICount {
  count: number;
}

export const addParkingSpace = async (value: IParkingSpace) => {
  const raw = JSON.stringify(value);

  try {
    const response = await fetch(`${API_STR}parking-spaces`, {
      method: "POST",
      headers: headers,
      body: raw,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateParkingSpace = async (id: number, value: IParkingSpace) => {
  const raw = JSON.stringify(value);

  try {
    const response = await fetch(`${API_STR}parking-spaces/${id}`, {
      method: "PATCH",
      headers: headers,
      body: raw,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteParkingSpace = async (id: number) => {
  const requestOptions = {
    method: "DELETE",
    headers: headers,
  };

  try {
    await fetch(`${API_STR}parking-spaces/${id}`, requestOptions);
  } catch (error) {
    console.error(error);
  }
};
