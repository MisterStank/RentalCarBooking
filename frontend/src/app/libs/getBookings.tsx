import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
export default async function getBookings() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        console.log("Get bookings successful");
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        // console.error("Get bookings failed");
        console.error(
            "Get bookings failed",
            response.status,
            response.statusText
        );
        console.log(token);
    }
}
