import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
    case "radio":
    case "cheakbox":
    case "date":
    default:
      return null;
  }
};

export default FormikControl;
