import { http } from "@/main/http/axios/axios-instance";

export const sendRequestService = {
  sendRequest: async (requestData: any) => {
    const formData = new FormData();

    formData.append("fullName", requestData.fullName);
    formData.append("cpf", requestData.cpf);
    formData.append("email", requestData.email);
    formData.append("phone", requestData.phone);
    formData.append("musicalEducation", requestData.musicalEducation);
    formData.append("yearsExperience", requestData.yearsExperience);
    formData.append("instruments", requestData.instruments);
    formData.append("biography", requestData.biography);
    formData.append("documents", requestData.documents);

    const { data } = await http.post("/approve-requests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
