import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UniqueNumberField from "../UniqueNumberField/UniqueNumberField";

import styles from "./AddModal.module.scss";

type Props = {
  onSubmit: (values: Values) => void;
  onCancel: () => void;
};

type Values = {
  species: string;
  piece: number | "";
  date_planted: Date;
  picture: string;
};

const initialValues: Values = {
  species: "",
  piece: "",
  date_planted: new Date(),
  picture: "",
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
  date_planted: Yup.date().required("Required"),
  picture: Yup.string().required("Required"),
});

const AddModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.AddModal}>
      <header className={styles.AddModal_title}>
        Add new {props.children}(s)
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={seedlingsSchema}
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
              name="piece"
              placeholder="Piece"
              value={initialValues.piece}
              component={UniqueNumberField}
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
            <Field
              className={styles.AddModal_form_field}
              type="text"
              name="picture"
              placeholder="Picture"
              value={values.picture}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              className={styles.AddModal_form_error}
              name="picture"
              component="div"
            />
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
