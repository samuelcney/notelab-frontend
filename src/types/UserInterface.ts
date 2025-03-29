type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

type UserProps = {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  isActiveUser: boolean;
};
