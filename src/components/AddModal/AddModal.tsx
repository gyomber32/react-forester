import React from "react";
import "./AddModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const seedlingsSchema = Yup.object().shape({
  species: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  piece: Yup.number()
    .min(1, "At least 1 piece must be added")
    .required("Required"),
  date_planted: Yup.string()
    .min(6, "Date must be added")
    .required("Required"),
  picture: Yup.string().required("Required")
});

const handleSubmit = (values: {
  species: string;
  piece: number;
  date_planted: string;
  picture: string;
}) => {
  console.log(values);
};

const handleChange = (date: any) => {
  console.log(date);
};

const AddModal = () => {
  return (
    <div className="modal_container">
      <Formik
        initialValues={{
          species: "",
          piece: 0,
          date_planted: "",
          picture: ""
        }}
        validationSchema={seedlingsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth-dialog_form">
            <Field
              className="auth-dialog_form_field"
              type="text"
              name="species"
              placeholder="Species"
            />
            <ErrorMessage
              className="auth-dialog_form_error"
              name="species"
              component="div"
            />
            <Field
              className="auth-dialog_form_field"
              type="text"
              name="piece"
              placeholder="Piece"
            />
            <ErrorMessage
              className="auth-dialog_form_error"
              name="piece"
              component="div"
            />
            <DatePicker name="date_planted" selected={new Date()} onChange={handleChange}/>
            {/* <Field
              className="auth-dialog_form_field"
              type="text"
              name="date_planted"
              placeholder="Date planted"
            /> */}
            <ErrorMessage
              className="auth-dialog_form_error"
              name="date_planted"
              component="div"
            />
            <Field
              className="auth-dialog_form_field"
              type="text"
              name="picture"
              placeholder="Picture"
            />
            <ErrorMessage
              className="auth-dialog_form_error"
              name="picture"
              component="div"
            />
            <div>
              <button className="" type="submit" disabled={isSubmitting}>
                Cancel
              </button>
              <button className="" type="submit" disabled={isSubmitting}>
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddModal;
