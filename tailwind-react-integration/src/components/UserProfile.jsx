// src/components/UserProfile.jsx - Enhanced Version
function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-8 sm:my-12 md:my-16 lg:my-20 rounded-lg shadow-lg transition-all duration-300">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto border-4 border-white shadow-md"
      />
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-blue-800 my-3 sm:my-4 md:my-5 text-center">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-center px-2 sm:px-0">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;