import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-main mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-main text-white py-2 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 font-medium ml-1 hover:underline"
          >
            Log In
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <button className="py-2 w-full border-2 border-gray-500 rounded-lg flex justify-center gap-[1rem] hover:cursor-pointer">
            <img className="w-[1.8rem] h-[1.8rem] bg-cover" src="/icon/google-logo-icon.png" alt="" />
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
