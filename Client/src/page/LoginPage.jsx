import React, { useState, useContext } from "react";
import { BankContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login, setLogin , toke,setToken} = useContext(BankContext); // ✅ context
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // loader
  const [error, setError] = useState(""); // error message

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (login) {
        // 🔑 LOGIN API CALL
        const res = await axios.post("http://localhost:5000/auth/api/v1/login", {
          email: form.email,
          password: form.password,
        });

       

        toast.success("Login SuccessFull")
        setToken(res.data.token)
        // Example: token save karo localStorage me
        localStorage.setItem("token", res.data.token);
        

      } else {
        // 🔑 SIGNUP API CALL
        const res = await axios.post("http://localhost:5000/auth/api/v1/createUser", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });

        console.log("✅ Signup success:", res.data);
        toast.success("Signup SuccessFull");
        setLogin(true); // signup ke baad login page dikhao
      }
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-700 min-h-[300px] w-[25%] shadow-2xl flex flex-col gap-3 items-center py-6 rounded-lg bg-white"
      >
        <div className="mt-4">
          {login ? (
            <p className="text-gray-700 text-lg font-semibold">Login to your account</p>
          ) : (
            <p className="text-gray-700 text-lg font-semibold">Create your account</p>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Signup fields */}
        {!login && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-800 h-[45px] w-[300px] p-2 rounded"
            placeholder="Enter your name"
            required
          />
        )}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-800 h-[45px] w-[300px] p-2 rounded"
          placeholder="Enter your email"
          required
        />

        {!login && (
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-800 h-[45px] w-[300px] p-2 rounded"
            placeholder="Enter your phone number"
            required
          />
        )}

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-800 h-[45px] w-[300px] p-2 rounded"
          placeholder="Enter your password"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-700 text-white border hover:bg-blue-600 w-[300px] h-[45px] rounded cursor-pointer disabled:bg-gray-400"
        >
          {loading ? "Please wait..." : login ? "Login" : "Signup"}
        </button>

        {/* Toggle Login/Signup */}
        <div className="mt-2">
          {login ? (
            <p className="text-blue-500 cursor-pointer" onClick={() => setLogin(false)}>
              Create your account
            </p>
          ) : (
            <p className="text-blue-500 cursor-pointer" onClick={() => setLogin(true)}>
              Login into account
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
