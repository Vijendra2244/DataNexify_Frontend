import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallbackHandler() {
  const navigate = useNavigate();
  const fetchAuthToken = async () => {
    try {
      const urlParamsSearch = new URLSearchParams(window.location.search);
      const code = urlParamsSearch.get("code");
      if (code) {
        const response = await fetch(
          `http://localhost:5173/auth/google/callback?code=${code}`
        );
        const data = await response.json();
        console.log(data);
        console.log(data.success, "success");
        if (data.success) {
          localStorage.setItem("User", JSON.stringify(data.user));
          navigate("/dashbaord");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    await fetchAuthToken();
  };
  useEffect(() => {
    fetchData();
  }, [navigate]);
  return <div>Loading....</div>;
}

export default AuthCallbackHandler;
