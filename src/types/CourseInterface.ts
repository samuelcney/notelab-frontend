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
  categories: Category[];
};

export type Instructor = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type Category = {
  courseId: number;
  categoryId: number;
  category: Category2;
};

export type Category2 = {
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
  content: string;
};
