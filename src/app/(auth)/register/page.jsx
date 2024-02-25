"use client"

import { useState } from 'react';
import Link from "next/link"
import isEmail from "validator/lib/isemail";
import { useRouter } from 'next/navigation';

const Page = () => {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required.";
        if (!isEmail(email)) newErrors.email = "Invalid email.";
        if (password.trim().length < 6) newErrors.password = "Password must be at least 6 characters long.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading("true")
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (!data.status) {
            if (data.message === "Email already exist.") {
                newErrors.email = data.message;
                
            } else {
                newErrors.form = data.message;
            }
            setErrors(newErrors);
            setIsLoading(false)
        } else {
            e.target.reset()
            router.push("login")
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen mx-auto md:grow md:w-1/2">
            <form className="bg-color-primary pt-16 px-20 rounded-lg min-w-[400px]" onSubmit={handleSubmit} method="post">
                <div className="flex flex-col h-4/5 justify-center items-center">
                    <h2 className="text-3xl font-semibold mb-2">Sign Up</h2>
                    <p className="text-sm text-color-dark">Welcome! Please enter your details.</p>

                    <div className="flex flex-col w-full my-4">
                        <label htmlFor="username" className="text-base">Username</label>
                        <input type="text" name="username" id="username" placeholder="yourname" className="h-10 px-3 rounded-lg shadow border border-color-secondary focus:outline-none focus:ring focus:border-0" />
                        {errors.username && <p className="text-color-danger text-sm">{errors.username}</p>}

                        <label htmlFor="email" className="text-base">Email</label>
                        <input type="text" name="email" id="email" placeholder="you@gmail.com" className="h-10 px-3 rounded-lg shadow border border-color-secondary focus:outline-none focus:ring focus:border-0" />
                        {errors.email && <p className="text-color-danger text-sm">{errors.email}</p>}

                        <label htmlFor="password" className="mt-2">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="h-10 px-3 rounded-lg shadow border border-color-secondary focus:outline-none focus:ring focus:border-0" />
                        {errors.password && <p className="text-color-danger text-sm">{errors.password}</p>}
                    </div>

                    {errors.form && <p className="text-color-danger text-sm">{errors.form}</p>}
                    <button disabled={isLoading} type="submit" className="w-full h-10 shadow-md bg-color-accent self-center text-color-dark hover:text-color-primary text-base rounded-lg p-2 mt-4">{isLoading ? "Loading..." : "Sign Up"}</button>

                    <p className="text-sm mt-3 text-center">Already have an account? <Link href="login" className="text-color-accent">Log in</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Page
