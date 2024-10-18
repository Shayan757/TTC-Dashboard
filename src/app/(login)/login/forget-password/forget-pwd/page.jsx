'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Envilop from '../../../../assets/email.png';
import { generateToken } from '../../../../../utils/functions';

const Page = ({ searchParams }) => {
    const email = searchParams?.email || null;
    const id = searchParams?.id || null;
    const [resendTimer, setResendTimer] = useState(0);

    // Send email when component mounts and email is available
    useEffect(() => {
        if (email) {
            sendEmail();
        }
    }, [email]);

    // Countdown timer for resend functionality
    useEffect(() => {
        let timer = null;

        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [resendTimer]);

    const sendEmail = async () => {
        const token = await generateToken();

        try {
            const response = await fetch(`/api/send-link-forget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email, id }),
            });

            const data = await response.json();

            if (data.success) {
                setResendTimer(60); // Set 1-minute timer for resending
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        await sendEmail();
    };

    return (
        <div className="content max-w-7xl mx-auto w-screen px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center p-2 w-full md:p-8">
                <div className="bg-white p-6 rounded-lg w-full max-w-md border border-gray-200 text-center mb-2">
                    <Image className="mx-auto" src={Envilop} alt="envelope" />
                    <h2 className="text-2xl font-semibold">Check your email</h2>
                    <span className="flex flex-col text-sm text-gray-500">
                        <span>The link has been sent to your email address</span>
                        <span className="font-bold text-yellow-500">{email}</span>
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                        Didn’t receive the link?{' '}
                        <button
                            onClick={handleResend}
                            disabled={resendTimer > 0}
                            className={`text-black underline ${resendTimer > 0 ? 'cursor-not-allowed' : ''}`}
                        >
                            {resendTimer > 0
                                ? `Resend in ${resendTimer}s`
                                : 'Resend'}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Page;
