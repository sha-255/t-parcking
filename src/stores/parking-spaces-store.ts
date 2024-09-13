import {
  getParkingSpaces,
  IFilters,
  getParkingSpacesById,
  addParkingSpace,
  IParkingSpace,
  updateParkingSpace,
  deleteParkingSpace,
} from "@/api/parking-spaces";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useParkingSpaceStore = defineStore("parkingSpace", () => {
  const parkingSpaces: Ref<[] | undefined> = ref([]);

  const getAll = async () => getParkingSpaces();
  const filter = async (filter: IFilters) => await getParkingSpaces(filter);
  const getById = async (id: number) => await getParkingSpacesById(id);
  const add = async (value: IParkingSpace) => await addParkingSpace(value);
  const update = async (id: number, value: IParkingSpace) =>
    await updateParkingSpace(id, value);
  const del = async (id: number) => await deleteParkingSpace(id);

  return { parkingSpaces, getAll, filter, getById, add, update, del };
});
