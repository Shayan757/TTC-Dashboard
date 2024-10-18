import { NextResponse } from 'next/server';

const base_Uri = process.env.NEXT_PUBLIC_BASE_URL;

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
        const response = await fetch(`${base_Uri}/dashboard-jobs`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        
        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}


export async function PATCH(request) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return NextResponse.json({
            success: false,
            message: 'Authorization token is missing.',
        }, { status: 401 });
    } 

    try {
        const response = await fetch(`${base_Uri}/dashboard-jobs`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        
        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
