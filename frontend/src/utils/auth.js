export const saveToken = (accessToken) => {
  localStorage.setItem("token", accessToken.jwtToken);
};
