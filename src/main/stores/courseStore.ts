"use client";

import { courseLevelEnum, lessonTypeEnum } from "@/utils/Enums";
import { nanoid } from "nanoid";
import { create } from "zustand";

export type Lesson = {
  id: string;
  name: string;
  duration: string;
  type: lessonTypeEnum;
  content?: string | File | null;
};

export type Module = {
  id: string;
  name: string;
  lessons: Lesson[];
};

export type CourseState = {
  name: string;
  description: string;
  categories: string[];
  difficulty: courseLevelEnum;
  coverImage: string | null;
  modules: Module[];
  typeCourse: "free" | "paid";
  price: number;
  promotionalPrice: number;
  issueCertificate: boolean;
  workload: string;
  instructorId: string;
};

type CourseStore = {
  course: CourseState;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setDifficulty: (difficulty: CourseState["difficulty"]) => void;
  setCoverImage: (coverImage: string | null) => void;
  setInstructorId: (instructorId: string) => void;

  addModule: () => void;
  removeModule: (id: string) => void;
  updateModuleName: (id: string, name: string) => void;
  addLesson: (moduleId: string) => void;
  removeLesson: (moduleId: string, lessonId: string) => void;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: string
  ) => void;

  addContentToLesson: (lessonId: string, content: string | File | null) => void;
  removeContentFromLesson: (lessonId: string) => void;

  setTypeCourse: (typeCourse: "free" | "paid") => void;
  setPrice: (price: number) => void;
  setPromotionalPrice: (promotionalPrice: number) => void;
  setIssueCertificate: (issueCertificate: boolean) => void;
  setWorkload: (workload: string) => void;
  resetCourse: () => void;
  setCourse: (course: CourseState) => void;
};

const initialState: CourseState = {
  name: "",
  description: "",
  categories: [],
  difficulty: courseLevelEnum.BEGINNER,
  coverImage: null,
  modules: [],
  typeCourse: "free",
  price: 0,
  promotionalPrice: 0,
  issueCertificate: false,
  workload: "",
  instructorId: "",
};

export const useCourseStore = create<CourseStore>((set) => ({
  course: initialState,

  setName: (name) => set((state) => ({ course: { ...state.course, name } })),
  setDescription: (description) =>
    set((state) => ({ course: { ...state.course, description } })),

  setCategories: (categories) =>
    set((state) => ({ course: { ...state.course, categories } })),

  addCategory: (category) =>
    set((state) => {
      if (state.course.categories.includes(category)) return state;
      return {
        course: {
          ...state.course,
          categories: [...state.course.categories, category],
        },
      };
    }),

  removeCategory: (category) =>
    set((state) => ({
      course: {
        ...state.course,
        categories: state.course.categories.filter((c) => c !== category),
      },
    })),

  setDifficulty: (difficulty) =>
    set((state) => ({ course: { ...state.course, difficulty } })),
  setCoverImage: (coverImage) =>
    set((state) => ({ course: { ...state.course, coverImage } })),
  setInstructorId: (instructorId) =>
    set((state) => ({ course: { ...state.course, instructorId } })),

  addModule: () =>
    set((state) => {
      const newModule: Module = {
        id: nanoid(),
        name: `Módulo ${state.course.modules.length + 1}`,
        lessons: [],
      };
      return {
        course: {
          ...state.course,
          modules: [...state.course.modules, newModule],
        },
      };
    }),

  removeModule: (id) =>
    set((state) => ({
      course: {
        ...state.course,
        modules: state.course.modules.filter((module) => module.id !== id),
      },
    })),

  updateModuleName: (id, name) =>
    set((state) => ({
      course: {
        ...state.course,
        modules: state.course.modules.map((module) =>
          module.id === id ? { ...module, name } : module
        ),
      },
    })),

  addLesson: (moduleId: string) =>
    set((state) => {
      const moduleIndex = state.course.modules.findIndex(
        (m) => m.id === moduleId
      );
      if (moduleIndex === -1) return state;

      const newLesson: Lesson = {
        id: nanoid(),
        name: `Aula ${state.course.modules[moduleIndex].lessons.length + 1}`,
        duration: "00:00",
        type: lessonTypeEnum.VIDEO,
      };

      const updatedModules = [...state.course.modules];
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        lessons: [...updatedModules[moduleIndex].lessons, newLesson],
      };

      return {
        course: {
          ...state.course,
          modules: updatedModules,
        },
      };
    }),

  addContentToLesson: (lessonId, content) =>
    set((state) => {
      const updatedModules = state.course.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, content } : lesson
        ),
      }));

      return {
        course: {
          ...state.course,
          modules: updatedModules,
        },
      };
    }),

  removeContentFromLesson: (lessonId) =>
    set((state) => {
      const updatedModules = state.course.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, content: null } : lesson
        ),
      }));

      return {
        course: {
          ...state.course,
          modules: updatedModules,
        },
      };
    }),

  removeLesson: (moduleId, lessonId) =>
    set((state) => {
      const moduleIndex = state.course.modules.findIndex(
        (m) => m.id === moduleId
      );
      if (moduleIndex === -1) return state;

      const module = state.course.modules[moduleIndex];
      const newModules = [...state.course.modules];
      newModules[moduleIndex] = {
        ...module,
        lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
      };

      return {
        course: {
          ...state.course,
          modules: newModules,
        },
      };
    }),

  updateLesson: (moduleId, lessonId, field, value) =>
    set((state) => {
      const moduleIndex = state.course.modules.findIndex(
        (m) => m.id === moduleId
      );
      if (moduleIndex === -1) return state;

      const module = state.course.modules[moduleIndex];
      const newModules = [...state.course.modules];
      newModules[moduleIndex] = {
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
        ),
      };

      return {
        course: {
          ...state.course,
          modules: newModules,
        },
      };
    }),

  setTypeCourse: (typeCourse) =>
    set((state) => ({ course: { ...state.course, typeCourse } })),
  setPrice: (price) => set((state) => ({ course: { ...state.course, price } })),
  setPromotionalPrice: (promotionalPrice) =>
    set((state) => ({ course: { ...state.course, promotionalPrice } })),
  setIssueCertificate: (issueCertificate) =>
    set((state) => ({ course: { ...state.course, issueCertificate } })),
  setWorkload: (workload) =>
    set((state) => ({ course: { ...state.course, workload } })),

  resetCourse: () => set({ course: initialState }),

  setCourse: (course) => ({
    course: {
      ...initialState,
      ...course,
    },
  }),
}));
