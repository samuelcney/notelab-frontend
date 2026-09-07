import { http } from "@/main/http/axios/axios-instance";

type SendRequestData = {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  musicalEducation: string;
  yearsExperience: string;
  instruments: string;
  biography: string;
  documents?: File;
};

export const sendRequestService = {
  sendRequest: async (requestData: SendRequestData) => {
    const formData = new FormData();

    formData.append("fullName", requestData.fullName);
    formData.append("cpf", requestData.cpf);
    formData.append("email", requestData.email);
    formData.append("phone", requestData.phone);
    formData.append("musicalEducation", requestData.musicalEducation);
    formData.append("yearsExperience", requestData.yearsExperience);
    formData.append("instruments", requestData.instruments);
    formData.append("biography", requestData.biography);
    if (requestData.documents) {
      formData.append("documents", requestData.documents);
    }

    const { data } = await http.post("/approve-requests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
