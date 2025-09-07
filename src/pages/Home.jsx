import { MdOutlinePendingActions } from "react-icons/md";

const Home = () => {
  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <div className='text-5xl font-semibold font-sans text-gray-600 flex flex-col justify-center items-center'>
          <MdOutlinePendingActions />

          <h1>In Development</h1>
        </div>
    </div>
  )
}

export default Home