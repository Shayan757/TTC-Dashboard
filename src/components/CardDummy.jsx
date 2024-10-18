import React from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useRouter } from 'next/navigation';
import { StarIcon } from 'lucide-react';
import dummyImage from '../app/assets/dummyImage.webp'
import Image from 'next/image';
const cacheName = 'profile-cache';

const CardDummy = ({ profiles }) => {
    const router = useRouter();

    const saveToCache = async (profile) => {
        localStorage.setItem(cacheName, JSON.stringify(profile));
        router.push(`/user/hireTradesperson/profile`);
    };

    const sendEmail = (profile) => {
        const subject = encodeURIComponent('Regarding your profile');
        const body = encodeURIComponent(`Hi ${profile.firstName},\n\nI found your profile on our platform and would like to get in touch.\n\nBest regards,\n[Your Name]`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="grid gap-4">
            {profiles.map(profile => (
                <Card key={profile?.id} className="bg-white flex flex-col md:flex-row p-4 gap-2">
                    <div className="">
                        <Image src={dummyImage} alt={profile?.name} className="rounded-2xl md:w-36 md:h-24 w-full h-32 object-cover" />
                    </div>
                    <div className="flex flex-col w-full ">

                        <div className="flex flex-row justify-between items-start md:items-center">
                        <div className="flex md:flex-col flex-row justify-between w-full">
                            <h2 className="text-lg font-bold">{profile?.firstName} {profile?.lastName}</h2>
                            <div className="flex items-center gap-1">
                                <StarIcon size={15} className="text-yellow-500" />
                                <p className="text-sm">{profile.rating || 0}/5 (0 reviews)</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 hidden md:block line-clamp-2 h-9 w-fit pr-2 leading-5 ">
                                {profile?.introduction}
                            </p>
                            </div>

                            <div className="hidden md:block md:flex flex-col gap-2 mt-2 md:mt-0">
                                <Button
                                    onClick={() => { sendEmail(profile.email) }}
                                    variant="default"
                                    className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100"
                                >
                                    Contact
                                </Button>
                                <Button onClick={() => saveToCache(profile)} variant="outline">View Profile</Button>
                            </div>
                        </div>

                        <div className="block md:hidden flex flex-row gap-2 mt-2 md:mt-0">
                            <Button
                                onClick={() => { sendEmail(profile.email) }}
                                variant="default"
                                className="bg-yellow-500 text-black hover:bg-yellow-600 hover:text-yellow-100 w-1/2"
                            >
                                Contact
                            </Button>
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
            ))}
        </div>
    );
};

export default CardDummy;
