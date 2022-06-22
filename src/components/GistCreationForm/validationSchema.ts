import * as yup from "yup";
import { FILENAMEERROR, FILENAMEREGEX, REQUIRED } from "./constants";

const validationSchema = yup.object({
    description: yup.string().required(REQUIRED),
    files: yup.array().of(
        yup.object({
            filename: yup.string().required(REQUIRED).matches(FILENAMEREGEX, FILENAMEERROR),
            content: yup.string().required(REQUIRED)
        })
    )
})

export default validationSchema;