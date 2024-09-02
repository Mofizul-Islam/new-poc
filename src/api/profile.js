import axios from "axios";
import { BASE_URL } from "./constants";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
    return error;
  }
);
export const getUserProfile = () => {
  return axios
    .get(`${BASE_URL}user-profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error getting user profile", err);
      return {};
    });
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}user-profile`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
    if (response.data) {
      alert("User profile updated successfully");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    alert("Error updating user profile");
  }
};