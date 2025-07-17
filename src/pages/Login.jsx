import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 justify-self-center container md:w-9/12 w-11/12">
        <form
          onSubmit={handleLogin}
          className="flex flex-col rounded-lg"
          autoComplete="on"
        >
          <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center heading1 uppercase">
            login
          </h2>

          {error && (
            <p className="text-red-400 text-sm mb-4 font-semibold uppercase">
              {error}
            </p>
          )}
          <label
            htmlFor="email"
            className="text-xs font-semibold mb-2 uppercase"
          >
            Enter Your email
          </label>
          <input
            type="email"
            placeholder=""
            value={email}
            id="email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset "
            required
          />
          <label
            htmlFor="password"
            className="text-xs font-semibold mb-2 uppercase"
          >
            Enter Your password
          </label>
          <input
            type="password"
            placeholder=""
            value={password}
            autoComplete="current-password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset "
            required
          />
          <button
            type="submit"
            className="w-1/2 justify-self-center py-3 rounded-lg backdrop-blur-sm shadow-xl font-semibold text-sm ring-1 ring-inset ring-[#e8e8e8] uppercase hover:scale-105 duration-500 transition-all"
          >
            login
          </button>
        </form>
        <div className="mt-10 flex justify-center items-center flex-col">
          <h2 className="font-semibold text-lg uppercase mb-5">OR</h2>
          <button
            type="submit"
            className="w-1/2 justify-self-center py-3 rounded-lg backdrop-blur-sm shadow-xl font-semibold text-sm ring-1 ring-inset ring-[#e8e8e8] uppercase hover:scale-105 duration-500 transition-all"
            onClick={() => navigate("/signup")}
          >
            sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
