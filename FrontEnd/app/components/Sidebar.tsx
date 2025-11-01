"use client";
import Link from 'next/link';
import React, { use } from 'react'
import Image from 'next/image';
import { navItems } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const Sidebar = () => {
    const pathname = usePathname();
    
    const [username, setUsername] = useState("Loading...");

    useEffect(() => {
    const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
        setUsername("Guest");
        return; // stop here if user not logged in
        }

        const { data: { user } } = await supabase.auth.getUser();
        const name = user?.email ? user.email.split("@")[0] : "Guest";
        setUsername(name);
    };

    fetchUser();
    }, []);




  return (
    <aside className='sidebar'>
        <Link href="/">
            <Image 
                src="/assets/icons/logo-full-brand.svg" 
                alt="Drive App Logo" 
                width={160} 
                height={50} 
                className='hidden h-auto lg:block'/>


            <Image  
                src="/assets/icons/logo-brand.svg" 
                alt="Drive App Logo"
                width={52}
                height={52}
                className='lg:hidden h-auto w-12'/>
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex-1 flex-col gap-6'>
                {navItems.map(({url , name , icon }) => (
                    <Link key={name} href={url} className='lg:w-full'>
                        <li className={cn("sidebar-nav-item",pathname===url && "shad-active")}>
                            <Image 
                                src={icon} 
                                alt={`${name} Icon`}
                                width={24}
                                height={24}
                                className={cn("nav-icon",
                                    pathname===url && "nav-icon-active"
                                )} />
                            <p className='hidden lg:block'>{name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>

        <Image 
            src="/assets/images/files-2.png"
            alt='logo'
            width={508}
            height={418}
            className='w-full'
             />

        <div className='sidebar-user-info'>
            <Image 
                src="/assets/images/avatar.png"
                alt='User Avatar'
                width={40}
                height={40}
                className='w-10 h-10 rounded-full'
            />
            <div className='user-details'>
                <p className='user-email'>{username}</p>
            </div>
        </div>

    </aside> 
  );
}

export default Sidebar