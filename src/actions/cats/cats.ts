import { catApi } from "../../api/catApi";
import { catsURL } from "./constants";

export const getRandomCat = async (): Promise<string | null> => {
  try {
    const res = await catApi.get(catsURL.randomCat);
    return res.data[0]?.url || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
