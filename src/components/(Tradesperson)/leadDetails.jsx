'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import Badge from '../ui/badge';
import { timeAgo } from '../../utils/functions'
import { getUserDetails } from '../../actions/auth';
import Spinner from '../Spinner';
const cacheName = 'lead-cache';



const LeadDetails = ({ leadData, openModal , updateLeadCount }) => {
  const [lead, setLead] = useState(leadData);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [interested, setInterested] = useState(false);
  const [jobs, setJobs] = useState(leadData?.job);
  const [error, setError] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [revealLoading, setRevealLoading] = useState(false);

  const getUser = async (id) => {
    if (!id) return;
    const jwt = await getUserDetails();
    try {
      setLoading(true)
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt?.token}`,
         },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        // updateLeadCount(data.user.leadUsed)
      }
    } catch (error) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false)
    }
  };

  const viewStatus = async () => {
const jwt = await getUserDetails();
    if (!lead.quoteId) return;
    try {
      const response = await fetch('/api/interested', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt?.token}`,
        },
        body: JSON.stringify({ quoteId: lead?.quoteId, isViewed: true }),
      });

      const data = await response.json();

      if (data.success) {
        setInterested(data.isInterested);
      }
    } catch (error) {
      setError('Failed to fetch status data');
    }
  };

  // const handleInterested = async () => {
  //   const tradeperson = await getUserDetails();
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/interested', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json',
  //      'Authorization': `Bearer ${tradeperson?.token}`, },
  //       body: JSON.stringify({ jobId: lead?.id, tradepersonId: tradeperson.id }),
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       setInterested(!interested);
  //       viewStatus();
  //     }
  //   } catch (error) {
  //     setError('Failed to update interest status');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const sendEmail = () => {
  //   if (!lead || !user) {
  //     setError('Lead or user data is missing');
  //     return;
  //   }

  //   const subject = `Inquiry about ${lead.serviceType}`;
  //   const body = `
  //     Hello ${lead.userDetail},

  //     I am interested in the ${lead.serviceType} job you posted. 

  //     Here are the details:
  //     - Job Type: ${lead.job?.type || 'Not Provided'}
  //     - Description: ${lead.job?.description || 'Not Provided'}
  //     - Location: ${lead.postcode || 'Not Provided'}
  //     - Created At: ${new Date(lead.createdAt).toLocaleDateString() || 'Not Provided'}

  //     Thank you!
  //   `;

  //   const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  //   window.location.href = mailtoLink;
  // };

  const JobDetail = ({ job }) => {
    if (!job) {
      return <p className="text-sm text-gray-500">No job details available</p>;
    }

    return (
      <div className="mt-6 md:mt-8 space-y-4">
        {Object.entries(job).map(([key, value], index) => (
          <>
            {key == 'postcode' || key == 'services' ? '' :
              <div key={index}>
                <h2 className="text-sm font-semibold text-gray-900">{key}</h2>
                <p className="text-sm text-yellow-500">{String(value) || 'Not Provided'}</p>
              </div>}
          </>
        ))}
      </div>
    );
  };


  const JobQuestions = ({ questions }) => (
    <div className="mt-6 md:mt-8 space-y-4">
      {questions?.length ? (
        questions.map((q, index) => (
          <div key={index}>
            <h2 className="text-sm font-semibold text-gray-900">{q.question}</h2>
            <p className="text-sm text-yellow-500">{q.selectedAnswer || 'No Answer Provided'}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No questions provided</p>
      )}
    </div>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const cached = leadData;
      if (cached) {
        setLead(cached);
        setJobs(cached.job || null);
        getUser(cached.userId);
      }
    };

    fetchProfile();
  }, [lead, leadData]);

  useEffect(() => {
    if (lead) {
      viewStatus();
    }
  }, [lead]);

  const validate = async () => {
    const userDetail = await getUserDetails();
 
    const tradepersonId = userDetail.id;
    const JobId = lead.id;
    // console.log(tradepersonId, JobId)
    const viewLeadResponse = await fetch('/api/view-leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${userDetail?.token}`,
       },
       
      body: JSON.stringify({ tradepersonId, JobId }),
    });
    const viewedLead = await viewLeadResponse.json();
    // console.log('Viewed Lead:', viewedLead.success);
    setReveal(viewedLead.success)
  }

  useEffect(() => {
    validate()
  }, [lead]);

  const checkReveal = async () => {
    setRevealLoading(true);

    // Fetch user details
    const user = await getUserDetails();
    if (!user || !user.id) {
      throw new Error("User details not found");
    }
  
    try {
      // Check if the user has remaining leads
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
         },
        body: JSON.stringify({ id: user.id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const count = await response.json();
      // const { user: userData } = await response.json();

      if (count.user.remaningLeads === 0) {
        // Open modal if no remaining leads
        openModal();
      } else {
        // Update lead count by PUT request
        const updateResponse = await fetch('/api/get-user', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ id: user.id }),
        });
  
        if (!updateResponse.ok) {
          throw new Error('Failed to update lead count');
        }
  
        const updateData = await updateResponse.json();
        updateLeadCount(updateData.user.leadUsed);
        
  
        // Insert the viewed lead
        const tradepersonId = user.id;
        const JobId = leadData.id;
  
        const viewLeadResponse = await fetch('/api/view-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
           },
          body: JSON.stringify({ tradepersonId, JobId }),
        });
  
        if (!viewLeadResponse.ok) {
          throw new Error('Failed to record viewed lead');
        }else{
          setReveal(true);
        }
  
        const viewedLead = await viewLeadResponse.json();
        console.log('Viewed Lead:', viewedLead);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setRevealLoading(false);
    }
  };
  


  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (


    <div style={{ height: '45rem' }} className="overflow-y-scroll p-6 md:p-8 w-full rounded-2xl bg-white">
      {isLoading ? (
        <div style={{ margin: 'auto 0' }} className='flex items-center h-full justify-center'>
          <div className="spinner-border animate-spin w-8 h-8 border-4 rounded-full border-t-yellow-500"></div>
        </div>
      ) :
        <>
          <div className="flex w-full flex-col space-y-4  md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col flex-1 md:justify-between">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold w-full text-gray-900 mb-2">
                {lead?.serviceType || 'No Service Type Provided'}
              </h1>
              <div className='flex'>
                <p className="text-sm text-gray-500 mt-0">By {lead?.userDetail || 'No User Detail Provided'}.</p>
                <div>
                  {user?.phone !== null && (
                    <div className='w-20 ml-3'>
                      <Badge type={'varified'} />
                    </div>
                  )}
                </div>

              </div>

              <div className='flex flex-col py-4'>
                <p className="text-sm text-black font-bold">
                  {!user?.email || user?.email == undefined ? 'No Email Provided' :
                    <i>{reveal ? user?.email : user?.email?.substring(0, 3) + '*****@gmail.com'}</i>
                  }
                </p>
                <p className="text-sm text-black font-bold">
                  {!user?.phone || user?.phone == undefined ? '' :
                    <i>{reveal ? user?.phone : user?.phone?.substring(0, 3) + '*****0000****'}</i>
                  }
                </p>

              </div>

              <div className="mt-2 md:mt-4 flex items-center flex-wrap space-x-2 sm:space-x-3 text-yellow-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{lead?.postcode || 'No Postcode Provided'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{timeAgo(lead?.createdAt) || 'No Date Provided'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 md:flex-col md:space-x-0 md:space-y-2 items-start md:items-end">
              {/* <button
                onClick={handleInterested}
                className={`w-full sm:w-auto ${interested ? 'bg-red-400' : 'bg-yellow-500'} text-black text-sm sm:text-base font-semibold px-4 sm:px-6 py-2 rounded-md`}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : (interested ? 'Not Interested' : 'Interested')}
              </button> */}
            {reveal ? '' :
            <>
              {revealLoading ?
                <button
                  disabled
                  className="w-full sm:w-auto bg-yellow-500 text-black text-sm sm:text-base font-semibold px-4 sm:px-6 py-2 rounded-md border border-gray-300"
                >
                  <Spinner />
                </button>
                :
                <button
                  onClick={() => checkReveal()}
                  className="w-full sm:w-auto bg-yellow-500 text-black text-sm sm:text-base font-semibold px-4 sm:px-6 py-2 rounded-md border border-gray-300"
                >
                  Reveal
                </button>
              }
            </>
            }
            </div>
          </div>

          {/* Conditionally render JobQuestions or JobDetail */}
          {lead?.job?.questions?.length ? (
            <JobQuestions questions={lead.job.questions} />
          ) : (
            <JobDetail job={jobs} />
          )}

          {/* Images Section */}
          <div className="mt-6 md:mt-8 flex gap-4">
            {lead?.job?.images?.map((img, index) => (
              <div key={index} className="relative w-24 h-24 sm:h-32 md:h-40 sm:w-32 md:w-40 bg-gray-200">
                {img ? (
                  <Image src={img} className='rounded-xl' alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-xl">No Image</div>
                )}
              </div>
            ))}
          </div>
        </>
      }

    </div>


  );
};

export default LeadDetails;
