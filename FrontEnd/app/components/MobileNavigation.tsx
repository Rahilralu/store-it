"use client"
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-separator';
import { navItems } from '@/constants';
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { Button } from './ui/button'
import FileUploader from './FileUploader';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const MobileNavigation = () => {
  const [open,setOpen] =  useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("Loading...");
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setUsername("Guest");
        return; 
      }

      const { data: { user } } = await supabase.auth.getUser();
      const name = user?.email ? user.email.split("@")[0] : "Guest";
      setUsername(name);
    };

    fetchUser();
  }, []); 

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout Error:", error.message)
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <header className='mobile-header'>
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="Drive App Logo"
        width={120}
        height={52}
        className='h-auto'
      />
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image 
          src="/assets/icons/menu.svg"
          alt='Search'
          width={30}
          height={30}
          className='h-auto'
          />
      </SheetTrigger>
      <SheetContent className='shad-sheet h-screen px-3'>
        <SheetHeader>
          <SheetTitle>
            <div className='header-user'>
              <Image
                src="/assets/images/avatar.png"
                alt="User Avatar"
                width={50}
                height={50}
                className='header-user-avatar'
              />
              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{username}</p>
              </div>
            </div>
            <Separator className='mb-4 bg-light-200/20'/>
          </SheetTitle>
          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
               {navItems.map(({url , name , icon }) => (
                    <Link key={name} href={url} className='lg:w-full'>
                        <li className={cn("mobile-nav-item",pathname===url && "shad-active")}>
                            <Image 
                                src={icon} 
                                alt={`${name} Icon`}
                                width={24}
                                height={24}
                                className={cn("nav-icon",
                                    pathname===url && "nav-icon-active"
                                )} />
                            <p>{name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
          </nav>
          <Separator className='my-5 bg-light-200/20' />
          <div className='flex flex-col justify-between gap-5 pb-5'>
            <FileUploader /> 

            <Button type="submit" className='mobile-sign-out-button' onClick={async () => await logout()}>
                    <Image 
                        src="/assets/icons/logout.svg" 
                        alt="Sign Out" 
                        width={24} 
                        height={24}
                        />
                      <p>LogOut</p>
                </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>

    </header>
  )
}

export default MobileNavigation