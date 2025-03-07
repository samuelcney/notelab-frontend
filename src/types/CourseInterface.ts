interface CourseProps {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  instructorId: number;
  courseMaterials: CourseMaterial[];
  categories: Category[];
}

interface CourseMaterial {
  title: string;
  type: string;
  content: string;
}
