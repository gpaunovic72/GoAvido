import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface SignupError {
  message: string;
  status?: number;
}

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<SignupResponse> => {
  try {
    const response = await axios.post<SignupResponse>(
      `${API_URL}/api/auth/signup`,
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message:
          error.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription",
        status: error.response?.status,
      } as SignupError;
    }
    throw {
      message: "Une erreur inattendue est survenue",
    } as SignupError;
  }
};
