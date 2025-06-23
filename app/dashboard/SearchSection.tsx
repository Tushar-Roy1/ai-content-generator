import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({onseSearchInput}:any) => {
  return (
    <div className='p-10 items-center bg-gradient-to-br from bg-purple-400 via bg-purple-800 to to-blue-700 flex justify-center flex-col text-white'>
        <h2 className='font-bold text-3xl'>Browse All Templates</h2>
        <p>What would You Like to Create Today!!</p>

        <div className='w-full flex justify-center '>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[60%]'>
                <Search className='text-primary'/>
                <input type="text" placeholder='Search' 
                onChange={(event)=>onseSearchInput(event.target.value)}
                className='bg-transparent outline-none text-black' />
            </div>
        </div>
    </div>
  )
}

export default SearchSection