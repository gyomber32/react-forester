import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import LocationField from "../MapPopup/LocationField";
import FileUpload from "../FileUpload/FileUpload";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./AddModal.module.scss";

type Props = {
  type: string;
  onSubmit: (values: any) => void;
  onCancel: () => void;
};

const initialSeedlingsValues = {
  id: "",
  species: "",
  piece: 0,
  datePlanted: new Date(),
  picture: "",
  latlng: "",
};

const initialSeedsValues = {
  id: "",
  species: "",
  piece: 0,
  dateSeeded: new Date(),
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
  datePlanted: Yup.date().required("Required"),
  latlng: Yup.string().required("Required"),
  picture: Yup.string().notRequired(),
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
  dateSeeded: Yup.date().required("Required"),
});

const AddModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.AddModal}>
      <header className={styles.AddModal_title}>
        Add new {props.children}(s)
      </header>
      {props.type === "seedlings" && (
        <Formik
          initialValues={initialSeedlingsValues}
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
                name="datePlanted"
                dateFormat="yyyy.MM.dd"
                maxDate={new Date()}
                selected={values.datePlanted}
                onChange={(datePlanted) =>
                  setFieldValue("datePlanted", datePlanted)
                }
              />
              <ErrorMessage
                className={styles.AddModal_form_error}
                name="datePlanted"
                component="div"
              />
              <Field
                className={styles.AddModal_form_field}
                name="latlng"
                type="text"
                placeholder="Location"
                value={values.latlng}
                onValueChange={(location: string) => {
                  setFieldValue("latlng", location);
                }}
                component={LocationField}
              ></Field>
              <ErrorMessage
                className={styles.AddModal_form_error}
                name="latlng"
                component="div"
              />
              <Field name="picture" component={FileUpload} />
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
      )}
      {props.type === "seeds" && (
        <Formik
          initialValues={initialSeedsValues}
          validationSchema={seedsSchema}
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
                name="dateSeeded"
                dateFormat="yyyy.MM.dd"
                maxDate={new Date()}
                selected={values.dateSeeded}
                onChange={(dateSeeded) =>
                  setFieldValue("dateSeeded", dateSeeded)
                }
              />
              <ErrorMessage
                className={styles.AddModal_form_error}
                name="dateSeeded"
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
      )}
    </div>
  );
};

export default AddModal;
