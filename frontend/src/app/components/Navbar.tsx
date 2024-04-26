"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
export default function Navbar() {
    const { isLogin, setIsLogin } = useContext(AuthContext);
    const router = useRouter();
    const onClickButtonHandler = () => {
        if (!isLogin) {
            router.push("/login");
        } else {
            // Logout by Clear a "token" cookie
            deleteCookie("token");
            setIsLogin(false);
            window.location.href = "/";
        }
    };
    return (
        <div className="sticky top-0 z-50">
            <nav className="w-full bg-[#D9D9D9] flex flex-row justify-end items-center px-2 md:py-0 py-2">
                <Link href={"/login"} className="flex">
                    <Button
                        name={isLogin ? "LOGOUT" : "LOGIN"}
                        onClick={onClickButtonHandler}
                    />
                </Link>
            </nav>
        </div>
    );
}
