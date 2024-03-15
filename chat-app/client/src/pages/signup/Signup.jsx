import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../../hooks/useSignup";

const Signup = () => {
  const [input, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleChangeGender = (gender) => {
    setInputs({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO
    await signup(input);
  };

  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="p-6 w-full rounded-lg shadow-md 
  border text"
      >
        <h1 className="text-3xl font-semibold text-center border-b-[1px] p-3 mb-3">
          Signup <span className="text-blue-500">MERN-chat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full input input-bordered h-10 bg-white"
              value={input.fullName}
              onChange={(e) =>
                setInputs({ ...input, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-white"
              value={input.username}
              onChange={(e) =>
                setInputs({ ...input, username: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label className="label ">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-white"
              value={input.password}
              onChange={(e) =>
                setInputs({ ...input, password: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label className="label ">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Retype password"
              className="w-full input input-bordered h-10 bg-white"
              value={input.confirmPassword}
              onChange={(e) =>
                setInputs({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex my-3">
            <label className="label ">
              <span className="text-base label-text mr-3">Gender</span>
            </label>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Male</span>
                <input
                  type="radio"
                  name="gender"
                  className="radio  checked:bg-blue-500 border-none ml-3"
                  value="male"
                  checked={input.gender === "male"}
                  onChange={() => handleChangeGender("male")}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Female</span>
                <input
                  type="radio"
                  name="gender"
                  className="radio checked:bg-rose-500  ml-3"
                  value="female"
                  checked={input.gender === "female"}
                  onChange={() => handleChangeGender("female")}
                />
              </label>
            </div>
          </div>

          <div></div>

          <div>
            <button
              className="btn btn-block btn-md mt-2 py-3 bg-blue-500 border-none text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          <div className="text-center">
            <Link
              to={"/login"}
              className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block transition-colors"
            >
              Already have an account? Signin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
