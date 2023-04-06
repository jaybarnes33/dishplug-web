import { useAuth } from "@/components/Context/Auth";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="mt-5 pt-5">
      <div className="mt-5">
        {!isAuthenticated && (
          <p>
            Please <Link href="/login">login</Link> to access your profile
          </p>
        )}
        {user && (
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input value={user?.displayName || " "}></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input value={user?.email || " "}></input>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input value={user?.phoneNumber || " "}></input>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
