import React from 'react'

function InfoCard({title,cases,total, theme}) {
    return (
        <div className='min-w-max w-40 p-4 mx-2 my-5 rounded-md bg-white shadow-lg shadow-black flex flex-col '>
            <h1 className={'text-lg ' + theme}>{title}</h1>
              <h2 className='font-bold my-2'>{cases} <span className='font-medium'>[Today]</span></h2>
            <h2 className='text-base text-indigo-800'>{total}</h2>
        </div>
  )
}

export default InfoCard;