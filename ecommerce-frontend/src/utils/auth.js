export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decodare JWT
    return decoded.role;
  };
  