import React from 'react'
import Content from './Content';

const index = () => {
  return (
    <div 
        className='relative h-[250px] border-t border-t-white-300 bg-black bg-opacity-90'  // Reduced height from 800px to 600px
        style={{clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+250px)] -top-[100vh]'>  
            <div className='h-[250px] sticky top-[calc(100vh-250px)]'> 
                <Content />
            </div>
        </div>
    </div>
  )
}


export default index