"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getUserDetails } from "../../../../actions/auth";
import Image from "next/image";
import { MoveRight } from 'lucide-react';
import userImage from "../../../assets/userImage.png";
import Spinner from "../../../../components/Spinner"; // Assumed spinner component
// import { useRouter } from "next/navigation";
import  UserDetails  from "../tradespersons/tradeperson-detail/[id]/page";

const UsersPage = () => {
  // const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To handle errors
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);


  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserDetails();
      const effectiveUserId = user?.id;
      if (!effectiveUserId) {
        throw new Error("No valid user ID");
      }

      const response = await fetch("/api/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.data.success) {
        setData(data.data.usersWithRole2);
      }
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => data.slice(indexOfFirstItem, indexOfLastItem), [data, indexOfFirstItem, indexOfLastItem]);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length]);

  // Pagination handlers
  const handlePrevPage = useCallback(() => setCurrentPage((prev) => Math.max(prev - 1, 1)), []);
  const handleNextPage = useCallback(() => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), [totalPages]);
  const handlePageClick = useCallback((pageNum) => setCurrentPage(pageNum), []);

  // const handleViewDetails = (user) => {
  //   router.push(`/dashboard/tradeperson-detail/${user.id}?user=${encodeURIComponent(JSON.stringify(user))}`);
  // };

     // Handle view details
     const handleViewDetails = (user) => {
      setSelectedUser(user); // Set the selected user
    };
  
  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Spinner /> // Spinner component shown while data is loading
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : 

      selectedUser ? (
        <UserDetails user={selectedUser} />

      ) :
       ( <div className="overflow-x-auto bg-white rounded-lg">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Phone Number</th>
                <th className="px-6 py-3 text-left">Post Code</th>
                <th className="px-6 py-3 text-left">Trade</th>
                <th className="px-6 py-3 text-left">Subscription</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4 flex items-center">
                  {user.profileUrl ?
                    <img
                    src={user.profileUrl}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />:
                  <Image
                      src={user.profileUrl || userImage}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  }
                    <div>
                      <p>{user.firstName ? `${user.firstName} ${user.lastName}` : "Unknown!"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.postcode}</td>
                  <td className="px-6 py-4">{user.trade}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.SubscriptionType.type === "Gold"
                          ? "bg-[#eab308] text-white"
                          : user.SubscriptionType.type === "Silver"
                          ? "bg-[#52525b] text-white"
                          : user.SubscriptionType.type === "Free"
                          ? "bg-[#65a30d] text-white"
                          : user.SubscriptionType.type === "Bronze"
                          ? "bg-[#ca8a04] text-white"
                          : user.SubscriptionType.type === "Deactivate"
                          ? "bg-white text-gray-400"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      {user.SubscriptionType.type === "Deactivate" ? 'Not Subscribed' : user.SubscriptionType.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                   <MoveRight
                   
                   onClick={() => handleViewDetails(user)}
                       
                   
                   />
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && data.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
            aria-label="Previous Page"
          >
            Previous
          </button>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                aria-current={currentPage === index + 1 ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
