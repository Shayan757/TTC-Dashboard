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
        // Extract ID from the request body
        const { id } = await request.json();

        // Validate if ID is present
        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'ID is required in the request body.',
            }, { status: 400 });
        }

        // Fetch user data from the backend
        const response = await fetch(`${base_Uri}/get-user`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();

        const user = data.usersWithRole1.concat(data.usersWithRole2).find(u => u.id === parseInt(id));

        if (!user) {
            return NextResponse.json({
              success: false,
              message: 'User not found.',
            }, { status: 404 });
          }



        return NextResponse.json({
            success: true,
             
            user,
        }, { status: 200 });
 

    }

     catch (error) {
                return NextResponse.json({
                    success: false,
                    error: error.message,
                }, { status: 500 });
            }
        }

