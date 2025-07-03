import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const deleteCapturePicture = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/gallery/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
  }
};
