"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Button from "../components/Button";
import toast from "react-hot-toast";
import login from "@/app/libs/login";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLogin } = useContext(AuthContext);
    const router = useRouter();
    const handleSubmit = async () => {
        // Validate form fields
        if (!email.trim() || !password.trim()) {
            toast.error("Email and Password are required.");
            return;
        }
        try {
            const loginUser = await login(email, password);
            if (loginUser) {
                setIsLogin(true);
                router.push("/profile");
            }
        } catch (error) {
            setIsLogin(false);
            console.error("Error during login:", error);
        }
    };
    return (
        <main className="flex flex-col items-center">
            <div className="flex flex-col items-center w-[742px] h-full p-10 border-2">
                <div className="text-[#FF872F] text-[48px] font-bold ">
                    LOGIN
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Email address</span>
                    <input
                        type="email"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="skibidi@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button name="LOGIN" onClick={handleSubmit} />
            </div>
        </main>
    );
}
