import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Name must only contain letters and spaces")
    .required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is Required"),
});

const AddAndUpdateContact = ({ isUpdate, isOpen, onClose, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact is added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact is updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            if (isUpdate) {
              updateContact(values, contact.id);
            } else {
              addContact(values);
            }
          }}
        >
          {({ errors, touched, validateForm }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field name="email" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-orange border px-3 py-1.5 self-end"
                onClick={async (e) => {
                  const formErrors = await validateForm();
                  if (formErrors.name) {
                    alert(formErrors.name);
                    e.preventDefault();
                  }
                  if (formErrors.email) {
                    alert(formErrors.email);
                    e.preventDefault();
                  }
                }}
              >
                {isUpdate ? "Update" : "Add"} contact
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
