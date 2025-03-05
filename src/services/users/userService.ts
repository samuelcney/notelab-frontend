import { api } from "../axios/axiosInstance";

const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log(response.data);
  } catch (error) {
    return console.log(error);
  }
};

const createUser = async (data: CreateUserDTO) => {
  try {
    const response = await api.post("/users", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log(response.data);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Erro inesperado"
    );
  }
};

export const userService = { getAllUsers, createUser };
