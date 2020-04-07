import React from "react";

import { Field, FieldProps } from "formik";

interface Props extends FieldProps {
  placeholder: string;
  field: any;
  value: number | "";
  className: string;
}

const UniqueNumberField: React.FC<Props> = ({
  className,
  placeholder,
  field,
}) => {
  return (
    <Field
      className={className}
      type="number"
      placeholder={placeholder}
      {...field}
    />
  );
};

export default UniqueNumberField;
