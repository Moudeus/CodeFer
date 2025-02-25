import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    country: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validate = () => {
      let newErrors = {};
      if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters long.";
      }
      if (!formData.gender) {
        newErrors.gender = "Please select a gender.";
      }
      if (!formData.country) {
        newErrors.country = "Please select a country.";
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must agree to the terms and conditions.";
      }
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validate();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded w-50 mx-auto">
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isValid={formData.name.length >= 3}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Male"
            name="gender"
            value="male"
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
          <Form.Check
            inline
            type="radio"
            label="Female"
            name="gender"
            value="female"
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
          <Form.Check
            inline
            type="radio"
            label="Other"
            name="gender"
            value="other"
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
        </div>
        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          name="country"
          value={formData.country}
          onChange={handleChange}
          isValid={!!formData.country}
          isInvalid={!!errors.country}>
          <option value="">Select a country</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
          <option value="Japan">Japan</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formTermsAccepted">
        <Form.Check
          inline
          type="checkbox"
          label="I agree to the terms and conditions"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          isInvalid={!!errors.termsAccepted}
        />
        <Form.Control.Feedback type="invalid">{errors.termsAccepted}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isFormValid}>
        Submit
      </Button>
    </Form>
  );
};

export default ValidationForm;
