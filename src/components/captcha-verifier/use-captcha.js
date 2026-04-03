import {useContext} from "react";
import {CaptchaContext} from "@/components/captcha-verifier/captcha-context.jsx";

export const useCaptcha = () => useContext(CaptchaContext);
