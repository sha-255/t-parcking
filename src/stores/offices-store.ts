import {
  addOffice,
  deleteOffice,
  getAllOffices,
  getOfficeById,
  updateOffice,
} from "@/api/officces";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useOfficesStore = defineStore("officesStore", () => {
  const offices: Ref<[] | undefined> = ref([]);

  const getAll = async () => (offices.value = await getAllOffices());
  const getById = async (id: number) => await getOfficeById(id);
  const add = async (name: string, street: string) =>
    await addOffice(name, street);
  const update = async (id: number, name: string, street: string) =>
    await updateOffice(id, name, street);
  const del = async (id: number) => await deleteOffice(id);

  return {
    offices,
    getAll,
    getById,
    add,
    update,
    del,
  };
});
