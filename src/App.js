import React, { useState,useRef} from 'react';
import useSWR from 'swr';
import Deals from './component/deals';
function App() {
  const fetcher=async(url)=>{
    try{
     const response=await fetch(url);
     if(!response.ok){
      console.log('network error')
     }
     const data= await response.json();
     console.log(data)
     setword(null);
     return data;
    }
    catch(error){
      throw new Error(error);
    }
  }
  const[word,setword]=useState(null);
  const[input,setinput]=useState('');
  const temp=useRef(null);
  const search=()=>{
    setword(input);
    temp.current.value="";
    setinput('');
  }
  const {data,error}=useSWR(word!==null?`https://www.cheapshark.com/api/1.0/games?title=${word}&limit=3`:null,fetcher);
  return(
    <div className='App'>
      <div className='bg-cyan-400 py-24 flex flex-col items-center'>
        <div className='mb-4'>
        <h1 className='font-bold text-4xl text-white'>Search For Game</h1>
        </div>
      <div className='mb-4'>
        <input  onChange={(e)=>{setinput(e.target.value)}} type='text' placeholder='Enter Game to Search' className='bg-white w-full pl-2 rounded-md mb-4 h-10' ref={temp}/>
        <button onClick={search}className='bg-white w-full rounded-md h-10'>Search Game</button>
      </div> 
      <div className='flex justify-evenly w-1/3 mx-auto'>
        {data&&data.map((item,ind)=>{
          return (<div className='b-white' key={ind}>
            <h1 className='text-2xl'>{item.external}</h1>
            <img src={item.thumb} className='h-5 w-5'/>
          </div>);
        })}
      </div>
      </div>
    </div>
  );
}

export default App;
