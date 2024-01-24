import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import Logo from "../Tatvasoft-logo-profile.jpg";

const initialValues = {
  title: "",
  name: "",
  gender: "",
  email: "",
  phoneNo: "",
  comments: "",
  address: "",
  social: {
    github: "",
    linkdin: "",
  },
  resume: "",
  password: "",
  confirmpassword: "",
};

const onSubmit = (values, onSubmitProps, setSubmitting) => {
  console.log(values);
  // console.log(onSubmitProps);
  onSubmitProps.resetForm();
  setSubmitting(false);
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required!"),
  name: Yup.string().required("Required!"),
  gender: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid Email format!").required("Required!"),
  phoneNo: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
  comments: Yup.string().required("Required!"),
  address: Yup.string().required("Required!"),
  social: Yup.object().shape({
    github: Yup.string()
      .matches(
        /^(https?:\/\/)?(www\.)?(github\.com){1}\/[a-zA-Z0-9_-]{1,25}$/gim,
        "Enter valid github profile link!"
      )
      .required("Required!"),
    linkdin: Yup.string()
      .matches(
        /^(https?:\/\/)?(www\.)?(in\.linkedin\.com\/in)\/[a-zA-Z0-9_-]{1,25}$/gim,
        "Enter valid linkedin profile link!"
      )
      .required("Required!"),
  }),
  resume: Yup.mixed().required("Required!"),
  password: Yup.string().required("Required!"),
  confirmpassword: Yup.string()
    .required("Required!")
    .oneOf([Yup.ref("password"), null], "Password must match!"),
});

const FormikComponents = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        // console.log(formik);
        return (
          <Form>
            <img src={Logo} alt="TatvaSoft" />
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <Field as="select" name="title" id="title">
                <option value="">Select apropreate title</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </Field>
              <ErrorMessage name="title" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label>Gender</label>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <ErrorMessage name="gender" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" id="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="phoneNo">Phone Number</label>
              <Field type="text" id="phoneNo" name="phoneNo" />
              <ErrorMessage name="phoneNo" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field as="textarea" name="comments" id="comments" />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  //   console.log(props); => provides field, form and meta element
                  const { field, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
              {/* <ErrorMessage name="address" component={TextError} /> */}
            </div>

            <div className="form-control">
              <label htmlFor="github">GitHub Profile</label>
              <Field type="text" id="github" name="social.github" />
              <ErrorMessage name="social.github" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="linkdin">Linkdin Profile</label>
              <Field type="text" id="linkdin" name="social.linkdin" />
              <ErrorMessage name="social.linkdin" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="resume">Resume (.pdf only)</label>
              <Field type="file" id="resume" name="resume" accept=".pdf" />
              <ErrorMessage name="resume" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <Field
                type="password"
                name="confirmpassword"
                id="confirmpassword"
              />
              <ErrorMessage name="confirmpassword" component={TextError} />
            </div>

            <button
              className="btn"
              type="submit"
              style={{ marginRight: "15px" }}
              disabled={!formik.isValid}
            >
              Submit
            </button>
            <button className="btn" type="reset">
              Reset
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikComponents;
