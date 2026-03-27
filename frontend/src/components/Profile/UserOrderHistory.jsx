import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        console.log("Order history:", response.data.data);
        setOrderHistory(response.data.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-zinc-100">
        Loading...
      </div>
    );
  }

  if (OrderHistory.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
          No Order History
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
          alt="No orders"
          className="h-[20vh]"
        />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-100 mb-8">
        Your Order History
      </h1>

      {/* Table Header */}
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]"><h1 className="text-center">Sr.</h1></div>
        <div className="w-[22%]"><h1>Books</h1></div>
        <div className="w-[45%]"><h1>Description</h1></div>
        <div className="w-[9%]"><h1>Price</h1></div>
        <div className="w-[16%]"><h1>Status</h1></div>
        <div className="w-none md:w-[5%] hidden md:block"><h1>Mode</h1></div>
      </div>

      {/* Table Rows */}
      {OrderHistory.map((items, i) => {
        const book = items.book || {
          _id: "",
          title: "Unknown Book",
          desc: "",
          price: 0,
        };

        return (
          <div
            key={i}
            className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer"
          >
            <div className="w-[3%]">
              <h1 className="text-center">{i + 1}</h1>
            </div>
            <div className="w-[22%]">
              {book._id ? (
                <Link
                  to={`/view-book-details/${book._id}`}
                  className="hover:text-blue-300"
                >
                  {book.title}
                </Link>
              ) : (
                <span>{book.title}</span>
              )}
            </div>
            <div className="w-[45%]">
              <h1>{book.desc?.slice(0, 50)}...</h1>
            </div>
            <div className="w-[9%]">
              <h1>₹{book.price}</h1>
            </div>
            <div className="w-[16%]">
              <h1
                className={`font-semibold ${
                  items.status === "Order placed"
                    ? "text-yellow-500"
                    : items.status === "Canceled"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {items.status || "Pending"}
              </h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrderHistory;
