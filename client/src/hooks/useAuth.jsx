import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: 'http://13.60.20.87:8080',
  realm: "master",
  clientId: "myclient",
});

const useAuth = () => { 
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect( () => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
      }).catch((err) => {
        console.log(err)
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;
