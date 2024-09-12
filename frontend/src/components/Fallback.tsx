import { useEffect } from 'react'
const Fallback = ({handleLoadingStart,onLoadFinish}:{handleLoadingStart:()=>void,onLoadFinish:()=>void}) => {
    useEffect(() => {
        handleLoadingStart();
        return() =>{
            onLoadFinish()
        }
    }, [handleLoadingStart,onLoadFinish])
    
  return (
    <div className='h-screen w-full bg-zinc-800 flex justify-center items-center'>
      <span className="loader"></span>
    </div>
  )
}

export default Fallback