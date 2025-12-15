import { Search } from 'lucide-react';
import clear_icon from "../assets/clear.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"

function Weather(){
    return(
        <main className='p-8 sm:p-8 bg-indigo-500 rounded-xl shadow-xl w-full max-w-lg  border border-gray-100 flex flex-col items-center'>
            
            <div className='flex items-center space-x-2 gap-4 mb-6 w-full'>
                <input type="text" className='pl-8 border border-gray-300 rounded-3xl p-2 h-10 w-full outline-none' 
                placeholder='Search...'
                />
                <button className='w-12 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors'>
                    <Search className='opacity-50'/>
                </button>
            </div>
            <img src={clear_icon} alt="clear" className='w-32 my-4'/>
            
            <div className='text-center text-white mb-8'>
                <p className='text-6xl font-bold'>16°C</p>
                <p className='text-2xl mt-2'>Douala</p>
            </div>

            <div className='flex w-full justify-between text-white'>
                <div className='flex items-center space-x-2 gap-4'>
                    <img src={humidity_icon} alt="" className='w-8 h-8'/>
                    <div> 
                        <p className='font-bold'>91%</p>
                        <span>Humidity</span>
                    </div> 
                </div>
                <div className='flex items-center space-x-2 gap-4'>
                    <img src={wind_icon} alt=""/>
                    <div>
                        <p>3.6km/h</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Weather