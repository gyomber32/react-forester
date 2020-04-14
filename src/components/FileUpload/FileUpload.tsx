import React, { createRef } from "react";

import styles from "./FileUpload.module.scss";

type Props = {
  field: any;
  form: any;
};

const textInput = createRef<HTMLInputElement>();

const fileSelectedhandler = (event: any, form: any, field: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  let fileTag: any;
  fileTag = document.getElementById("file");
  if (textInput.current) textInput.current.title = file.name;
  reader.onload = (event) => {
    fileTag.src = event.target?.result;
  };
  reader.readAsDataURL(file);
  form.setFieldValue(field.name, file);
};

const FileUpload: React.FC<Props> = (props) => {
  return (
    <input
      className={styles.Input}
      ref={textInput}
      id="file"
      type="file"
      title=""
      src=""
      onChange={(event) => {
        fileSelectedhandler(event, props.form, props.field);
      }}
    ></input>
  );
};

export default FileUpload;
