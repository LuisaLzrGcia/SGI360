import { useContext, useState } from "react";
import { SGIContext } from "../Context/ContextGlobal";

function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const { isLoged, setIsLoged } = useContext(SGIContext);

  const getAuth = (data) => {
    sessionStorage.setItem("id_user", data.id_user);
    sessionStorage.setItem("user_name", data.user_name);
    sessionStorage.setItem("first_name", data.first_name);
    sessionStorage.setItem("last_name", data.last_name);
    sessionStorage.setItem("job_title", data.job_title);
    sessionStorage.setItem("job_abbreviation", data.job_abbreviation);
    sessionStorage.setItem("process_name", data.process_name);
    sessionStorage.setItem("process_abbreviation", data.process_abbreviation);
    sessionStorage.setItem("type_user", data.type_user);
    sessionStorage.setItem("isLogin", "true")
    setIsAuth(true)
  };

  return {
    isAuth,
    getAuth,
    setIsAuth
  };
}

export default useAuth;
