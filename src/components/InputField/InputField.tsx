import { FieldHookConfig, useField } from "formik";
import { Input } from "antd";

export type InputFieldPropType={
  label: string;
  props: FieldHookConfig<string>
}

export default function InputField({ label, ...props }:any) {
  const [field, meta] = useField(props);
  return (
    <>
      <label>
        {label}
        <Input {...field} {...props} />
      </label>
      {/* {meta.error && meta.touched && <div>{meta.error}</div>} [order, todo] */}
      { meta.touched && meta.error  && <div>{meta.error}</div>} 
    </>
  );
}
