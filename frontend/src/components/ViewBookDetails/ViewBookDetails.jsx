import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
import {Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";


import { useSelector } from 'react-redux';

const ViewBookDetails = () => {
    const {id} = useParams();
    const [Data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      console.log(response);
      setData(response.data.data);
      setLoading(false);
    };
    fetch();
  }, []);

  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid: id,
};

const handleFavourite = async () => {
  const response = await axios.put(
    "http://localhost:1000/api/v1/add-book-to-favourite",
    {},
    { headers }
  );
  alert(response.data.message);
};

const handleCart = async () => {
  const response = await axios.put(
    "http://localhost:1000/api/v1/add-to-cart",
    {},
    { headers }
  );
  alert(response.data.message);
};


const deleteBook = async () => {
  const response = await axios.delete(
    "http://localhost:1000/api/v1/delete-book",
    { headers }
  );
  alert(response.data.message);
  navigate("/all-books");
};

  return (
    <>
      {Data && (
        <div className='px-12 py-8 bg-zinc-900 flex gap-8'>
      <div className=' w-full lg:w-3/6 '>
      {" "}
      <div className='bg-zinc-800 rounded py-12 flex justify-around'>
        {" "}
        <img src={Data.url} alt='/' className='h-[70vh]'/>
      {isLoggedIn === true && role === "user" && (
        <div className=' flex md:flex-col'>
        <button className='bg-white rounded-full text-3xl p-2 text-red-500' 
        onClick={handleFavourite }>
          <FaHeart />
        </button>
        <button className='bg-white rounded-full text-3xl p-2 mt-4 text-blue-500'
        onClick={handleCart}>
          <FaShoppingCart />
        </button>
      </div>
      )}

      {isLoggedIn === true && role === "admin" && (
        <div className=' flex md:flex-col'>
        <Link to={`/updateBook/${id}`} className='bg-white rounded-full text-3xl p-2 text-red-500'><FaEdit /></Link>
        <button className='bg-white rounded-full text-3xl p-2 mt-4 text-blue-500'
          onClick={deleteBook}
        ><MdOutlineDelete />
        </button>
      </div>
      )}

      </div>
        </div>
      <div className='p-4 w-3/6'>
        <h1 className='text-4x1 text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='text-zinc-500 mt-4 text-x1'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className='me-3'/>{Data.language}
        </p>
        <p className='mt-4 text-zinc-100 text-3x1 font-semibold'>Price : $ {Data.price}{" "}</p>
      </div>
    </div>
      )}
      { !Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
    </>
  )
}

export default ViewBookDetails
