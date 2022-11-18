import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useRef, useEffect } from "react";
import { client } from "../sanity";

const applicationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  apt: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  pronouns: Yup.string().required("Required"),
  height: Yup.string().required("Required"),
  hair: Yup.string().required("Required"),
  eyes: Yup.string().required("Required"),
  instagram: Yup.string().required("Required"),
  talents: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
  faceCloseUp: Yup.object(),
  waistUp: Yup.object(),
  headToToes: Yup.object(),
});

const initialValues = {
  name: "Name",
  email: "name@email.com",
  address: "Address",
  apt: "Apt",
  city: "City",
  state: "State",
  zip: "Zip",
  phone: "333-333-3333",
  gender: "any",
  pronouns: "any",
  height: "any",
  hair: "any",
  eyes: "blue",
  instagram: "any",
  talents: "any",
  message: "Message",
  faceCloseUp: {},
  waistUp: {},
  headToToe: {},
};

export default function Home() {
  const inputImg1Ref = useRef(null);
  const inputImg2Ref = useRef(null);
  const inputImg3Ref = useRef(null);

  function uploadImageToSanity() {
    const inputRefs = [inputImg1Ref, inputImg2Ref, inputImg3Ref];
    const imageFiles = inputRefs.map((ref) => ref?.current?.files[0]);

    console.log(imageFiles);
    const promises = imageFiles.map((file) => {
      if (file) {
        return client.assets
          .upload("image", file, {
            ...file,
          })
          .then((asset) => {
            return {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };
          });
      }
    });

    return Promise.all(promises);
  }

  async function submitForm(values) {
    const images = await uploadImageToSanity();

    if (images[0]) {
      values.faceCloseUp = images[0];
    } else if (values.faceCloseUp) {
      delete values.faceCloseUp;
    }
    if (images[1]) {
      values.waistUp = images[1];
    } else if (values.waistUp) {
      delete values.waistUp;
    }
    if (images[2]) {
      values.headToToe = images[2];
    } else if (values.headToToe) {
      delete values.headToToe;
    }

    const doc = {
      _type: "application",
      ...values,
    };
    console.log("submitting", doc);

    client
      .create(doc)
      .then((res) => {
        console.log(`An application was submitted with id : ${res._id}`);
      })
      .catch((err) => {
        console.error("An error occurred:", err);
      });
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={applicationSchema}
        onSubmit={async (values) => {
          await submitForm(values);
        }}>
        {/* what is this syntax?  */}

        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Upload image 1:
              <input type="file" ref={inputImg1Ref} />
            </label>
            <label>
              Upload image 2:
              <input type="file" ref={inputImg2Ref} />
            </label>
            <label>
              Upload image 3:
              <input type="file" ref={inputImg3Ref} />
            </label>
            <label>
              <span>Name</span>
              <Field name="name" label="name" />
              {errors.name && touched.name && errors.name}
            </label>
            <label>
              <span>Email</span>
              <Field name="email" type="email" />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </label>
            <label>
              <span>Address</span>
              <Field name="address" type="text" />
              {errors.address && touched.address && <div>{errors.address}</div>}
            </label>
            <label>
              <span>Apt</span>
              <Field name="apt" type="text" />
              {errors.apt && touched.apt && <div>{errors.apt}</div>}
            </label>
            <label>
              <span>City</span>
              <Field name="city" type="text" />
              {errors.city && touched.city && <div>{errors.city}</div>}
            </label>
            <label>
              <span>State</span>
              <Field name="state" type="text" />
              {errors.state && touched.state && <div>{errors.state}</div>}
            </label>
            <label>
              <span>Zip</span>
              <Field name="zip" type="text" />
              {errors.zip && touched.zip && <div>{errors.zip}</div>}
            </label>
            <label>
              <span>Phone</span>
              <Field name="phone" type="text" />
              {errors.phone && touched.phone && <div>{errors.phone}</div>}
            </label>
            <label>
              <span>Gender</span>
              <Field name="gender" type="text" />
              {errors.gender && touched.gender && <div>{errors.gender}</div>}
            </label>
            <label>
              <span>Pronouns</span>
              <Field name="pronouns" type="text" />
              {errors.pronouns && touched.pronouns && (
                <div>{errors.pronouns}</div>
              )}
            </label>
            <label>
              <span>Height</span>
              <Field name="height" type="text" />
              {errors.height && touched.height && <div>{errors.height}</div>}
            </label>
            <label>
              <span>Hair</span>
              <Field name="hair" type="text" />
              {errors.hair && touched.hair && <div>{errors.hair}</div>}
            </label>
            <label>
              <span>Eyes</span>
              <Field name="eyes" type="text" />
              {errors.eyes && touched.eyes && <div>{errors.eyes}</div>}
            </label>
            <label>
              <span>Instagram</span>
              <Field name="instagram" type="text" />
              {errors.instagram && touched.instagram && (
                <div>{errors.instagram}</div>
              )}
            </label>
            <label>
              <span>Talents</span>
              <Field name="talents" type="text" />
              {errors.talents && touched.talents && <div>{errors.talents}</div>}
            </label>
            <label>
              <span>Message</span>
              {/* this field should be a multiline text field */}
              <Field name="message" type="text" />
              {errors.message && touched.message && <div>{errors.message}</div>}
            </label>
            {isSubmitting && <div>Loading...</div>}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
