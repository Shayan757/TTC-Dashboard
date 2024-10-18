import { useState } from 'react';
import { StarIcon, MapPinIcon, BriefcaseIcon, MapPin } from 'lucide-react';

const TradespersonProfile = ({ profile }) => {
    const [selectedTab, setSelectedTab] = useState('profile');

    if (!profile) {
        return <div>Loading...</div>; // Add a loading state or message if profile is not yet available
    }

    return (
        <>
            <div className="tradesperson-profile bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div className='md:flex w-full justify-between'>
                        <div className={` flex items-center  p-1 cursor-pointer hover:bg-gray-100 rounded-lg`}>
                            <div className="person-image mr-3">
                                <img src={profile?.tradepersonDetails[0]?.info.companyLogoUrl || profile?.profileUrl} className='rounded-full' alt={`${profile?.firstName} ${profile?.lastName}`} width={50} height={50} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">{profile?.tradepersonDetails[0]?.info.companyName || profile?.firstName} {profile?.tradepersonDetails[0]?.info.companyName ? '(Company)' : profile?.lastName}</h2>
                                <p className="text-gray-600">{"Main Trade " + profile?.trade || 'Tradesperson'}</p>
                            </div>


                        </div>
                        {/* <button style={{ margin: 'auto 0' }} className="bg-yellow-500 md:h-10 text-white px-4 py-2 w-full md:w-auto rounded-lg">
                            Request a Quote
                        </button> */}


                    </div>


                </div>
                <div className='flex gap-2 px-2'>
                    <div className="flex items-center text-yellow-500 mt-1">
                        <MapPinIcon className="mr-1 w-4 h-4" />
                        <span>{profile?.postcode || 'Location not provided'}</span>
                    </div>
                    <div className="flex items-center text-yellow-500 mt-1">
                        <StarIcon className="mr-1 w-4 h-4" />
                        <span className='text-gray-500' >0 Reviews</span>
                    </div>
                </div>
            </div>
            <div className="tradesperson-profile  bg-white  rounded-lg shadow-lg md:mt-2">
                <div className="">
                    <div className="flex  w-1/3">
                        <button
                            onClick={() => setSelectedTab('profile')}
                            className={`flex-1 py-2 text-center ${selectedTab === 'profile' ? 'border-yellow-500 border-b-4 text-yellow-500' : 'text-gray-600'}`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setSelectedTab('reviews')}
                            className={`flex-1 py-2 text-center ${selectedTab === 'reviews' ? 'border-yellow-500 border-b-4 text-yellow-500' : 'text-gray-600'}`}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Profile Tab Content */}
                    {selectedTab === 'profile' && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">About</h3>
                            <p className="text-gray-700 mt-2">{profile?.tradepersonDetails[0]?.info.companyDescription || profile?.introduction || 'No description provided'}</p>

                            {profile?.tradeService?.length !== 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">Services</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profile?.tradeService?.map((service, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                                                {service?.Service?.type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {profile?.tradeLocation?.length !== 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">Service Locations</h4>
                                    <div className="w-full">
                                        {profile?.tradeLocation?.map((location, index) => (

                                            <div key={index} className="mt-2 flex justify-left bg-gray-200 text-gray-700 px-3 py-2 rounded-md">

                                                <div style={{ margin: 'auto 0' }} className='pr-2'>
                                                    <MapPin />
                                                </div>
                                                <div className='text-sm'>
                                                    {location?.postcode} <p className='text-xs'> {location?.distance} Miles</p>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* <div className="mt-4">
              <h4 className="text-lg font-semibold">Locations</h4>
              {profile.companyLocation ? (
                <p className="text-gray-700 mt-1 flex items-center">
                  <BriefcaseIcon className="inline-block mr-2 w-5 h-5 text-gray-500" />
                  {profile.companyLocation}
                </p>
              ) : (
                <p className="text-gray-700 mt-1">Location not provided</p>
              )}
            </div> */}
                            {profile?.tradepersonDetails[0]?.info.portfolioUrls.length !== 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">Portfolio</h4>
                                    <div className="grid md:grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                        {profile?.tradepersonDetails[0]?.info.portfolioUrls?.map((image, index) => (
                                            <div key={index} className="relative h-32 w-full bg-gray-100 rounded-lg overflow-hidden">
                                                <img src={image} alt={`Portfolio ${index}`} className="object-cover w-full h-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reviews Tab Content */}
                    {selectedTab === 'reviews' && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Reviews</h3>
                            {profile.reviewsList?.length ? (
                                profile.reviewsList.map((review, index) => (
                                    <div key={index} className="mt-4">
                                        <p className="text-gray-700">{review.text}</p>
                                        <div className="flex items-center mt-2">
                                            <StarIcon className="text-yellow-500 w-4 h-4 mr-1" />
                                            <span>{review.rating} / 5</span>
                                        </div>
                                        <p className="text-gray-500 text-sm">{review.date}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-700 mt-2">No reviews available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TradespersonProfile;
