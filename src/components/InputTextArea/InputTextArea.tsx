import { Input } from 'antd';
import React from 'react';

import { useField } from "formik";
const { TextArea } = Input;


export default function InputTextArea({label, rows, ...props}:any) {
    const [field, meta] = useField(props);
    return(
        <>
            <label>
                {label}
                <TextArea rows={rows || 4} {...field} {...props}/>
            </label>
            {meta.error && meta.touched && <div>{meta.error}</div>}
        </>
    );
}