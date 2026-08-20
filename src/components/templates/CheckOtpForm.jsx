/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie";
import { getProfile } from "../../services/user";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }

    if (error) console.log(error.response.data.message);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تأیید کد پیامک شده</p>
      <span>کد پیامک شده به شماره «{mobile}» را وارد کنید.</span>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <input
        type="text"
        id="input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="کد تأیید"
      />
      <button type="submit">ورود</button>
      <h5 id={styles.changeNumber} onClick={() => setStep(1)}>تغییر شماره موبایل</h5>
    </form>
  );
}

export default CheckOtpForm;
