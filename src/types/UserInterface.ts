interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}
