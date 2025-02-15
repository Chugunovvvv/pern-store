import { $authHost, $host } from ".";
import { Devices, Types } from "../types/types";

export const createType = async (type: Types) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};
export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");

  return data;
};
export const createBrand = async (brand: Types) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");

  return data;
};
export const createDevice = async (device: Devices) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};
export const fetchDevice = async () => {
  const { data } = await $host.get("api/device");

  return data;
};
export const fetchOneDevice = async (id: number) => {
  const { data } = await $host.get("api/device/" + id);

  return data;
};
