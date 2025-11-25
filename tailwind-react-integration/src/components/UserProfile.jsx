// src/components/UserProfile.jsx - Enhanced Version
function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-sm md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto transition-transform duration-300 ease-in-out hover:scale-110 border-4 border-white shadow-md"
      />
      <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 my-4 hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer font-semibold">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm sm:text-sm md:text-base transition-colors duration-300 hover:text-gray-800">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;