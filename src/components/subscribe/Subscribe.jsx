import story_stars from './story_stars.png';

const Subscribe = () => {
  return (
    <div>
      <div className={`flex flex-row items-center justify-center h-14`} 
      >
        <div className={`w-14 bg-cover`}>
          <img src={story_stars} alt="star" className="object-cover block w-full h-60 my-32"  />
        </div>
        
        <div className={`text-4xl mt-3 just-another-hand`}>
          subscribe for updates on new drops!
        </div>
        
        <div className={`w-14 bg-cover ` }>
          <img src={story_stars} alt="star" className="object-cover block w-full h-60 my-32" />
        </div>
      </div>

      <div className={`flex flex-row items-center justify-center h-14`}>
        <input 
        className={`flex flex-1 h-10 pl-2.5 border-2 border-solid border-red-800 rounded-sm shadow-md text-lg text-base font-sans max-w-[18rem]
        focus:outline-blue-500 focus:rounded-none`} type="text"/>
      </div>
      
    </div>
  )
}

export default Subscribe
