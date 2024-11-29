"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getUserDetails } from "../../../../actions/auth";
import Spinner from "../../../../components/Spinner"; // Assumed spinner component
import { MoveRight } from 'lucide-react';
import  JobDetails  from "../jobs/job-detail/[id]/page";

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To handle errors
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserDetails();
      const effectiveUserId = user?.id;
      if (!effectiveUserId) {
        throw new Error("No valid user ID");
      }

      const response = await fetch("/api/get-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }

      const data = await response.json();
      if (data.data.success) {
        let incomplete = data.data.incompleteJobs;
        let complete = data.data.completedJobs;
        const result = complete.concat(incomplete); // Combine completed and incomplete jobs
        setData(result);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => data.slice(indexOfFirstItem, indexOfLastItem), [data, indexOfFirstItem, indexOfLastItem]);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length]);

  // Pagination handlers
  const handlePrevPage = useCallback(() => setCurrentPage((prev) => Math.max(prev - 1, 1)), []);
  const handleNextPage = useCallback(() => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), [totalPages]);
  const handlePageClick = useCallback((pageNum) => setCurrentPage(pageNum), []);

  // Handle view details
  const handleViewDetails = (job) => {
    setSelectedJob(job); // Set the selected user
  };


  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Spinner /> // Spinner component shown while data is loading
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : selectedJob ? (
        < JobDetails job={selectedJob} />

      ) : (
        <div className="overflow-x-auto rounded-lg bg-white">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 rounded-t-lg">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Job Type</th>
                <th className="px-6 py-3 text-left">Postcode</th>
                <th className="px-6 py-3 text-left">Date Posted</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="px-6 py-4">{job.id}</td>
                  <td className="px-6 py-4">{job.service.type}</td>
                  <td className="px-6 py-4">{job.job.postcode}</td>
                  <td className="px-6 py-4">{new Date(job.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full ${
                      job.isCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {job.isCompleted ? "Complete" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                   <MoveRight
                   
                   onClick={() => handleViewDetails(job)}
                       
                   
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
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
