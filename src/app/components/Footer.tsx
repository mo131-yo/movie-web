import React from 'react'

export const Footer = () => {
  return (
    <div className='h-70 p-15 text-white text-duruv bg-pur'>
        <div className='flex justify-between'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row gap-1'>s
                   <img src="film.png" alt="film" className='w-4 h-4 relative top-1' />
                   <p className='text-white text-4 font-bold'>White Z</p>
                </div>

                <p className='font-normal'>© 2024 Movie Z. All Rights Reserved.</p>
            </div>
            <div className='flex- flex-col gap-3'>
                <p>Contact Information</p>
                <div className='flex gap-3'>
                    <img src="message.png" alt="message" className='w-3.5 h-3.5'/>
                    <div className='flex flex-col '>
                        <p className='font-medium'>Email:</p>
                        <p>support@movieZ.com</p>
                    </div>
                </div>
                <div className='h-10 flex gap-3'>
                    <img src="phone.png" alt="phone"  className='w-3.5 h-3.5 flex justify-center items-center'/>
                    <div className='flex flex-col'>
                        <p className='font-medium'>Phone:</p>
                        <p>+976 (11) 123-4567</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 text-duruv text-white'>
                <p className='font-normal'>Follow us </p>
                <div className='font-medium flex gap-3'>
                    <p>Facebook</p>
                      <p>Instagram</p>
                      <p>Twitter</p>
                </div>
            </div>
        </div>
    </div>
  )
}
