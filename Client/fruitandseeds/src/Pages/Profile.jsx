import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data.user);
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold">مرحبًا، {user.email}</h2>
        </div>
      ) : (
        <p>جار التحميل...</p>
      )}
    </div>
  );
};

export default Profile;
