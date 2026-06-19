import {useContext} from "react";
import {CaptchaContext} from "./captcha-context-obj.js";

export const useCaptcha = () => useContext(CaptchaContext);
