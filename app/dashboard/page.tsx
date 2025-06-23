'use client'
import React, { useState } from 'react'
import SearchSection from './SearchSection'
import TemplatesListSection from './TemplatesListSection'
function page() {
  const [userSearchInput,setUserSearchInput]=useState<string>();

  return (
    <div>
      {/* search Section */}
      <SearchSection onseSearchInput={(value:string)=>setUserSearchInput(value)}/>
      
    

    {/* Templates */}
    <TemplatesListSection userSearchInput={userSearchInput}/>

    </div>
  )
}

export default page