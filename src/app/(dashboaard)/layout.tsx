import React from "react";

const DashboardLayout = ({
  user,
  admin,
  provider,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const userInfo = {
    role: "user",
  };
  return (
    <main>
      {userInfo.role === "user" && user}
      {userInfo.role === "admin" && admin}
      {userInfo.role === "provider" && provider}
    </main>
  );
};

export default DashboardLayout;
