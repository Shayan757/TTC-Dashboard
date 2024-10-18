'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { getUserDetails } from '../../actions/auth';
import { toast } from "react-toastify";
const TradepersonsSubscription = ({ SubscriptionType }) => {
    const [FreeLoading, setFreeLoading] = useState(false);
    const [StanderdLoading, setStanderdLoading] = useState(false);
    const [PremiumLoading, setPremiumLoading] = useState(false);
    const [GoldLoading, setGoldLoading] = useState(false);
    const [isLoading, SetISLoading] = useState(false);

    const getFreeSubs = async () => {
        setFreeLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                 },
                body: JSON.stringify({ priceId: "price_1Q7frhP8YpDFslGBpa6C9qMz", token: cacheUser.token }),
            });

            if (!response.ok) {
                toast.warning('Sesson Expired Login again', {
                    position: "top-right",
                  });
                throw new Error('Sesson Expired');
            }

            const applySubs = await response.json();
            window.location.replace(applySubs.result.url)
            // console.log(applySubs.result.url)
        } catch (error) {
            console.log(error)
        } finally {
            setFreeLoading(false)
        }
    }
    const getStanderdSubs = async () => {
        setStanderdLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ priceId: "price_1Q7fsyP8YpDFslGB17IkjXWJ", token: cacheUser.token }),
            });

            if (!response.ok) {
                toast.warning('Sesson Expired Login again', {
                    position: "top-right",
                  });
                throw new Error('Sesson Expired');
            }

            const applySubs = await response.json();
            window.location.replace(applySubs.result.url)
            // console.log(applySubs.result.url)
        } catch (error) {
            console.log(error)
        } finally {
            setStanderdLoading(false)
        }
    }
    const getPremiumSubs = async () => {
        setPremiumLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ priceId: "price_1Q7fvcP8YpDFslGBsVZLGtel", token: cacheUser.token }),
            });

            if (!response.ok) {
                toast.warning('Sesson Expired Login again', {
                    position: "top-right",
                  });
                throw new Error('Sesson Expired');
            }

            const applySubs = await response.json();
            window.location.replace(applySubs.result.url)
            // console.log(applySubs.result.url)
        } catch (error) {
            console.log(error)
        } finally {
            setPremiumLoading(false)
        }
    }
    const getGoldSubs = async () => {
        setGoldLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ priceId: "price_1Q7fuyP8YpDFslGB3AnjPTaq", token: cacheUser.token }),
            });

            if (!response.ok) {
                toast.warning('Sesson Expired Login again', {
                    position: "top-right",
                  });
                throw new Error('Sesson Expired');
            }

            const applySubs = await response.json();
            window.location.replace(applySubs.result.url)
            // console.log(applySubs.result.url)
        } catch (error) {
            console.log(error)
        } finally {
            setGoldLoading(false)
        }
    }

 
    const updateFreeSubs = async () => {
        setFreeLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/getSubs-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ userId: `${cacheUser.id}` }),
            });

            const getSubs = await response.json();

            if (getSubs?.success) {
                let customerid = getSubs.subscription.customerid
                let subsID = getSubs.subscription.subsid
                const response = await fetch('/api/create-customer-portal-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cacheUser?.token}`,
                    },
                    body: JSON.stringify({ customerId: `${customerid}` }),
                });
                let res = await response.json();
                if (res.url) {
                    const updateUrl = `${res.url}/subscriptions/${subsID}/preview/price_1Q7frhP8YpDFslGBpa6C9qMz?quantity=1`;
                    window.location.replace(updateUrl);
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            // setFreeLoading(false)
        }
    }
    const updateGoldSubs = async () => {
        setGoldLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/getSubs-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ userId: `${cacheUser.id}` }),
            });

            const getSubs = await response.json();

            if (getSubs?.success) {
                let customerid = getSubs.subscription.customerid
                let subsID = getSubs.subscription.subsid
                console.log(subsID)
                const response = await fetch('/api/create-customer-portal-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cacheUser?.token}`,
                    },
                    body: JSON.stringify({ customerId: `${customerid}` }),
                });
                let res = await response.json();
                if (res.url) {
                    const updateUrl = `${res.url}/subscriptions/${subsID}/preview/price_1Q7fuyP8YpDFslGB3AnjPTaq?quantity=1`;
                    window.location.replace(updateUrl);
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            // setGoldLoading(false)
        }
    }
    const updateStanderdSubs = async () => {
        setStanderdLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/getSubs-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ userId: `${cacheUser.id}` }),
            });

            const getSubs = await response.json();

            if (getSubs?.success) {
                let customerid = getSubs.subscription.customerid
                let subsID = getSubs.subscription.subsid
                const response = await fetch('/api/create-customer-portal-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cacheUser?.token}`,
                    },
                    body: JSON.stringify({ customerId: `${customerid}` }),
                });
                let res = await response.json();
                if (res.url) {
                    const updateUrl = `${res.url}/subscriptions/${subsID}/preview/price_1Q7fsyP8YpDFslGB17IkjXWJ?quantity=1`;
                    window.location.replace(updateUrl);
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            // setStanderdLoading(false)
        }
    }
    const updatePremiumSubs = async () => {
        setPremiumLoading(true)
        let cacheUser = await getUserDetails();
        try {
            const response = await fetch('/api/getSubs-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cacheUser?.token}`,
                },
                body: JSON.stringify({ userId: `${cacheUser.id}` }),
            });

            const getSubs = await response.json();

            if (getSubs?.success) {
                let customerid = getSubs.subscription.customerid
                let subsID = getSubs.subscription.subsid
                const response = await fetch('/api/create-customer-portal-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cacheUser?.token}`,
                    },
                    body: JSON.stringify({ customerId: `${customerid}` }),
                });
                let res = await response.json();
                if (res.url) {
                    const updateUrl = `${res.url}/subscriptions/${subsID}/preview/price_1Q7fvcP8YpDFslGBsVZLGtel?quantity=1`;
                    window.location.replace(updateUrl);
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            // setPremiumLoading(false)
        }        
    }

    // const cancelSubs = async () => {
    //     setStanderdLoading(true)
    //     setGoldLoading(true)
    //     let cacheUser = await getUserDetails();
    //     try {
    //         const response = await fetch('/api/getSubs-user', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${cacheUser?.token}`, },
    //             body: JSON.stringify({ userId: cacheUser.id }),
    //         });

    //         const getSubs = await response.json();
    //         if (getSubs?.success) {
    //             let subsid = getSubs.subscription.subsid
    //             const response = await fetch('/api/cancel-subscription', {
    //                 method: 'DELETE',
    //                 headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${cacheUser?.token}`,},
    //                 body: JSON.stringify({ subscriptionId: subsid }),
    //             });
    //             let res = await response.json();
    //             console.log(res)
    //             if (res?.ok) {
    //                 window.location.reload();
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setStanderdLoading(false)
    //         setGoldLoading(false)
    //     }
    // }

    return (
        <div className={SubscriptionType == "Deactivate" ? 'grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-2' : 'grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2'}>

            {SubscriptionType == "Free" ? "" : // 3Leads
                <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl mt-2 md:mt-0 shadow-lg border border-gray-200">
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-semibold">Free</span>
                        {/* <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold">Current Plan</span> */}

                    </div>
                    <div className="text-3xl font-bold mb-4">£ 0.00</div>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Basic tradesperson profile visible to potential clients.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Receive alerts for new job postings in your area.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Allow 5 leads to used per month in free plan.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Collect and display client reviews and ratings.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Standard customer support via email or Chat.</p>
                        </div>
                    </div>
                    <>
                        {SubscriptionType !== "Deactivate"
                            ?
                            <button type='button' onClick={updateFreeSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{FreeLoading ? 'Loading..' : 'Update Plan'} </button>
                            :
                            <button type='button' onClick={getFreeSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{FreeLoading ? 'Loading..' : 'Get Plan'}  </button>
                        }
                    </>
                </div>
            }
            {SubscriptionType == "Bronze" ? "" : // 10Leads
                <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl mt-2 md:mt-0 shadow-lg border border-gray-200">
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-semibold">Bronze</span>

                        {/* <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold">Current Plan</span> */}

                    </div>
                    <div className='flex '>
                        <div className="text-3xl font-bold mb-4">£ 9.99 </div>
                        <span className='text-sm mt-2 text-gray-400'>/month</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Basic tradesperson profile visible to potential clients.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Receive alerts for new job postings in your area.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Allow 15 leads to used per month in bronze plan.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Collect and display client reviews and ratings.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Standard customer support via email or Chat.</p>
                        </div>
                    </div>
                    {StanderdLoading ?
                        <button type='button' disabled className="w-full py-2 px-4 bg-gray-300 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" > Loading... </button>
                        :
                        <>
                             {SubscriptionType !== "Deactivate"
                                ?
                                <button type='button' onClick={updateStanderdSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{StanderdLoading ? 'Loading...' : 'Update Plan'} </button>
                                :
                                <>
                                    <button type='button' onClick={() => getStanderdSubs()} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" > {StanderdLoading ? 'Loading...' : 'Get Plan'} </button>
                                </>
                            }
                        </>
                    }


                </div>
            }

            {SubscriptionType == "Silver" ? "" : // 50Leads
                <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl mt-2 md:mt-0 shadow-lg border border-gray-200">
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-semibold">Silver</span>

                        {/* <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold">Current Plan</span> */}

                    </div>
                    <div className='flex '>
                        <div className="text-3xl font-bold mb-4">£ 14.99 </div>
                        <span className='text-sm mt-2 text-gray-400'>/month</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Basic tradesperson profile visible to potential clients.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Receive alerts for new job postings in your area.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Allow 25 leads to used per month in silver plan.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Collect and display client reviews and ratings.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-700 text-sm">Standard customer support via email or Chat.</p>
                        </div>
                    </div>
                    {GoldLoading ?
                        <button type='button' disabled className="w-full py-2 px-4 bg-gray-300 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" > Loading... </button>
                        :
                        <>
                            {SubscriptionType !== "Deactivate"
                                ?
                                <button type='button' onClick={updateGoldSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{GoldLoading ? 'Loading...' : 'Update Plan'} </button>
                                :
                                <button type='button' onClick={() => getGoldSubs()} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" > {GoldLoading ? 'Loading...' : 'Get Plan'} </button>
                            }
                        </>
                    }
                </div>
            }
            {SubscriptionType == "Gold" ? "" : // 25Leads
                <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl mt-2 md:mt-0 shadow-lg border border-gray-200">
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-semibold">Gold</span>
                    </div>
                    <div className='flex '>
                        <div className="text-3xl text-black font-bold mb-4">£ 24.99 </div>
                        <span className='text-sm mt-2 text-gray-400'>/month</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-500 text-sm">Basic tradesperson profile visible to potential clients.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-500 text-sm">Receive alerts for new job postings in your area.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-500 text-sm">Allow 50 leads to used per month in gold plan.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-500 text-sm">Collect and display client reviews and ratings.</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                            <p className="text-gray-500 text-sm">Standard customer support via email or Chat.</p>
                        </div>
                    </div>
                    {PremiumLoading ?
                        <button type='button' disabled className="w-full py-2 px-4 bg-gray-300 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" > Loading... </button>
                        :
                        <>
                             {SubscriptionType !== "Deactivate"
                                ?
                                <button type='button' onClick={updatePremiumSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{PremiumLoading ? 'Loading...' : 'Update Plan'} </button>
                                :
                                <button type='button' onClick={getPremiumSubs} className="w-full py-2 px-4 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-5" >{PremiumLoading ? 'Loading...' : 'Get Plan'} </button>
                            }
                        </>
                    }
                </div>
            }
        </div>

    )
};
export default TradepersonsSubscription;
