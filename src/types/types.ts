export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export interface UserType {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userBio: UserInfo;
}

export interface UserInfo {
  bio: string;
  avatarUrl: string;
  phone: string;
}

export type CourseProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  instructorId: string;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  modules: Modules[];
  categories: Category[];
  isActiveCourse: boolean;
  coverImage?: string;
};

export type Instructor = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Category = {
  id: number;
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
  videoUrl: string;
  description: string;
};

export type Cart = {
  id: string;
  cartItems: CartItem[];
};

export type CartItem = {
  id: string;
  course: CourseProps;
};

export type EnrollmentData = {
  id: string;
  courseId: string;
  createdAt: Date;
  isActive: boolean;
};
