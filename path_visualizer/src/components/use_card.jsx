import React from 'react'

export const Usecard = ({setShowCard}) => {
  return (
   <><div className="overlay">
   <div className="card">
   <div className="flex flex-row items-center justify-between pt-3 pb-2 pr-4">
     <h1 className="text-center flex-grow text-lg font-bold">How to Use</h1>
     <button className="back" onClick={() => setShowCard(false)}>Back</button>
   </div>
     <div class="flex flex-col space-y-c2 pl-5 pb-2">
        <div class="points flex items-start"><div class="w-2 h-2 bg-black rounded-full mr-2"></div>
        use Doraeomn icon button to place the endinf node</div>
        <div class="points flex items-center"><div class="w-2 h-2 bg-black rounded-full mr-2"></div>
        use Nobita icon to place the start node</div>
        <div class="points flex items-center"><div class="w-2 h-2 bg-black rounded-full mr-2"></div>
        use gian to make obstalces</div>
        <div class="points flex items-center"><div class="w-2 h-2 bg-black rounded-full mr-2"></div>
        Pointer 1</div>
     </div>
   </div>
 </div>
   </>
  )
}


