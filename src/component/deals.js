import React from "react";
import useSWR from "swr";
const Deals=()=>{
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
    const { data } = useSWR(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3`,fetcher);
    return(
    <div className="Deals py-24">
      <div>
        <h1 className="font-bold text-4xl text-center mb-6">Deals</h1>
      </div>
        <div className='flex justify-evenly w-1/2 mx-auto'>
        {data&&data.map((item,ind)=>{
          return (<div className='bg-white p-3 border-2 rounded-md shadow-md w-1/3 mx-4 flex flex-col justify-center items-center' key={ind}>
            <h1 className='text-base font-bold w-full text-center'>{item.internalName}</h1>
            <img src={item.thumb}  alt={item.internalName} className='h-10 w-10'/>
                <p>${item.salePrice}</p>
          </div>);
        })}
      </div>
    </div>
      );
}
export default Deals;