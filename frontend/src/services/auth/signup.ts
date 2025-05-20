import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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

    // Si la réponse est un succès (status 2xx)
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: response.data.message,
        user: response.data.user,
      };
    }

    // Si on arrive ici, c'est une erreur
    throw {
      message:
        response.data.message ||
        "Une erreur est survenue lors de l'inscription",
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message:
          error.response?.data?.message || "An error occurred while signing up",
        status: error.response?.status,
      } as SignupError;
    }
    throw {
      message: "An unexpected error occurred",
    } as SignupError;
  }
};
