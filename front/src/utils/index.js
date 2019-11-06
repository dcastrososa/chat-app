import { keysLocalStorage } from "../constants";

export const cloneDeep = value => JSON.parse(JSON.stringify(value));

export const getHeaderAuth = () => {
  const token = localStorage.getItem(keysLocalStorage.tokenUser);
  return { "x-access-token": token };
};
