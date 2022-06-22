import { Button } from "antd";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { CREDENTIAL_STATE } from "../../globals/constants/localStorageAccessors";
import { LOGINLABEL, TOKENLABEL, USERNAMELABEL } from "./constants";
import validationSchema from "./validationSchema";

function LoginPage() {
    // const { state, credentialDispatch } = useContext(CredentialContext);
  
    const initialValues = {
      username: "",
      token: "",
    };
    const navigate = useNavigate();
  
    const myValidationSchema = validationSchema;
  
    const submitAction = useCallback(({ username, token }:{username: string, token: string}) => {
      localStorage.setItem(
        CREDENTIAL_STATE,
        JSON.stringify({
          username,
          token,
          isLoggedIn: true,
          authUserData: null,
        })
      );
      navigate("/home");
  
    }, [navigate]);
  
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={myValidationSchema}
        onSubmit={submitAction}
      >
        <Form>
          <InputField label={USERNAMELABEL} name="username" />
          <InputField label={TOKENLABEL} name="token" />
          <Button type="primary" htmlType="submit">
            {LOGINLABEL}
          </Button>
        </Form>
      </Formik>
    );
  }

  export default LoginPage;