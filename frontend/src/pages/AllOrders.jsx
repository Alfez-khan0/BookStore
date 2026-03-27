import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";
import { FaUser, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, []);

  const setOptionsButton = (i) => {
    setOptions(options === i ? -1 : i);
  };

  const changeStatus = async (i) => {
    const status = document.getElementById(`status-${i}`).value;
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${allOrders[i]._id}`,
        { status },
        { headers }
      );
      alert(response.data.message);

      // Update local state
      setAllOrders((prev) => {
        const newOrders = [...prev];
        newOrders[i].status = status;
        return newOrders;
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      {userDivData && <SeeUserData userDivData={userDivData} setUserDiv={setUserDiv} />}

      {allOrders.length === 0 ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          {/* Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%] text-center">
              <FaUser />
            </div>
          </div>

          {/* Orders List */}
          {allOrders.map((order, i) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
              key={order._id}
            >
              <div className="w-[3%] text-center">{i + 1}</div>

              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${order.book?._id || ""}`}
                  className="hover:text-blue-300"
                >
                  {order.book?.title || "N/A"}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                {order.book?.desc?.slice(0, 50) || "N/A"}...
              </div>

              <div className="w-[17%] md:w-[9%]">₹ {order.book?.price || 0}</div>

              <div className="w-[30%] md:w-[16%] font-semibold">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptionsButton(i)}
                >
                  {order.status === "Order placed" ? (
                    <div className="text-yellow-500">{order.status}</div>
                  ) : order.status === "Canceled" ? (
                    <div className="text-red-500">{order.status}</div>
                  ) : (
                    <div className="text-green-500">{order.status}</div>
                  )}
                </button>

                <div className={`${options === i ? "flex mt-2 gap-2" : "hidden"}`}>
                  <select name="status" id={`status-${i}`} className="bg-gray-800">
                    {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
                      (status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      )
                    )}
                  </select>

                  <button
                    className="text-green-500 hover:text-pink-600 mx-2"
                    onClick={() => changeStatus(i)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>

              {/* Show user button only if user exists */}
              <div className="w-[10%] md:w-[5%] text-center">
                {order.user ? (
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setUserDiv("fixed");
                      setUserDivData(order.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                ) : (
                  <div className="text-gray-500 text-sm">Admin</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
