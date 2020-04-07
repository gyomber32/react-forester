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
  date_planted: Yup.date()
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
  startDate = date;
};

let startDate = new Date();

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
            <DatePicker id="asd" className="auth-dialog_form_field" popperClassName="asd" name="date_planted" value={startDate.toString()} minDate={new Date()} selected={startDate} onChange={handleChange}/>
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
