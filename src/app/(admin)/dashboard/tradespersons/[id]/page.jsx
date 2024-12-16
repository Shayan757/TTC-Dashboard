// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getUserDetails } from "../../../../../actions/auth"; // Token fetching utility
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = () => {
//   const { id } = useParams(); // Get the dynamic user ID
//   const router = useRouter(); // For navigation
//   const [user, setUser] = useState(null); // User details
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error handling

//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const currentUser = await getUserDetails(); // Fetch current user details
//       const token = currentUser?.token;
//       if (!token) throw new Error("Authentication failed");

//       const response = await fetch(`/api/user-detail`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify( id ), // Send the user ID
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }

//       const data = await response.json();
//       if (data.success) {
//         setUser(data.user); // Set user details
//       } else {
//         throw new Error(data.message || "Failed to load user data");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching user details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <Image
//           src={user?.profileUrl || userImage} // Fallback to a default profile image
//           alt="User Image"
//           width={100}
//           height={100}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h2 className="text-xl px-6 font-bold">
//             {user?.firstName} {user?.lastName}
//           </h2>
//           <p className="text-gray-500">{user?.email}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
//         <p><strong>Phone Number:</strong> {user?.phone || 'N/A'}</p>
//         {/* <p><strong>City:</strong> {user?.city || 'N/A'}</p> */}
//         <p><strong>Post Code:</strong> {user?.postcode || 'N/A'}</p>
//         {/* <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p> */}
//         <p><strong>Subscription Expiry Date:</strong> {user?.subscription?.expiryDate || 'N/A'}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-bold mb-3">Jobs Posted:</h3>
//         {user?.jobs?.map((job, idx) => (
//           <div
//             key={idx}
//             className="bg-gray-100 p-4 rounded-lg shadow mb-4"
//           >
//             <p className="font-bold">{job.title}</p>
//             <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;




// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getUserDetails } from "../../../../../actions/auth"; // Token fetching utility
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png"; // Ensure this path is correct

// const UserDetails = () => {
//   const { id } = useParams(); // Get the dynamic user ID
//   const router = useRouter(); // For navigation
//   const [user, setUser] = useState(null); // User details
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error handling

//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const currentUser = await getUserDetails(); // Fetch current user details
//       const token = currentUser?.token;
      // if (!token) throw new Error("Authentication failed");

//       const response = await fetch(`/api/get-user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }), // Send the user ID as an object
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }

//       const data = await response.json();
//       if (data.success) {
//         setUser(data.data); // Assuming the API sends user data in `data`
//       } else {
//         throw new Error(data.message || "Failed to load user data");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching user details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     console.log("ID from params:", id);

//     fetchUserDetails();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <Image
//           src={user?.profileUrl || userImage} // Fallback to a default profile image
//           alt="User Image"
//           width={100}
//           height={100}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h2 className="text-xl px-6 font-bold">
//             {user?.firstName || "Unknown"} {user?.lastName || "User"}
//           </h2>
//           <p className="text-gray-500">{user?.email || "N/A"}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
//         <p><strong>Phone Number:</strong> {user?.phone || "N/A"}</p>
//         <p><strong>Post Code:</strong> {user?.postcode || "N/A"}</p>
//         <p><strong>Subscription Expiry Date:</strong> {user?.subscription?.expiryDate || "N/A"}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-bold mb-3">Jobs Posted:</h3>
//         {user?.jobs?.length > 0 ? (
//           user.jobs.map((job, idx) => (
//             <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
//               <p className="font-bold">{job.title}</p>
//               <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
//             </div>
//           ))
//         ) : (
//           <p>No jobs posted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;









// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getUserDetails } from "../../../../../actions/auth";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const currentUser = await getUserDetails();
//       const token = currentUser?.token;

//       const response = await fetch(`/api/get-user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       const data = await response.json();

//       console.log("API response data:", data);

//       if (data.success) {

        

//         console.log("Fetched user data:", data.user);
//         setUser(data.user);
//       } else {
//         throw new Error(data.message || "Failed to load user data");
//       }


//     //   if (user.success && data.data.user) {
//     //     console.log("Fetched user data:", data.data.user); // Correctly log the user
//     //     setUser(data.data.user); // Correctly update the user state
//     // } else {
//     //     throw new Error(data.message || "User not found");
//     // }
//     } catch (err) {
//       console.error("Error fetching user details:", err);
//       setError(err.message || "An error occurred while fetching user details");
//     } finally {
//       setLoading(false);
//     }

//     // fetchUserDetails();

//   }, [id]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <Image
//           src={user?.profileUrl || userImage}
//           alt="User Image"
//           width={100}
//           height={100}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h2 className="text-xl px-6 font-bold">
//             {user?.firstName || "Unknown"} {user?.lastName || "User"}
//           </h2>
//           <p className="text-gray-500">{user?.email || "N/A"}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
//         <p><strong>Phone Number:</strong> {user?.phone || "N/A"}</p>
//         <p><strong>Post Code:</strong> {user?.postcode || "N/A"}</p>
//         <p><strong>Subscription Expiry Date:</strong> {user?.subscription?.expiryDate || "N/A"}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-bold mb-3">Jobs Posted:</h3>
//         {user?.jobs?.length > 0 ? (
//           user.jobs.map((job, idx) => (
//             <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
//               <p className="font-bold">{job?.title || "Untitled Job"}</p>
//               <p className="text-sm text-gray-500">Posted on {job?.postedDate || "N/A"}</p>
//             </div>
//           ))
//         ) : (
//           <p>No jobs posted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;



// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getUserDetails } from "../../../../../actions/auth";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = () => {
//   const { id } = useParams(); // Capture the 'id' from the URL params
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     console.log("Captured ID:", id); // Log the 'id' to verify it's being passed correctly

//     try {
//       const currentUser = await getUserDetails();
//       const token = currentUser?.token;

//       console.log("Authorization token:", token); // Log the token to ensure it's being retrieved

//       const response = await fetch(`/api/get-user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }), // Log the request body
//       });

//       const data = await response.json();

//       console.log("API response data:", data); // Log the full response data from the API

//       if (data.success && data.user) {
//         console.log("Fetched user data:", data.user); // Log the specific user data
//         setUser(data.user);
//       } else {
//         throw new Error(data.message || "Failed to load user data");
//       }


    //   if (data.success) {
    //     // Combine all users from both roles and find the matching user by ID
    //     const allUsers = [...(data.usersWithRole1 || []), ...(data.usersWithRole2 || [])];
    //     const user = allUsers.find(user => user.id === parseInt(id));

    //   if (user) {
    //     console.log("Fetched user data:", user);
    //     setUser(user);
    //   } else {
    //     throw new Error("User not found.");
    //   }
    // } else {
    //   throw new Error(data.message || "Failed to load user data");
    // }


  //   } catch (err) {
  //     console.error("Error fetching user details:", err);
  //     setError(err.message || "An error occurred while fetching user details");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchUserDetails();
  // }, [fetchUserDetails]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <Image
//           src={user?.profileUrl || userImage}
//           alt="User Image"
//           width={100}
//           height={100}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h2 className="text-xl px-6 font-bold">
//             {user?.firstName || "Unknown"} {user?.lastName || "User"}
//           </h2>
//           <p className="text-gray-500">{user?.email || "N/A"}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
//         <p><strong>Phone Number:</strong> {user?.phone || "N/A"}</p>
//         <p><strong>Post Code:</strong> {user?.postcode || "N/A"}</p>
//         <p><strong>Subscription Expiry Date:</strong> {user?.subscription?.expiryDate || "N/A"}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-bold mb-3">Jobs Posted:</h3>
//         {user?.jobs?.length > 0 ? (
//           user.jobs.map((job, idx) => (
//             <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
//               <p className="font-bold">{job?.title || "Untitled Job"}</p>
//               <p className="text-sm text-gray-500">Posted on {job?.postedDate || "N/A"}</p>
//             </div>
//           ))
//         ) : (
//           <p>No jobs posted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;








// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getUserDetails } from "../../../../../actions/auth";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const currentUser = await getUserDetails();
//       const token = currentUser?.token;

//       const response = await fetch(`/api/get-userDetail`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       const data = await response.json();

//       if (data.success && data.user) {
//         setUser(data.user);
//       } else {
//         throw new Error(data.message || "Failed to load user data");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching user details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <Image
//           src={user?.profileUrl || userImage}
//           alt="User Image"
//           width={100}
//           height={100}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h2 className="text-xl px-6 font-bold">
//             {user?.firstName || "Unknown"} {user?.lastName || "User"}
//           </h2>
//           <p className="text-gray-500">{user?.email || "N/A"}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
//         <p><strong>Phone Number:</strong> {user?.phone || "N/A"}</p>
//         <p><strong>Post Code:</strong> {user?.postcode || "N/A"}</p>
//         <p><strong>Subscription Type:</strong> {user?.SubscriptionType?.type || "N/A"}</p>
//         <p><strong>Leads Remaining:</strong> {user?.remaningLeads || "N/A"}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-bold mb-3">Trade Details:</h3>
//         {user?.tradeService?.length > 0 ? (
//           user.tradeService.map((service, idx) => (
//             <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
//               <p className="font-bold">{service?.Service?.type || "Unknown Service"}</p>
//             </div>
//           ))
//         ) : (
//           <p>No trade services added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;

















 "use client";


import { useParams } from "next/navigation";

const UserDetails = () => {
  const { id } = useParams(); // Extract the dynamic 'id' from the URL

  return (
    <div className="container mx-auto p-4">
      <div className="text-lg font-bold">
        User ID: <span className="text-gray-600">{id || "Unknown"}</span>
      </div>
    </div>
  );
};

export default UserDetails;


// "use client"

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const UserDetails = () => {
//   const router = useRouter();
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // Extract the ID from the dynamic route
//     const pathSegments = router.asPath.split("/");
//     const idFromPath = pathSegments[pathSegments.length - 1];
//     setUserId(idFromPath);
//   }, [router]);

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <p className="text-sm text-gray-500">User ID: {userId}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;



// "use client";

// import { useRouter } from "next/router"; // Correct import for extracting route parameters

// const UserDetails = () => {
//   const router = useRouter();
//   const { id } = router.query; // Extract the dynamic 'id' from the route

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <p className="text-sm text-gray-500">User ID: {id}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;











// "use client"

// import { useEffect } from "react";
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = ({ user }) => {
//   const router = useRouter();
//   const { id } = router.query;


//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         try {
//           const response = await  fetch(`/api/get-user/${id}`); // Fetch data dynamically
//           if (!response.ok) {
//             throw new Error("User not found");
//           }
//           const data = await response.json();
//           setUser(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUser();
//     }
//   }, []);


//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-blue-500">
//         &larr; Back
//       </button>
//       <div className="flex items-center gap-4 my-6">
//         <Image
//           src={user?.profileUrl || userImage}
//           alt="User Image"
//           width={100}
//           height={100}
//           className="rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
//           <p className="text-gray-500">{user?.email}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
//         <p><strong>Phone Number:</strong> {user?.phone || 'N/A'}</p>
//         <p><strong>City:</strong> {user?.city || 'N/A'}</p>
//         <p><strong>Post Code:</strong> {user?.postcode || 'N/A'}</p>
//         <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p>
//       </div>
//       <div className="mt-6">
//         {user?.jobs?.map((job, idx) => (
//           <div
//             key={idx}
//             className="bg-gray-100 p-4 rounded-lg shadow mb-4"
//           >
//             <p className="font-bold">{job.title}</p>
//             <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   // Fetch user data based on ID
//   const response = await fetch(`/api/get-user/${id}`);
//   const data = await response.json();

//   return {
//     props: {
//       user: data?.user || null, // Pass user data as props
//     },
//   };
// }

// export default UserDetails;



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const UserDetails = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();
//   const { id } = useParams() // Use useParams for dynamic routing in app directory

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`/api/get-user/${id}`); // Fetch user details based on id
//           if (!response.ok) {
//             throw new Error("User not found");
//           }
//           const data = await response.json();
//           setUser(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUser();
//     }
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-blue-500">
//         &larr; Back
//       </button>
//       <div className="flex items-center gap-4 my-6">
//         <Image
//           src={user?.profileUrl || userImage}
//           alt="User Image"
//           width={100}
//           height={100}
//           className="rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-bold">
//             {user?.firstName} {user?.lastName}
//           </h2>
//           <p className="text-gray-500">{user?.email}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
//         <p>
//           <strong>Phone Number:</strong> {user?.phone || "N/A"}
//         </p>
//         <p>
//           <strong>City:</strong> {user?.city || "N/A"}
//         </p>
//         <p>
//           <strong>Post Code:</strong> {user?.postcode || "N/A"}
//         </p>
//         <p>
//           <strong>No. of Jobs Posted:</strong> {user?.jobCount || "0"}
//         </p>
//       </div>
//       <div className="mt-6">
//         {user?.jobs?.map((job, idx) => (
//           <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
//             <p className="font-bold">{job.title}</p>
//             <p className="text-sm text-gray-500">
//               Posted on {job.postedDate}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;






// "use client";


// import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png"


// const UserDetails = () => {

  // ({user})

  // const router = useRouter();
  // const { id } = router.query;

  // const { id } = params; // Extract the user ID from the params object

  // const id = router.query?.id; // Extract `id` from the dynamic route


  // const [user, setUser] = useState(searchParams?.user ? JSON.parse(searchParams.user) : null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch user data if not passed via props
  //   if (!user && params?.id) {
  //     const fetchUser = async () => {
  //       try {
  //         const response = await fetch(`/api/get-user/${params.id}`);
  //         if (!response.ok) {
  //           throw new Error("User not found");
  //         }
  //         const data = await response.json();
  //         setUser(data);
  //       } catch (err) {
  //         setError(err.message);
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [params, user]);

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  // if (!user) {
  //   return <div>Loading...</div>;
  // }


  // if (!user) {
  //   return <div className="text-red-500">User details not provided.</div>;
  // }

  // console.log(params)
  
  // return (
  //   <div className="container mx-auto p-4">
  //     <button onClick={() => router.back()} className="text-gray-500 mb-3">
  //       &larr; Back
  //     </button>
  //     <div className="flex items-center bg-white shadow-md rounded-lg p-6">
  //     {/* <p className="text-sm text-gray-500">User ID: {params.id}</p> Display user ID */}

      {/* <p className="text-sm text-gray-500">User ID: {id}</p> Display user ID */}

       {/* <p className="text-sm text-gray-500">User ID: {id}</p> Display user ID */}
        
        // <div className="text-lg font-bold">
        //    User ID: <span className="text-gray-600">{user?.id}</span>
        //  </div>


{/* 
         <Image
          src={user?.profileUrl || userImage}
          alt="User Image"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover mr-6"
        />  */}

{/* <p><strong>user id:</strong> {user.id || 'N/A'}</p> */}
        {/* <div>
           <h2 className="text-xl px-6 font-bold">{user?.firstName} {user?.lastName}</h2>
          <p className="text-gray-500">{user?.email}</p> 
          
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
         <p><strong>Phone Number:</strong> {user?.phone || 'N/A'}</p>
        <p><strong>City:</strong> {user?.city || 'N/A'}</p>
        <p><strong>Post Code:</strong> {user?.postcode || 'N/A'}</p>
        <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p>
        <p><strong>Subscription Expiry Date:</strong> {user?.subscription.type || 'N/A'}</p> 
         <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p> 
      </div>
      <div className="mt-6">
        {user?.jobs?.map((job, idx) => (
          <div
            key={idx}
            className="bg-gray-100 p-4 rounded-lg shadow mb-4"
          >
            <p className="font-bold">{job.title}</p>
            <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
          </div>


        ))} */}

          {/* Job Posts */}
  {/* <div className="space-y-4">
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <p className="font-medium">Leaking pipe in kitchen under sink</p>
      <span className="text-sm text-gray-500">Job Completed on 27 May 2024</span>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <p className="font-medium">Leaking pipe in kitchen under sink</p>
      <span className="text-sm text-gray-500">Job Completed on 27 May 2024</span>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <p className="font-medium">Leaking pipe in kitchen under sink</p>
      <p className="text-sm text-gray-500">Job Completed on 27 May 2024</p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <p className="font-medium">Leaking pipe in kitchen under sink</p>
      <span className="text-sm text-gray-500 ">Job Completed on 27 May 2024</span>
    </div>
  </div> */}
//   </div>

//        </div>
//    );
//  };

//  export default UserDetails;



// "use client"

// import { useRouter, useSearchParams } from "next/navigation";

// const UserDetails = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Get user from query parameters
//   const user = searchParams.get("selectedUser")
//     ? JSON.parse(searchParams.get("selectedUser"))
//     : null;

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <div className="text-lg font-bold">
//           User ID: <span className="text-gray-600">{user?.id || "Unknown"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;



// "use client"

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const UserDetails = () => {
//   const router = useRouter();
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // Extract the ID from the dynamic route
//     const pathSegments = router.asPath.split("/");
//     const idFromPath = pathSegments[pathSegments.length - 1];
//     setUserId(idFromPath);
//   }, [router]);

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => router.back()} className="text-gray-500 mb-3">
//         &larr; Back
//       </button>
//       <div className="flex items-center bg-white shadow-md rounded-lg p-6">
//         <p className="text-sm text-gray-500">User ID: {userId}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;






// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

// const ClientDetailPage = ({ params }) => {
//   const router = useRouter();
//   const { id } = params; // Extract the dynamic ID from the URL

//   const [user, setUser] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   // Fetch user data based on ID
//   React.useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`/api/get-user/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user details.");
//         }
//         const data = await response.json();
//         setUser(data.user);
//       } catch (err) {
//         setError(err.message || "An unknown error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchUser();
//     }
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!user) return <p>No user data found.</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <button
//         onClick={() => router.back()}
//         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//       >
//         &larr; Back
//       </button>
//       <div className="mt-4 flex items-center gap-4">
//         <Image
//           src={user.profileUrl || userImage}
//           alt="User Profile"
//           width={100}
//           height={100}
//           className="rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-bold">
//             {user.firstName} {user.lastName}
//           </h2>
//           <p className="text-gray-500">{user.email}</p>
//         </div>
//       </div>
//       <div className="mt-6 bg-white p-4 rounded-lg shadow">
//         <p>
//           <strong>Phone Number:</strong> {user.phone || "N/A"}
//         </p>
//         <p>
//           <strong>Post Code:</strong> {user.postcode || "N/A"}
//         </p>
//         <p>
//           <strong>City:</strong> {user.city || "N/A"}
//         </p>
//         <p>
//           <strong>No. of Jobs Posted:</strong> {user.jobs?.length || 0}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ClientDetailPage;
