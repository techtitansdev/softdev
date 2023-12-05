import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function dashboard() {
  return (
    <><div>dashboards</div>
    <div> <UserButton afterSignOutUrl='/'/></div>
    </>
  )
}
