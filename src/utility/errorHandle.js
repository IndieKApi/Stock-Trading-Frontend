export const errorHandle = (error, handleLogout) => {
  if (error.response && error.response.status === 403) {
    handleLogout();
  }
};