export const getStoredAccessToken = () => localStorage.getItem("accessToken");

export const storeAccessToken = (token) =>
  localStorage.setItem("accessToken", token);

export const removeStoredAccessToken = () =>
  localStorage.removeItem("accessToken");
