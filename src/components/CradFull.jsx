'use client';
import React, { useEffect, useState } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useRouter } from 'next/navigation';
import { StarIcon } from 'lucide-react';
import userImage from '../app/assets/userImage.png'
import Image from 'next/image';
import {getUserDetails} from '../actions/auth'

const cacheName = 'profile-cache';

const CardFull = ({ profiles }) => {
    const router = useRouter();

    const saveToCache = async (profile) => {
        localStorage.setItem(cacheName, JSON.stringify(profile));
        router.push(`/user/hireTradesperson/profile`);
    };


    return (
        <div className="grid gap-4">
            {profiles.map(profile => {
                const [status, SetStatus] = useState(profile?.quote?.requested)
                const [isViewed, setIsViewed] = useState(profile?.quote?.isViewed)
                const [isLoading, SetisLoading] = useState(false)
                const reqeust = async (data) => {
                    SetisLoading(true)
                    const jwtuser = await getUserDetails();
                    try {
                        const Response = await fetch('/api/quote', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwtuser?.token}`,
                             },
                            cache: "no-cache",
                            body: JSON.stringify({ userId: data?.userId, tradepersonId: data?.tradepersonId, jobId: data?.jobId }),
                        });

                        const Result = await Response.json();
                        
                        SetStatus(Result?.quote?.requested)
                        SetisLoading(false)
                    } catch (error) {
                        SetisLoading(false)
                    }
                }
                return (
                    <Card key={profile?.id} className="bg-white flex flex-col md:flex-row p-4 gap-2">
                        <div className="">
                            <Image height={100} width={100} src={profile?.tradepersonDetails[0]?.info.companyLogoUrl || profile?.profileUrl || userImage} alt={profile?.name || '!'} className="rounded-2xl md:w-36 md:h-24 w-full h-32 object-cover" />
                        </div>
                        <div className="flex flex-col w-full ">

                            <div className="flex flex-row justify-between items-start md:items-center">
                                <div className="flex md:flex-col flex-row justify-between w-full">
                                    <h2 className="text-lg font-bold">{profile?.tradepersonDetails[0]?.info.companyName || profile?.firstName} {profile?.tradepersonDetails[0]?.info.companyName ? '(Company)' : profile?.lastName}</h2>
                                    <div className="flex items-center gap-1">
                                        <StarIcon size={15} className="text-yellow-500" />
                                        <p className="text-sm">{profile?.rating || 0}/5 (0 reviews)</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 hidden md:block line-clamp-2 h-9 w-fit pr-2 leading-5 ">
                                        {profile?.tradepersonDetails[0]?.info.companyDescription || profile?.introduction}
                                    </p>
                                </div>

                                <div className="hidden md:block md:flex flex-col gap-2 mt-2 md:mt-0">
                                    {isLoading ?
                                        <Button
                                            variant="default"
                                            className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100"
                                        >
                                            Loading...
                                        </Button> :
                                        <>
                                            {isViewed ?
                                                <Button
                                                    variant="default"
                                                    className="cursor-default hover:bg-white bg-white text-yellow-500 border border-yellow-500"
                                                >
                                                    &nbsp; Viewed &nbsp;&nbsp;
                                                </Button>
                                                :
                                                <>
                                                    {status ?
                                                        <>

                                                            <Button
                                                                onClick={() => { reqeust(profile.quote) }}
                                                                variant="default"
                                                                className="bg-yellow-800 text-white hover:bg-yellow-600 hover:text-yellow-100"
                                                            >
                                                                &nbsp; Pending..&nbsp;&nbsp;
                                                            </Button>
                                                        </>
                                                        :
                                                        <Button
                                                            onClick={() => { reqeust(profile.quote) }}
                                                            variant="default"
                                                            className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100"
                                                        >
                                                            Contact Me
                                                        </Button>
                                                    }
                                                </>
                                            }
                                        </>
                                    }

                                    <Button onClick={() => saveToCache(profile)} variant="outline">View Profile</Button>
                                </div>
                            </div>

                            <div className="block md:hidden flex flex-row gap-2 mt-2 md:mt-0">
                                {isLoading ?
                                    <Button
                                        variant="default"
                                        className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100 w-1/2"
                                    >
                                        Loading...
                                    </Button> :
                                    <>
                                        {isViewed ?
                                            <Button
                                                variant="default"
                                                className="cursor-default hover:bg-white bg-white text-yellow-500 border border-yellow-500 w-1/2"
                                            >
                                                Viewed
                                            </Button>
                                            :
                                            <>
                                                {status ?
                                                    <Button
                                                        onClick={() => { reqeust(profile.quote) }}
                                                        variant="default"
                                                        className="bg-yellow-800 text-white hover:bg-yellow-600 hover:text-yellow-100 w-1/2"
                                                    >
                                                        Pending..
                                                    </Button> :
                                                    <Button
                                                        onClick={() => { reqeust(profile.quote) }}
                                                        variant="default"
                                                        className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100 w-1/2"
                                                    >
                                                        Contact Me
                                                    </Button>
                                                }
                                            </>
                                        }
                                    </>
                                }
                                <Button className='w-1/2' onClick={() => saveToCache(profile)} variant="outline">View Profile</Button>
                            </div>
                            {/* <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                            <p className="text-sm font-bold">{profile?.distance} Miles away</p>
                            <div className="flex items-center gap-1">
                                <StarIcon className="text-yellow-500" />
                                <p className="text-sm">{profile.rating || 0}/5 (0 reviews)</p>
                            </div>
                            <p className="text-sm">{profile?.jobSuccess || 0}% Job Success</p>
                        </div> */}
                            {/* {profile?.tradeService?.length !== 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {profile?.tradeService?.map((skill, index) => (
                                <Badge key={index} variant="default">{skill.Service.type}</Badge>
                            ))}
                        </div>
                        )} */}

                        </div>
                    </Card>
                )
            })}
        </div>
    );
};

export default CardFull;