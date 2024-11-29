
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






"use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../assets/userImage.png";

import { useRouter } from "next/navigation";
import Image from "next/image";
import userImage from "../../../../../assets/userImage.png"


const UserDetails = ({ user }) => {
  const router = useRouter();
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


  if (!user) {
    return <div className="text-red-500">User details not provided.</div>;
  }

  
  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="text-gray-500 mb-3">
        &larr; Back
      </button>
      <div className="flex items-center bg-white shadow-md rounded-lg p-6">
        <Image
          src={user?.profileUrl || userImage}
          alt="User Image"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
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
        {/* <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p> */}
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


        ))}

          {/* Job Posts */}
  <div className="space-y-4">
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
  </div>
</div>

      </div>
  );
};

export default UserDetails;







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
