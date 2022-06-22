import { Button } from "antd";
import { FieldArray, Form, Formik } from "formik";
import InputField from "../InputField/InputField";
import validationSchema from "./validationSchema";
import { DeleteOutlined } from "@ant-design/icons";
import {
  ADDFILE,
  CONTENT,
  DESCRIPTION,
  FILENAME,
  GISTFILE,
  SUBMIT,
} from "./constants";
import InputTextArea from "../InputTextArea/InputTextArea";
import { useContext } from "react";
import { EditGistContext } from "../../contexts/editGistContext/provider";

export type GistCreationFormPropType = {
  onSubmitForm: Function;
  descrption?: string;
  files?: any[];
};

export default function GistCreationForm({
  //  description,
  // files,
  onSubmitForm,
}: GistCreationFormPropType) {
  const { state, dispatch } = useContext(EditGistContext);

  const initalValues = {
    description: state.description ?? "",
    files: state.files ?? [],
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initalValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmitForm(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputField label={DESCRIPTION} name="description" />
            <FieldArray
              name="files"
              render={(
                { remove, push } //part of arrayHelpers Object
              ) => (
                <div>
                  {values.files.length > 0 &&
                    values.files.map((file: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "1px gray solid",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "2%",
                          padding: "1%",
                          margin: "1%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <InputField
                            label={FILENAME}
                            name={`files.${index}.filename`}
                          />
                          <InputTextArea
                            rows={4}
                            label={CONTENT}
                            name={`files.${index}.content`}
                          />
                        </div>

                        <Button
                          type="primary"
                          shape="round"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(index)}
                          danger
                          size="small"
                        />
                      </div>
                    ))}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <Button type="dashed" style={{margin: "0.5rem"}} onClick={() => push(GISTFILE)}>
                      {ADDFILE}
                    </Button>

                    <Button type="primary" htmlType="submit">
                      {SUBMIT}
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
