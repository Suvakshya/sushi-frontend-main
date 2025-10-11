"use client";

import React, { useState } from "react";

type Field = {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  options?: string[];
};

type FormContainerProps = {
  primaryButton?: string;
  secondaryButton?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  formTitle?: string;
  width?: "full" | "medium";
  padding?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  onClose?: () => void;
};

export const FormContainer: React.FC<FormContainerProps> = ({
  primaryButton,
  secondaryButton,
  onPrimaryClick,
  onSecondaryClick,
  formTitle = "",
  width = "full",
  padding = "30px",
  children,
  onSubmit,
 
}) => {


  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center">
        <div
        
          className={`bg-white rounded-2xl shadow-[0px_12px_20px_0px_rgba(193,196,214,0.20)] border flex flex-col gap-7 ${
            width === "full" ? "w-full" : "w-full md:w-[800px] lg:w-[800px]"
          }`}
          style={{ padding }}
        >
          <div className="flex justify-between items-center">
            {formTitle && (
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-4 w-full">
                {formTitle}
              </h2>
            )}
          </div>

          {/* Render fields from children */}
          {children}
        </div>

        {(primaryButton || secondaryButton) && (
          <div
            className={`flex mt-6 ${
              width === "full" ? "w-full" : "w-full md:w-[800px] lg:w-[800px]"
            } ${primaryButton && secondaryButton ? "justify-between" : "justify-start"}`}
          >
            {primaryButton && (
              <button
                type="button"
                onClick={onPrimaryClick}
                className="mr-auto bg-orange-500 border border-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                {primaryButton}
              </button>
            )}
            {secondaryButton && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="ml-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                {secondaryButton}
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

type FormProps = {
  primaryButton?: string;
  secondaryButton?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  formTitle?: string;
  fields: Field[];
  onSubmit?: (e: React.FormEvent) => void;
  width?: "full" | "medium";
  padding?: string;
};

const Form: React.FC<FormProps> = ({
  primaryButton,
  secondaryButton,
  onPrimaryClick,
  onSecondaryClick,
  formTitle,
  fields,
  onSubmit,
  width,
  padding,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(true);

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    isFormVisible && (
      <FormContainer
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        onPrimaryClick={onPrimaryClick}
        onSecondaryClick={onSecondaryClick}
        formTitle={formTitle}
        width={width}
        padding={padding}
        onSubmit={onSubmit}
        onClose={closeForm}
      >
        {fields?.map((field, index) => {
          if (field.type === "textarea") {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows={4}
                />
              </div>
            );
          } else if (field.type === "select") {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="" disabled selected>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            );
          }
        })}
      </FormContainer>
    )
  );
};

export default Form;
