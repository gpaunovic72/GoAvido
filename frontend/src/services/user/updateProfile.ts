import { ProfileFormData } from "@/lib/validations/profile";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const updateProfile = async (data: ProfileFormData) => {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.password) formData.append("password", data.password);

    if (data.pictureUrl instanceof File) {
      formData.append("image", data.pictureUrl);
    }

    const response = await axios.put(`${API_URL}/api/user/profile`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        success: false,
        message: error.response?.data.message || "Failed to update profile",
        status: error.response?.status || 500,
      };
    }
    throw {
      success: false,
      message: "Failed to update profile",
    };
  }
};
