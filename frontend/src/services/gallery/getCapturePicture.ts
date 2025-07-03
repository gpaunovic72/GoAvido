import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getCapturePicture = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/gallery/capture`, {
      withCredentials: true,
    });
    return response.data.pictures;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
  }
  return [];
};
