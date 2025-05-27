import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/verify/${token}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to verify email");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};
