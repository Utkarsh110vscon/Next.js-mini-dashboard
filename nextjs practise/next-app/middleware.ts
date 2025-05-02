import { NextResponse, NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    console.log('in the middleware!');
    try {
        const token = request.cookies.get('token')?.value;
        console.log(token);
        const result = await fetch(`http://localhost:3001/check?userToken=${token}`);
        if (result.status === 400) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    } catch (error) {
        console.log('error in checking authentication');
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/','/addData']
}