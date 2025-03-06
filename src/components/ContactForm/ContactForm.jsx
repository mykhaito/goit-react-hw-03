import styles from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

export default function ContactForm({ addContact }) {
  const initialValues = { name: "", number: "" };
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string()
      .required("Required")
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 123-45-67"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    addContact(newContact);
    resetForm();
  };

  return (
    <Formik validationSchema={FeedbackSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field className={styles.forminp} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={styles.error} name="name" component="span" />
        <label htmlFor={numberFieldId}>Number</label>
        <Field className={styles.forminp} type="text" name="number" id={numberFieldId} />
        <ErrorMessage className={styles.error} name="number" component="span" />
        <button className={styles.formbtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
