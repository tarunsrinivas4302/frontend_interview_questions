/* eslint-disable react/prop-types */
import  { useRef, useState } from "react";


export const ConfigDrivenForm = ({
    configData,
}) => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const { title, description, fields, submitButton, cancelButton } = configData;

    // To handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        fields.forEach((field) => {
            const error = validateField(field);
            if (error) {
                newErrors[field.name] = error;
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form data submitted:", formData);
        }
    };

    // To handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // To validate individual fields
    const validateField = (field) => {
        const { name, validation } = field;
        const value = formData[name];

        if (validation?.required && !value) {
            return validation.errorMessage || `${field.label} is required`;
        }
        if (
            validation?.pattern &&
            !new RegExp(validation.pattern).test(value || "")
        ) {
            return validation.errorMessage || `Invalid format for ${field.label}`;
        }
        if (validation?.minLength && (value?.length || 0) < validation.minLength) {
            return validation.errorMessage || `${field.label} is too short`;
        }
        if (validation?.maxLength && (value?.length || 0) > validation.maxLength) {
            return validation.errorMessage || `${field.label} is too long`;
        }
        if (validation?.min && Number(value) < validation.min) {
            return validation.errorMessage || `${field.label} is too small`;
        }
        if (validation?.max && Number(value) > validation.max) {
            return validation.errorMessage || `${field.label} is too large`;
        }
        return null;
    };

    return (
        <>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <p style={{ textAlign: "center" }}>{description}</p>

            <form onSubmit={handleSubmit} ref={formRef}>
                {fields.map((item, index) => (
                    <div key={index}>
                        <label>{item.label}</label>
                        {item.type === "textarea" ? (
                            <textarea
                                rows={item.row}
                                cols={item.column}
                                name={item.name}
                                placeholder={item.placeholder}
                                onChange={handleChange}
                            />
                        ) : item.type === "select" ? (
                            <select name={item.name} onChange={handleChange}>
                                {item.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                                onChange={handleChange}
                            />
                        )}
                        {/* Error Message */}
                        {errors[item.name] && (
                            <p style={{ color: "red" }}>{errors[item.name]}</p>
                        )}
                    </div>
                ))}

                {/* Buttons Rendering */}
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {submitButton && (
                        <button type="submit" className={submitButton.color}>
                            {submitButton.label}
                        </button>
                    )}
                    {cancelButton && (
                        <button type="button" className={cancelButton.color}>
                            {cancelButton.label}
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};
