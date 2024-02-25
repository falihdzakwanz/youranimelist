"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import isEmail from "validator/lib/isEmail";

const Page = () => {
    const router = useRouter()
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        let newErrors = {};
        if (!isEmail(email)) newErrors.email = "Invalid email.";
        if (password.trim().length < 6) newErrors.password = "Password must be at least 6 characters long.";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading("true")
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl: "/users/dashboard"
            })
            if (!response?.error) {
                e.target.reset()
                router.push("/users/dashboard")
                setIsLoading(false)
            } else {
                if (response.status === 401) {
                    newErrors.form = "Email or Password is Incorrect."
                    setErrors(newErrors)
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen mx-auto md:grow md:w-1/2">
            <form className="bg-color-primary px-16 pt-20 rounded-lg min-w-[400px]" onSubmit={(e) => handleLogin(e)} method="post">
                <div className="flex flex-col h-4/5 justify-center items-center">
                    <h2 className="text-4xl font-semibold mb-2">Log in</h2>
                    <p className="text-sm text-color-dark">Welcome back! Please enter your details.</p>

                    <div className="flex flex-col w-full my-4">
                        <label htmlFor="email" className="text-base">Email</label>
                        <input type="text" name="email" id="email" placeholder="you@gmail.com" className="h-10 px-3 rounded-lg shadow border border-color-secondary focus:outline-none focus:ring focus:border-0" />
                        {errors.email && <p className="text-color-danger text-sm">{errors.email}</p>}

                        <label htmlFor="password" className="mt-2">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="h-10 px-3 rounded-lg shadow border border-color-secondary focus:outline-none focus:ring focus:border-0" />
                        {errors.password && <p className="text-color-danger text-sm">{errors.password}</p>}
                        
                    </div>
                    
                    {errors.form && <p className="text-color-danger text-sm">{errors.form}</p>}

                    <button disabled={isLoading} type="submit" className="w-full h-10 shadow-md bg-color-accent self-center text-color-dark hover:text-color-primary text-base rounded-lg p-2 mt-4">{isLoading ? "Loading..." : "Log In"}</button>

                    <p className="text-sm mt-3 text-center">Doesn't have an account? <Link href="register" className="text-color-accent">Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Page