import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";
import GenderCheckbox from "./GenderCheckBox";

/**
 * SignUp component for user registration.
 * @returns {JSX.Element} - Returns the JSX for rendering the sign-up form.
 */
const SignUp = () => {
  // State to manage form inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Custom hook for handling signup functionality
  const { loading, signup } = useSignup();

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // Function to handle gender checkbox change
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", inputs);
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> MystiqueTalk</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={inputs.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
            />
          </div>

          {/* Username input */}
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleInputChange}
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Password input */}
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Confirm Password input */}
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Gender Checkbox */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          {/* Link to Login page */}
          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              {/* Display loading spinner if loading, otherwise display "Sign Up" */}
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
