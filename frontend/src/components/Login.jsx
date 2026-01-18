import { useState } from "react";
import React from "react";
export function Login({ getUser }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.trim().length < 4) {
      alert("Password should be at least 4 characters long");
      return;
    } else if (!formData.name.trim().length) {
      alert("Please enter your name");
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    getUser();
  };

  return (
    <div className="container mt-14 mx-auto px-4 max-w-xl">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 font-(family-name:--font-roboto)">
          Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 mt-6 text-white cursor-pointer font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Processing...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
