"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import FileUploader from './FileUploader'
import Search from './Search'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey)

const Header = () => {
  const router = useRouter()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout Error:", error.message)
    } else {
      router.push('/sign-in')
    }
  }

  return (
    <header className="header">
      <Search />

      <div className="header-wrapper">
        <FileUploader />
        <Button
          type="button"
          className="sign-out-button"
          onClick={async() => logout}
        >
          <Image 
            src="/assets/icons/logout.svg"
            alt="Sign Out"
            width={24}
            height={24}
            className="w-6"
          />
        </Button>
      </div>
    </header>
  )
}

export default Header
