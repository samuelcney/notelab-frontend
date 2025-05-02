"use client";

import { courseLevelEnum, lessonTypeEnum } from "@/utils/Enums";
import { nanoid } from "nanoid";
import { create } from "zustand";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: lessonTypeEnum;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type CourseState = {
  title: string;
  description: string;
  category: string;
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
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: string) => void;
  setDifficulty: (difficulty: CourseState["difficulty"]) => void;
  setCoverImage: (coverImage: string | null) => void;
  setInstructorId: (instructorId: string) => void;

  addModule: () => void;
  removeModule: (id: string) => void;
  updateModuleTitle: (id: string, title: string) => void;
  addLesson: (moduleId: string) => void;
  removeLesson: (moduleId: string, lessonId: string) => void;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: string
  ) => void;

  setTypeCourse: (typeCourse: "free" | "paid") => void;
  setPrice: (price: number) => void;
  setPromotionalPrice: (promotionalPrice: number) => void;
  setIssueCertificate: (issueCertificate: boolean) => void;
  setWorkload: (workload: string) => void;
  resetCourse: () => void;
};

const initialState: CourseState = {
  title: "",
  description: "",
  category: "",
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

  setTitle: (title) => set((state) => ({ course: { ...state.course, title } })),
  setDescription: (description) =>
    set((state) => ({ course: { ...state.course, description } })),
  setCategory: (category) =>
    set((state) => ({ course: { ...state.course, category } })),
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
        title: `Novo Módulo`,
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

  updateModuleTitle: (id, title) =>
    set((state) => ({
      course: {
        ...state.course,
        modules: state.course.modules.map((module) =>
          module.id === id ? { ...module, title } : module
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
        title: "Nova Aula",
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
        lessons: module.lessons.filter((aula) => aula.id !== lessonId),
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
}));
