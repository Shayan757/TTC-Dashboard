import { NextResponse } from 'next/server';

const base_Uri = process.env.NEXT_PUBLIC_BASE_URL;
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(request) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return NextResponse.json({
            success: false,
            message: 'Authorization token is missing.',
        }, { status: 401 });
    }    
    

    try {
        const { email, id } = await request.json();

        if (!email || !id) {
            return NextResponse.json({
                success: false,
                message: 'Email or ID is missing.',
            }, { status: 400 });
        }

        const response = await fetch(`${base_Uri}/send-link-forget-pwd`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email, id }),
        });

        if (!response.ok) {
            throw new Error(`Failed to send email. Status: ${response.status}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Verification email sent successfully.',
        }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);

        return NextResponse.json({
            success: false,
            message: 'Failed to send email.',
            error: error.message,
        }, { status: 500 });
    }
}
