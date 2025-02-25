import React from 'react'
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server'

const Header = async () => {
    const { userId } = await auth();
    const user = await currentUser();
    let username = null;
    if (user) {
        username = user?.username;
    }

    return (
        <>
            <nav className="flex justify-between items-center w-full max-w-6xl p-6">
                <h1 className="text-2xl font-bold"><Link href='/' >Assistly - AI Chatbot</Link></h1>
                <ul className="flex space-x-6">
                    <li>Features</li>
                    <li>Use Cases</li>
                    <li>Pricing</li>
                    <li><Link href='contactUs' >Contact Us</Link></li>
                    <>
                        {!userId && (
                            <><Link href='sign-in'>Sign In </Link>
                                <Link href='sign-up'>Sign Up</Link></>
                        )}
                        {userId && (
                            <><span className="font-medium">Welcome, {username}</span>
                                <UserButton afterSignOutUrl='/' /></>
                        )}
                    </>
                </ul>
            </nav>
        </>
    );
}

export default Header