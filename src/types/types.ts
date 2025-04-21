export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  isActiveUser: boolean;
};

export type SupabaseUserData = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  confirmed_at: string;
  user_metadata: {
    name: string;
    email_verified: boolean;
  };
  app_metadata: {
    role: string;
  };
  identities: Array<{
    identity_id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};

export type CourseProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  instructorId: number;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  modules: Modules[];
  categories: CategoryInCourse[];
};

export type Instructor = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type CategoryInCourse = {
  courseId: number;
  categoryId: number;
  category: Category;
};

export type Category = {
  id: string;
  name: string;
};

export type Modules = {
  id: number;
  courseId: number;
  name: string;
  lessons: Lessons[];
};

export type Lessons = {
  id: number;
  title: string;
  content: string;
};
