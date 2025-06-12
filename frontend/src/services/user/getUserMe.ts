import { UserProfile } from "@/types/user";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getUserMe = async (): Promise<UserProfile> => {
  try {
    const response = await axios.get(`${API_URL}/api/user/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        success: false,
        message: error.response?.data.message || "Failed to fetch user profile",
        status: error.response?.status || 500,
      };
    }
    throw {
      success: false,
      message: "Failed to fetch user profile",
    };
  }
};
