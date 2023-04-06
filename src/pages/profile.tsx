import { useAuth } from "@/components/Context/Auth";
import Input from "@/components/Core/Input";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="mt-5 pt-5 min-h-[70vh]">
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
              <Input value={user?.displayName || " "}></Input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input value={user?.email || " "}></Input>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <Input value={user?.phoneNumber || " "}></Input>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
