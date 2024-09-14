import { ACCESS_STR, API_STR, getToken } from "@/api";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useUserDataStore = defineStore("userData", () => {
  const userData: Ref<object> = ref({});
  const users = ref([]);

  const getData = async (callback?: any) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem(ACCESS_STR)}`
    );
    myHeaders.append("Accept", "application/json");

    try {
      const response = await fetch(API_STR + "user/current", {
        method: "GET",
        headers: myHeaders,
      });
      const result = await response.json();

      if (result?.data) {
        userData.value = result.data;
        if (callback) callback();
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem(ACCESS_STR)}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(API_STR + "users", requestOptions);
      const result = await response.json();
      if (result?.data) {
        users.value = result.data;
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return { userData, getData, getAll, users };
});
