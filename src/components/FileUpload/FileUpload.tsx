import React from "react";

import Dropzone from "react-dropzone";

import styles from "./FileUpload.module.scss";

type Props = {
  field: any;
  form: any;
};

const acceptedPictureTypes = ["image/jpeg", "image/jpg", "image/png"];

const onDrop = (picture: any, form: any, field: any) => {
  form.setFieldValue(field.name, picture[0]);
};

const FileUpload: React.FC<Props> = (props) => {
  return (
    // file is max 10 MB and only single image can be uploaded, in types defined above
    <div>
      <Dropzone
        onDrop={(acceptedPicture) =>
          onDrop(acceptedPicture, props.form, props.field)
        }
        multiple={false}
        maxSize={10000000}
        accept={acceptedPictureTypes}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className={styles.Input}>
              <input {...getInputProps()}/>
              <p className={styles.Input_paragraph}>Drag 'n' drop or click to select a picture</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
