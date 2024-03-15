import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
