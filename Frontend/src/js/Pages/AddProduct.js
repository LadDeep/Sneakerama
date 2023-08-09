import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import ImagePreview from "../Components/ImagePreview";
import "../../css/ProductForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileInput from "../Components/FileInput";
import { backendURL } from "../../constants";

const sizes = [
  3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
  12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5,
];

const initialValues = {
  brand: "",
  model: "",
  description: "",
  gender: "male",
  category: "boys",
  image: [],
  price: "",
  color: "#ff0000",
  availableSizes: [{ size: "3", quantity: 0 }],
};

const validationSchema = Yup.object({
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  description: Yup.string().required("Description is required"),
  gender: Yup.string().required("Gender is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.array().min(1, "At least one image is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number().required("Price is required"),
  avialableSizes: Yup.array(
    Yup.object().shape({
      size: Yup.string(),
      quantity: Yup.number(),
    })
  ).min(1, "Atleat one size is required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Signup button clicked!");
    console.log(values);
    if (validationSchema.isValid()) {
      try {
        const response = await axios.post(`${backendURL}/addProduct`, values);
        if (response.status === 200) {
          alert("Product added successfully");
          navigate("/inventory");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setSubmitting(false);
  };
  // TODO: filter selected sizes
  // const getAvailableSizes = (selectedSizes) => {
  //   console.log("selectedSizes", selectedSizes);
  //   const newS = sizes.filter((size) => !selectedSizes.includes(size));
  //   console.log(newS);
  //   return sizes.filter((size) => !selectedSizes.includes(size));
  // };

  const handleImageChange = (files, images, setFieldValue)=>{
    const newImages = [...images,...files]
    console.log("image Change", newImages)
    setFieldValue('image', newImages)
  }

  const handleRemoveImage = (removeIndex, images, setFieldValue)=>{
    const filteredImages = images.filter((_,index)=>index!==removeIndex);
    console.log("remove Change", filteredImages)
    setFieldValue('image', filteredImages)
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Add New Product</h2>
        <div className="product-form-contianer">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              handleBlur,
              handleChange,
              errors,
              touched,
            }) => (
              <Form>
                <div className="product-field-input-row">
                  <div className="product-field-input">
                    <label htmlFor="brand">Brand</label>
                    <Field
                      type="text"
                      id="brand"
                      name="brand"
                      placeholder="Brand"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="brand"
                      component="div"
                    />
                  </div>
                  <div className="product-field-input">
                    <label htmlFor="model">Model</label>
                    <Field type="text" name="model" placeholder="Model" />
                    <ErrorMessage
                      className="error-message"
                      name="model"
                      component="div"
                    />
                  </div>
                </div>
                <div className="product-field-input-row">
                  <div className="product-field-input">
                    <label htmlFor="gender">Gender</label>
                    <Field as="select" name="gender" className="selection">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unisex">Unisex</option>
                    </Field>
                  </div>
                  <div className="product-field-input">
                    <label htmlFor="category">Category</label>
                    <Field as="select" name="category" className="selection">
                      {values.gender && console.log(values.gender)}
                      {values.gender && values.gender === "male" ? (
                        <>
                          <option value="boys">Boys</option>
                          <option value="men">Men</option>
                        </>
                      ) : values.gender === "female" ? (
                        <>
                          <option value="girls">Girls</option>
                          <option value="women">Women</option>
                        </>
                      ) : (
                        <option value="unisex">Unisex</option>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="product-field-input">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                  />
                  <ErrorMessage
                    className="error-message"
                    name="description"
                    component="div"
                  />
                </div>
                <h4>Add More Details</h4>
                <hr style={{ borderColor: "white", width: "98%" }}></hr>
                <ErrorMessage className="error-message" name="varients" />

                <div style={{ margin: "1.5rem 0" }}>
                  <div className="product-field-input-row">
                    <div className="product-field-input">
                      <div className="image-preview">
                        <ImagePreview
                          imageFiles={values.image}
                          onChange={(index) =>
                            handleRemoveImage(
                              index,
                              values.image,
                              setFieldValue
                            )
                          }
                        />
                        <FileInput
                          images={values.image}
                          name={`image`}
                          multiple
                          onChange={(files) =>
                            handleImageChange(
                              files,
                              values.image,
                              setFieldValue
                            )
                          }
                        />
                      </div>
                      <ErrorMessage
                        className="error-message"
                        name={`image`}
                        component="div"
                      />
                    </div>

                    <div className="product-field-input">
                      <div>
                        <label htmlFor={`color`}>Color</label>
                        <Field type="color" name={`color`} />
                        <ErrorMessage
                          className="error-message"
                          name={`color`}
                          component="div"
                        />
                      </div>

                      <div>
                        <label htmlFor={`price`}>Price</label>
                        $
                        <Field
                          type="number"
                          name={`price`}
                          placeholder="0"
                          min={0}
                          step={0.01}
                        />
                      </div>
                      <ErrorMessage
                        className="error-message"
                        name={`price`}
                        component="div"
                      />
                    </div>
                  </div>
                  <label htmlFor={`size`}>
                    <p>Size Selection</p>
                  </label>
                  <div>
                    <FieldArray name="availableSizes">
                      {({ remove, push }) => (
                        <div className="size-selection-container">
                          {values.availableSizes.map((item, index) => {
                            const size = `availableSizes[${index}].size`;
                            // const touchedsize = getIn(touched, size);
                            // const errorsize = getIn(errors, size);

                            const quantity = `availableSizes[${index}].quantity`;
                            // const touchedquantity = getIn(touched, quantity);
                            // const errorquantity = getIn(errors, quantity);

                            return (
                              <div key={index} className="size-selection-row">
                                <div className="product-field-input">
                                  <Field
                                    as="select"
                                    name={size}
                                    className="selection"
                                    value={item.size}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    {sizes.map((currentSize, sIndex) => (
                                      <option key={sIndex} value={currentSize}>
                                        {currentSize}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="product-field-input">
                                  <Field
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    label="quantity"
                                    name={quantity}
                                    value={item.quantity}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </button>
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                              push({
                                size: "",
                                quantity: 0,
                              })
                            }
                          >
                            Add Size
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <button type="submit" className="button">
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
