import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const postCapturePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", "Capture from Goavido");

  try {
    const response = await axios.post(
      `${API_URL}/api/gallery/upload`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
  }
  return {
    success: false,
    message: "Error uploading picture",
  };
};
