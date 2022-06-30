import React from 'react';
import "./Table.css"

function Table({ countries, key }) {
    
  return (
    <div className='table w-full'>
      {countries.map(({ country, cases }) => {
            
         return <div key={key} className={'flex justify-between items-center px-2 '}>
           <h1 className="text-sm">{country}</h1>
           <h1 className=' text-xs font-bold'>{cases}</h1>
         </div>
      })}
    </div>
  )
}

export default Table;