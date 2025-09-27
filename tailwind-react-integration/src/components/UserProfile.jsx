export default function UserProfile() {
  return (
    <div className=" sm:p-4 bg-gray-100 md:p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg sm:max-w-xs md:max-w-sm  hover:shadow-xl p-3" >

      <img className="mt-3 w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110 sm:w-24 sm:h-24 rounded-full sm:rounded-full md:w-36 md:h-36 mx-auto" src="/UserPic.jpg" alt="User" />

      <h1 className="text-xl text-blue-800 my-4 flex justify-center items-center sm:text-lg md:text-xl hover:text-blue-500 cursor-pointer"><span>John Doe</span></h1>

      <p className="text-gray-600 sm:text-sm md:text-base p-3">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}


