import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthTokenReset1Template from "../templates/AuthTokenReset1Template";

const AuthTokenReset1 = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [authUrl, setAuthUrl] = useState<string>("");
  const [code_url, setCodeUrl] = useState("");
  const [codeUrlEmpty, setCodeUrlEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputError2, setInputError2] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "認証コードを含むURLの取得",
    "アクセストークンをシークレット値として保存",
    "新しいリビジョンのデプロイ",
  ];
  const navigate = useNavigate();

  const handleNext = () => {
    if (steps.length - 1 > activeStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/admin/authtoken/conf`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error);
          setInputError2(true);
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/authurl`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAuthUrl(response.data.auth_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCodeUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeUrl(event.target.value);
    handleCodeUrlEmptyChange(event.target.value);
  };

  const handleCodeUrlEmptyChange = (codeUrlValue: string) => {
    if (codeUrlValue === "") {
      setCodeUrlEmpty(true);
    } else {
      setCodeUrlEmpty(false);
    }
  };

  const handleCodeUrl = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/secrettoken`,
        {
          code_url,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        handleNext();
      })
      .catch((error) => {
        console.log(error);
        setInputError(true);
      });
  };

  return (
    <AuthTokenReset1Template
      authTokenReset1Info={{
        auth_url: authUrl,
        code_url,
        activeStep,
        steps,
        codeUrlEmpty,
        inputError,
        inputError2,
        setInputError,
        handleCodeUrlChange,
        handleCodeUrl,
        handleBack,
        handleNext,
        handleReset,
      }}
    />
  );
};

export default AuthTokenReset1;
