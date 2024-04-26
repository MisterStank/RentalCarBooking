"use client";
import React, { ReactNode, createContext, useState } from "react";

interface AuthContextType {
    isLogin: Boolean;
    setIsLogin: (isLogin: Boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setIsLogin: () => {},
});

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
