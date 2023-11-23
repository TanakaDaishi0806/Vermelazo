import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SendMailForgetPasswordTemplate from "../templates/SendMailForgetPasswordTemplate";

const SendMailForgetPassword = () => {
  const [student_id, setStudent_id] = useState("");
  const [student_idError, setStudent_idError] = useState(false);
  const [mailaddress, setMailaddress] = useState("");
  const [mailaddressEmpty, setMailaddressEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();

  const handleStudent_idChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudent_id(event.target.value);
    handleStudent_idErrorChange(event.target.value);
    handleAllEmptyError();
  };

  const handleStudent_idErrorChange = (student_idValue: string) => {
    if (student_idValue.length === 8) {
      setStudent_idError(false);
    } else {
      setStudent_idError(true);
    }
  };

  const handleMailaddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMailaddress(event.target.value);
    handleMailaddressEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleMailaddressEmptyChange = (mailaddressValue: string) => {
    if (mailaddressValue.length !== 0) {
      setMailaddressEmpty(false);
    } else {
      setMailaddressEmpty(true);
    }
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleSendMail = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgetpassword/sendmail`, {
        student_id,
        mailaddress,
      })
      .then(() => {
        navigate("/forgetpassword/sendmail/message");
      })
      .catch(() => {
        setInputError(true);
        navigate("/forgetpassword/sendmail/message");
      });
  };
  return (
    <SendMailForgetPasswordTemplate
      sendMailInfo={{
        student_id: student_id,
        mailaddress: mailaddress,
        student_idError: student_idError,
        mailaddressEmpty: mailaddressEmpty,
        inputError: inputError,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handleStudent_idChange: handleStudent_idChange,
        handleMailaddressChange: handleMailaddressChange,
        handleSendMail: handleSendMail,
      }}
    />
  );
};
export default SendMailForgetPassword;
