import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useForm } from 'react-hook-form';

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = getAuth();
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto">
        <div className="container" id="container">
          <div className="form-container sign-up">
            <form>
              <h1 className="text-2xl mb-6">Create Account</h1>
              <div className="social-icons mb-6">
                <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fab fa-github"></i></a>
                <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span className="text-sm mb-4">or use your email for registration</span>
              <input type="text" placeholder="Name" className="input mb-2" {...register('name', { required: true })} />
              {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
              <input type="email" placeholder="Email" className="input mb-2" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
              <input type="password" placeholder="Password" className="input mb-4" {...register('password', { required: true })} />
              {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
              <button type="submit" className="btn">Sign Up</button>
            </form>
          </div>
          {/* SignIn form */}
        </div>
      </div>
    </div>
  );
};

export default Login;
