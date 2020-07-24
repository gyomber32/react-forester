import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import LocationField from "../LocationField/LocationField";
import FileUpload from "../FileUpload/FileUpload";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./AddModal.module.scss";

type Props = {
  type: string;
  onSubmit: (values: any) => void;
  onCancel: () => void;
};

const initialTreesValues = {
  species: "",
  plantedQuantity: 0,
  survivedQuantity: 0,
  datePlanted: new Date(),
  picture: null,
  location: "",
};

const initialSeedlingsValues = {
  species: "",
  plantedQuantity: 0,
  survivedQuantity: 0,
  datePlanted: new Date(),
  picture: "",
  location: "",
};

const initialSeedsValues = {
  species: "",
  seededQuantity: 0,
  dateSeeded: new Date(),
};

const treesSchema = Yup.object().shape({
  species: Yup.string()
    .trim()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  plantedQuantity: Yup.number()
    .moreThan(0, "The number must be positive!")
    .required("Required"),
  datePlanted: Yup.date().required("Required"),
  location: Yup.string().required("Required"),
  picture: Yup.object().shape({
    lastModified: Yup.number(),
    lastModifiedDate: Yup.date(),
    name: Yup.string(),
    path: Yup.string(),
    size: Yup.number(),
    type: Yup.string(),
    webkitRelativePath: Yup.string(),
  }).nullable()});

const seedlingsSchema = Yup.object().shape({
  species: Yup.string()
    .trim()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  plantedQuantity: Yup.number()
    .moreThan(0, "The number must be positive!")
    .required("Required"),
  datePlanted: Yup.date().required("Required"),
  location: Yup.string().required("Required"),
  picture: Yup.object().shape({
    lastModified: Yup.number(),
    lastModifiedDate: Yup.date(),
    name: Yup.string(),
    path: Yup.string(),
    size: Yup.number(),
    type: Yup.string(),
    webkitRelativePath: Yup.string(),
  }).nullable()});

const seedsSchema = Yup.object().shape({
  species: Yup.string()
    .trim()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  seededQuantity: Yup.number()
    .moreThan(0, "The number must be positive!")
    .required("Required"),
  dateSeeded: Yup.date().required("Required"),
});

const AddModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.AddModal}>
      {console.log("Add modal rerender")}
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
                className={styles.AddModal_formField}
                type="text"
                name="species"
                placeholder="Species"
                value={values.species}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="species"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                type="number"
                name="plantedQuantity"
                placeholder="Planted quantity"
                value={values.plantedQuantity ? values.plantedQuantity : ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="plantedQuantity"
                component="div"
              />
              <DatePicker
                className={styles.AddModal_formField}
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
                className={styles.AddModal_formError}
                name="datePlanted"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                name="latlng"
                type="text"
                placeholder="Location"
                value={values.location}
                onValueChange={(location: string) => {
                  setFieldValue("location", location);
                }}
                component={LocationField}
              ></Field>
              <ErrorMessage
                className={styles.AddModal_formError}
                name="location"
                component="div"
              />
              <Field name="picture" component={FileUpload} />
              <ErrorMessage
                className={styles.AddModal_formError}
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
                className={styles.AddModal_formField}
                type="text"
                name="species"
                placeholder="Species"
                value={values.species}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="species"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                type="number"
                name="seededQuantity"
                placeholder="Seeded quantity"
                value={values.seededQuantity ? values.seededQuantity : ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="seededQuantity"
                component="div"
              />
              <DatePicker
                className={styles.AddModal_formField}
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
                className={styles.AddModal_formError}
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
      {props.type === "trees" && (
        <Formik
          initialValues={initialTreesValues}
          validationSchema={treesSchema}
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
                className={styles.AddModal_formField}
                type="text"
                name="species"
                placeholder="Species"
                value={values.species}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="species"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                type="number"
                name="plantedQuantity"
                placeholder="Planted quantity"
                value={values.plantedQuantity ? values.plantedQuantity : ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
                name="plantedQuantity"
                component="div"
              />
              <DatePicker
                className={styles.AddModal_formField}
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
                className={styles.AddModal_formError}
                name="datePlanted"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                name="latlng"
                type="text"
                placeholder="Location"
                value={values.location}
                onValueChange={(location: string) => {
                  setFieldValue("location", location);
                }}
                component={LocationField}
              ></Field>
              <ErrorMessage
                className={styles.AddModal_formError}
                name="location"
                component="div"
              />
              <Field
                className={styles.AddModal_formField}
                name="picture"
                component={FileUpload}
              />
              <ErrorMessage
                className={styles.AddModal_formError}
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
    </div>
  );
};

export default AddModal;
