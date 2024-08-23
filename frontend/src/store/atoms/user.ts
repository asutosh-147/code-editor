import { backend_url } from "@/lib/constants";
import axios from "axios";
import { atom, selector } from "recoil";

type AuthUser = {
  name?: string;
  email: string;
};
export const userAtom = atom<AuthUser>({
  key: "userAtom",
  default: selector({
    key: "user/default",
    get: async () => {
      try {
        const response = await axios.get(`${backend_url}/api/auth/refresh`, {
          withCredentials: true,
        });

        if (response.status === 200) return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
      return null;
    },
  }),
});
