import { http } from "@/main/http/axios/axios-instance";

export const enrollmentService = {
  createEnrollment: async ({
    courseId,
    userId,
  }: {
    courseId: string[] | string;
    userId: string;
  }) => {
    const { data } = await http.post(`/enrollment`, {
      courseId,
      userId,
    });

    return data;
  },

  getEnrollments: async (id: string) => {
    const { data } = await http.get(`/enrollment/user/${id}`);

    return data;
  },
};
