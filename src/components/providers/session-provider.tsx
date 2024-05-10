"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'

const SessionAuthProvider = ({session, children}: {session: Session | null, children: React.ReactNode}) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default SessionAuthProvider;