'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../actions/auth';
import { Edit3 } from 'lucide-react';
import { useRouter ,usePathname } from 'next/navigation';
import { Button } from './ui/button';

const cacheName = 'detail-cache';

const JobCard = ({ job, isCompleted }) => {
  
  const [serviceTitle, setService] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [data, setData] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const saveToCache = async (data) => {
    localStorage.setItem(cacheName, JSON.stringify(data));
  };


  // const interestedCall = async () => {
  // const getuser = await getUserDetails();
  // setUser(getuser);

  // let data = {
  //   service : serviceData,
  //   job : job,
  //   isCompleted : isCompleted,
  //   user : getuser
  // }
  
  // }

  
  const JobDetail = ({ job }) => {
    if (!job) {
      return <p className="text-sm text-gray-500">No job details available</p>;
    }

    return (
      <div className="mt-0 hidden md:block md:mt-1 space-y-1">
        {Object.entries(job).map(([key, value], index) => (
          <>
            {key == 'postcode' || key == 'services' ? '' :
              <div className='flex gap-2' key={index}>
                <h2 className="text-sm font-medium text-gray-900">{key}</h2>
                <p className="text-sm font-medium text-yellow-500">{String(value) || 'Not Provided'}</p>
              </div>}
          </>
        ))}
      </div>
    );
  };
  const JobQuestions = ({ questions }) => (
    <div className="mt-0 hidden md:block  md:mt-1 space-y-1">
      {questions?.length ? (
        questions.map((q, index) => (
          <div className='flex gap-2' key={index}>
            <h2 className="text-sm font-medium text-gray-900">{q.question}</h2>
            <p className="text-sm font-medium text-yellow-500">{q.selectedAnswer || 'No Answer Provided'}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No questions provided</p>
      )}
    </div>
  );

  useEffect(() => {
    const getService = async () => {
      const user = await getUserDetails();
      const jobResponse = await fetch(`/api/get-service?serviceId=${job.job.services}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
         },
        cache: "no-cache",
      });

      const jobResult = await jobResponse.json();
      setServiceData(jobResult.service)
      setService(jobResult.service)
      setData(jobResult)
    }
    if (job) {
      getService();
    }
  }, [job])
  const utcDate = new Date(job?.createdAt);
  const localDateStr = utcDate.toLocaleString();


  
  const details = async () => {
    const updatedData = {
      ...data,
      job: job,
      jobData: job.job,
      jobId: job.id,
      isCompleted: isCompleted
    };
    saveToCache(updatedData)
  }

  const switchToEdit = async () => {
    details()
    router.push(`/user/myjobs/details`);
  }

  const switchTradeList = async () => {
    details()
    router.push(`/user/hireTradesperson?tradeService=${serviceTitle?.type}&&trade=${serviceData?.mainTrade?.type}`)
  }
  const switchQuotesList = async () => {
    details()
    router.push(`/user/quotes?tradeService=${serviceTitle?.type}&&trade=${serviceData?.mainTrade?.type}`)
  }

  return (
    <div className="w-full mx-auto p-6 my-5 bg-white hover:border border-yellow-500  rounded-lg shadow-md">

      <>

        <div className='md:flex justify-between'>
          <h2 className="md:text-2xl text-sm font-semibold text-gray-800 flex">{serviceTitle?.type}
           {pathname == '/user/myjobs' && (
             <div style={{ margin: 'auto 0' }} className='cursor-pointer pb-2 px-1 ' onClick={()=>{switchToEdit()}} >
              <Edit3 size={20} color='#a3a3a3' />
            </div>
            )}
          </h2>

          {isCompleted ? (
            <h6 className='text-green-500 text-xs'><i>Completed</i></h6>
          ) : (
            <div className='hidden md:block '>
          {pathname === '/user/hireTradesperson' ? (
                // <Button
                //     onClick={() => switchQuotesList()}
                //     className="bg-transparent hover:bg-transparent border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-500"
                // >
                //     &nbsp;&nbsp;&nbsp;&nbsp;View Quotes&nbsp;&nbsp;&nbsp;
                // </Button>
                ''
            ) : pathname === '/user/quotes' || pathname === '/user/myjobs' ? (
                <Button onClick={() => switchTradeList()} className="bg-yellow-500 hover:bg-yellow-800">
                    View Tradespersons
                </Button>
            ) : (
                ''
            )}
            
            </div>
          )}
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-between text-sm w-96'>
            <p className="text-gray-600 mt-1"><b> Postal Code:</b>  {job?.job?.postcode}</p>
            <p className="text-gray-600 mt-1"><b>Posted:</b>  {localDateStr}</p>
          </div>
          {isCompleted ? (
            ''
          ) : (
            <div className='mt-1 hidden md:block '>
               {pathname == '/user/myjobs' ? (
              // <Button  onClick={()=>{switchQuotesList()}}  className='bg-transperent hover:bg-transperent border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-500 '>
              // &nbsp; &nbsp; &nbsp; &nbsp;View Quotes &nbsp; &nbsp; &nbsp;
              // </Button>
              ''
            ):(
           ''
            )}
            
            </div>
          )}



        </div>
<div className='block md:hidden w-full mt-1'>
          {pathname === '/user/hireTradesperson' ? (
                // <Button
                //     onClick={() => switchQuotesList()}
                //     className="bg-transparent hover:bg-transparent w-full border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-500"
                // >
                //     &nbsp;&nbsp;&nbsp;&nbsp;View Quotes&nbsp;&nbsp;&nbsp;
                // </Button>
                ''
            ) : pathname === '/user/quotes' || pathname === '/user/myjobs' ? (
                <Button onClick={() => switchTradeList()} className="bg-yellow-500 w-full hover:bg-yellow-800">
                    View Tradespersons
                </Button>
            ) : (
                ''
            )}
            
            </div>
            {isCompleted ? (
            ''
          ) : (
            <div className='mt-1 block md:hidden w-full'>
               {pathname == '/user/myjobs' ? (
              // <Button  onClick={()=>{switchQuotesList()}}  className='bg-transperent w-full hover:bg-transperent border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-500 '>
              // &nbsp; &nbsp; &nbsp; &nbsp;View Quotes &nbsp; &nbsp; &nbsp;
              // </Button>
              ''
            ):(
           ''
            )}
            
            </div>
          )}

        {job?.interestedTradepersons.length > 0 ?

          <>
            {/* <Link href={`/user/interestedTradesperson?tradepersons=${JSON.stringify(job.interestedTradepersons)}`}>
              <div className="flex mt-4 p-4 bg-gray-100 rounded-md " >
                <div className="text-yellow-500 font-large md:text-3xl">
                  0{job?.interestedTradepersons.length} &nbsp;
                </div>
                <div style={{ margin: 'auto 0' }} className='justify-center'>
                  <span className="text-black font-bold "> Tradesperson are Interested </span>
                </div>
              </div>
            </Link>
            <Link href={'/user/hireTradesperson'} >
              <div className="flex mt-4 p-4 bg-gray-100 rounded-md">
                <div className="text-yellow-500 font-medium">
                  Request a Quote&nbsp;
                </div>
                <span className="text-gray-700"> to more tradespeople to get more responses</span>
              </div>
            </Link> */}
          </>
          :
          <>
            {job?.job?.questions?.length ? (
              <JobQuestions questions={job.job.questions} />
            ) : (
              <JobDetail job={job?.job} />
            )}

          </>
          //   <p className="text-gray-700 mt-4">
          //   Suitable local tradespeople have been alerted about your job. As soon as one is interested we will let you know.
          // </p>
        }
      </>
      {/* </Link> */}


    </div>
  );
};

export default JobCard;
