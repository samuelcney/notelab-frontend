import { api } from "@/main/http/axios/axios-instance";

export const enrollmentService = {
  createEnrollment: async ({
    courseId,
    userId,
  }: {
    courseId: string[] | string;
    userId: string;
  }) => {
    const { data } = await api.post(`/enrollment`, {
      courseId,
      userId,
    });

    return data;
  },

  getEnrollments: async (id: string) => {
    const { data } = await api.get(`/enrollment/user/${id}`);

    return data;
  },
};
