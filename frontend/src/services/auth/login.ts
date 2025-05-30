import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type LoginResponse = {
  success: boolean;
  user?: {
    email: string;
    password: string;
  };
};

type LoginError = {
  success: false;
  message: string;
  status: number;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        success: false,
        message:
          error.response?.data?.message || "An error occurred while logging in",
        status: error.response?.status || 500,
      } as LoginError;
    }
    throw {
      success: false,
      message: "An unexpected error occurred",
    } as LoginError;
  }
};
