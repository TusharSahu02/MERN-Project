const Login = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="p-6 w-full rounded-lg shadow-md 
      border text"
      >
        <h1 className="text-3xl font-semibold text-center border-b-[1px] p-3 mb-3">
          Login <span className="text-blue-500">MERN-chat</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-white"
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
            />
          </div>
          <div>
            <button className="btn btn-block btn-md mt-2 py-3 bg-blue-500 border-none text-white">
              Login
            </button>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block transition-colors"
            >
              Don&apos;s have an account? Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
