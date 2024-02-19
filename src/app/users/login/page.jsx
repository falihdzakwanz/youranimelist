"use client"

import Link from "next/link"
import React from "react"

const Page = () => {
    const handleLogin = (e) => {
        e.preventDefault()
        fetch("/api/auth/login", {
            method: POST,
            body: JSON.stringify({
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value
            })
        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen mx-auto md:grow md:w-1/2">
            <form className="bg-color-primary p-20 rounded-lg">
                <div className="flex flex-col h-4/5 justify-center items-center">
                    <h2 className="text-4xl font-semibold mb-2">Log in</h2>
                    <p className="text-sm text-color-dark">Welcome back! Please enter your details.</p>

                    <div onSubmit={(e) => handleLogin(e)} className="flex flex-col w-full my-4">
                        <label htmlFor="email" className="text-base">Email</label>
                        <input type="email" name="email" id="email" placeholder="you@gmail.com" required className="h-10 px-3 rounded-lg shadow border border-color-secondary placeholder:italic focus:outline-none focus:ring focus:border-0" />

                        <label htmlFor="password" className="mt-2">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" required className="h-10 px-3 rounded-lg shadow border border-color-secondary placeholder:italic focus:outline-none focus:ring focus:border-0" />
                    </div>

                    <button type="submit" className="w-full h-10 shadow-md bg-color-accent self-center text-color-dark hover:text-color-primary text-base rounded-lg p-2 mt-4">Log in</button>

                    <p className="text-xs mt-3 text-center">Doesn't have an account? <Link href="" className="text-color-accent">Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Page