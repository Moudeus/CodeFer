import React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { IAccount } from "../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";

interface LoginGoogleProps {
  userAccount: IAccount[];
}
export const LoginGoogle: React.FC<LoginGoogleProps> = ({ userAccount }) => {
  const googleAPI = "https://www.googleapis.com/oauth2/v3/userinfo";

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const token = response.access_token;
      const ggAccount = await axios
        .get(googleAPI, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.data);
      const user = userAccount.find((user) => user.email === ggAccount.email);

      if (user) {
        sessionStorage.setItem("auth", JSON.stringify(user));
        sessionStorage.setItem("userRole", user.role);
        navigate("/products");
      } else {
        const maxId = userAccount.length > 0 ? Math.max(...userAccount.map((user) => user.id)) : 0;
        const newId = maxId + 1;
        const newUser: IAccount = {
          id: newId,
          email: ggAccount.email,
          username: ggAccount.email.split("@")[0],
          password: "123456",
          role: "user",
          status: "active",
        };

                axios.post(`http://localhost:5000/accounts`, newUser)
                    .then(() => {
                        sessionStorage.setItem("auth", JSON.stringify(newUser));
                        sessionStorage.setItem("userRole", "user");
                        alert("Account created successfully! Your password is 123456");
                        navigate("/products");
                    })
                    .catch((error) => {
                        console.error("There was an error creating the account!", error);
                    });
            }
        },
        onError: error => { console.log(error); }
    });

  const handleClick = () => {
    login();
  };

  return (
    <Button className="my-2" variant="danger" onClick={handleClick}>
      <FontAwesomeIcon icon={faGoogle} size="lg" />
      <span> </span>Login with Google
    </Button>
  );
};
