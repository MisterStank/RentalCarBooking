import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
export default async function login(email: string, password: string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    if (response.ok) {
        // Login successful
        console.log("Login successful");
        toast.success("Login successful");
        const data = await response.json();
        setCookie("token", data?.AccessToken);
        localStorage.setItem("token", data.token);
        return data;
    } else {
        // Login failed
        toast("Incorrect username/password\nor Account does not exist", {
            icon: "⚠️",
        });
        console.error("Login failed");
    }
}
