export interface CourseProps {
  id: number;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  instructorId: number;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  modules: any[];
  categories: Category[];
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Category {
  courseId: number;
  categoryId: number;
  category: Category2;
}

export interface Category2 {
  id: number;
  name: string;
}
