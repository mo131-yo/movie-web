import React from 'react';
import { Badge } from "@/app/ui/Badge"
import { Input } from '../ui/Input';

export const Header = () => {
  const variantType: "default" | "outline" | "secondary" | "destructive" = "outline";
  return (
    <div className='h-14.75 w-full pr-16 pl-16 flex justify-between items-center '>
      <div className='flex flex-row w-100 justify-center gap-3' >
          <img src="Vector.png" alt="vector" className='w-4 h-4 flex relative top-1' />
          <p className='text-indigo-700 text-4 font-bold'>Movie Z</p>
      </div>
      <div className='w-full flex justify-center'>
         <Badge variant={variantType}  className='w-24.25 h-9'>Genre</Badge>
         <Input type='search' placeholder='Хайх'></Input>
      </div>
      <img src="icon.png" alt="icon" className='w-9 h-9 ' />
    </div>
  )
}
