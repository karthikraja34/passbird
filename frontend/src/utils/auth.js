export const saveToken = (accessToken) => {
  localStorage.setItem("token", accessToken.jwtToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
