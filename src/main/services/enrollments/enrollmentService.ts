import { api } from "@/main/http/axios/axios-instance";

export const enrollmentService = {
  createEnrollment: async ({
    courseId,
    userId,
  }: {
    courseId: string;
    userId: string;
  }) => {
    const { data } = await api.post(`/enrollments`, {
      courseId,
      userId,
    });

    return data;
  },
};
