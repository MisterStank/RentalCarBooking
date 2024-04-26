"use client";
import React, { useEffect, useState } from "react";
import { Booking } from "../interfaces/Booking";
import getBookings from "../libs/getBookings";
export default function Profile() {
    const [bookings, setBookings] = useState<Booking>();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookings();
                setBookings(response.result);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);
    return (
        <main>
            {bookings ? (
                <ul>
                    {bookings.data.map((datum) => (
                        <li key={datum._id}>
                            <h3>Booking ID: {datum._id}</h3>
                            <p>
                                Pickup Date:{" "}
                                {new Date(
                                    datum.pickupDate
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                Return Date:{" "}
                                {new Date(
                                    datum.returnDate
                                ).toLocaleDateString()}
                            </p>
                            <p>User ID: {datum.user}</p>
                            <p>
                                Car ID: {datum.car._id} (Internal ID:{" "}
                                {datum.car.id})
                            </p>
                            <p>
                                Created At:{" "}
                                {new Date(datum.createdAt).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings available.</p>
            )}
        </main>
    );
}
