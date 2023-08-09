import React, { useState,useRef} from 'react';
import useSWR from 'swr';
import Deals from './component/deals';
function App() {
  const fetcher=async(url)=>{
    try{
     const response=await fetch(url);
     const data= await response.json();
     console.log(data)
     return data;
    }
    catch(error){
      throw new Error(error);
    }
  }
  const [word, setWord] = useState(null);
  const [input, setinput] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const temp = useRef(null);

  const search = () => {
    setWord(input);
    setSearchTriggered(true);
    temp.current.value = '';
    setinput('');
  };

  const handlesearch = () => {
    setSearchTriggered(false); // Prevent unnecessary refetch when input is focused
  };

  const { data } = useSWR(
    searchTriggered
      ? `https://www.cheapshark.com/api/1.0/games?title=${word}&limit=3`
      : false,
    fetcher
  );
  return(
    <div className='App'>
      <div className='bg-cyan-400 py-24 flex flex-col items-center'>
        <div className='mb-4'>
        <h1 className='font-bold text-4xl text-white'>Search For Game</h1>
        </div>
      <div className='mb-4'>
        <input  onChange={(e)=>{setinput(e.target.value)}} onFocus={handlesearch}type='text' placeholder='Enter Game to Search' className='bg-white w-full pl-2 rounded-md mb-4 h-10' ref={temp}/>
        <button onClick={search}className='bg-white w-full rounded-md h-10'>Search Game</button>
      </div> 
      <div className='flex justify-evenly w-1/3 mx-auto'>
        {data&&data.map((item,ind)=>{
          return (<div className='bg-white p-3 border-2 rounded-md shadow-md w-1/4 mx-4' key={ind}>
            <h1 className='text-base font-bold text-center w-full'>{item.external}</h1>
            <img src={item.thumb}  alt="{item.external}" className='h-20 w-20 mx-auto'/>
          </div>);
        })}
      </div>
      </div>
      <Deals/>
    </div>
  );
}

export default App;
