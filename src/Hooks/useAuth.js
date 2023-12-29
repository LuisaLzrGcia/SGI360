import { useContext, useState } from "react";

function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const getAuth = (data) => {
    sessionStorage.setItem("first_name", data.first_name);
    sessionStorage.setItem("id_process_fk", data.id_process_fk);
    sessionStorage.setItem("id_user_pk", data.id_user_pk);
    sessionStorage.setItem("job_title", data.job_title);
    sessionStorage.setItem("last_name", data.last_name);
    sessionStorage.setItem("password", data.password);
    sessionStorage.setItem("process_abbreviation", data.process_abbreviation);
    sessionStorage.setItem("process_name", data.process_name);
    sessionStorage.setItem("type", data.type);
    sessionStorage.setItem("user_name", data.user_name);
    sessionStorage.setItem("power_bi", data.power_bi);
    setIsAuth(true);
  };

  return {
    isAuth,
    getAuth,
    setIsAuth,
  };
}

export default useAuth;
