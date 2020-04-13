import React, { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./AddModal.module.scss";
import FileUpload from "../FileUpload/FileUpload";

type Props = {
  type: string;
  onSubmit: (values: any) => void;
  onCancel: () => void;
};

const initialSeedlingsValues= {
  id: "",
  species: "",
  piece: 0,
  date_planted: new Date(),
  picture: "",
};

const initialSeedsValues = {
  id: "",
  species: "",
  piece: 0,
  date_planted: new Date()
};

const seedlingsSchema = Yup.object().shape({
  species: Yup.string()
    .trim()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  piece: Yup.number()
    .moreThan(0, "The number must be positive!")
    .required("Required"),
  picture: Yup.string(),
  date_planted: Yup.date().required("Required")
});

const seedsSchema = Yup.object().shape({
  species: Yup.string()
    .trim()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  piece: Yup.number()
    .moreThan(0, "The number must be positive!")
    .required("Required"),
  date_planted: Yup.date().required("Required")
});

const AddModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.AddModal}>
      <header className={styles.AddModal_title}>
        Add new {props.children}(s)
      </header>
      <Formik
        initialValues={props.type === "seedlings" ? initialSeedlingsValues : initialSeedsValues}
        validationSchema={props.type === "seedlings" ? seedlingsSchema : seedsSchema}
        onSubmit={(values) => {
          props.onSubmit(values);
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className={styles.AddModal_form}>
            <Field
              className={styles.AddModal_form_field}
              type="text"
              name="species"
              placeholder="Species"
              value={values.species}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              className={styles.AddModal_form_error}
              name="species"
              component="div"
            />
            <Field
              className={styles.AddModal_form_field}
              type="number"
              name="piece"
              placeholder="Piece"
              value={values.piece ? values.piece : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              className={styles.AddModal_form_error}
              name="piece"
              component="div"
            />
            <DatePicker
              className={styles.AddModal_form_field}
              popperClassName="datepicker"
              name="date_planted"
              dateFormat="yyyy.MM.dd"
              selected={values.date_planted}
              onChange={(date) => setFieldValue("date_planted", date)}
            />
            <ErrorMessage
              className={styles.AddModal_form_error}
              name="date_planted"
              component="div"
            />
            {props.type === "seedlings" && (
              <Fragment>
                <Field
                  name="picture"
                  component={FileUpload}
                />
                <ErrorMessage
                  className={styles.AddModal_form_error}
                  name="picture"
                  component="div"
                />
              </Fragment>
            )}
            <div className={styles.AddModal_formActions}>
              <button
                className={styles.AddModal_formActions_button}
                disabled={isSubmitting}
                type="button"
                onClick={props.onCancel}
              >
                Cancel
              </button>
              <button
                className={styles.AddModal_formActions_button}
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddModal;
