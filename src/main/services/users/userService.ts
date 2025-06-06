import { http } from "../../http/axios/axios-instance";

interface updateProfileProps {
  userId: string;
  formData: FormData;
}

export const userService = {
  getAllUsers: async () => {
    const { data } = await http.get("/users");
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await http.get(`/users/${id}`);
    return data;
  },

  updateProfile: async (dataToUpdate: updateProfileProps) => {
    const { data } = await http.put(
      `/users/update-profile/${dataToUpdate.userId}`,
      dataToUpdate.formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  },
};
