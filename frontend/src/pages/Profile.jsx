import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/Profile/Sidebar'; 
import { Outlet } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const id = localStorage.getItem("id");
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
     id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-user-information`,
        { headers }
      );
      console.log("Full API response:", response);
      console.log("Response data:", response.data);
      
      setProfile(response.data);
    };
    fetch();
  }, []);
  console.log("Current profile state:", profile);
  

 
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!profile ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6 h-screen">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet context={{ profile }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

