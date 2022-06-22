import * as yup from "yup";
import {
  REQUIRED,
  USERNAMEREGEX,
  USERNAMESPACEERR,
  USERNAMEFIXED,
  USERNAMEFIXEDERR,
} from "./constants";

const validationSchema = yup.object({
  username: yup
    .string()
    .required(REQUIRED)
    .matches(USERNAMEREGEX, USERNAMESPACEERR)
    .matches(USERNAMEFIXED, USERNAMEFIXEDERR),
  token: yup.string().required(REQUIRED),
});

export default validationSchema;
