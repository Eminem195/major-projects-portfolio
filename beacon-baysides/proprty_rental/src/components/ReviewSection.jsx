const ReviewSection = () => {
  return (
    <div className="mt-24 bg-linear-to-r from-blue-50 via-cyan-50 to-blue-100 p-14 rounded-[40px] shadow-inner overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-16">

        <h1 className="text-6xl font-extrabold text-gray-800 tracking-wide drop-shadow-sm">
          Customer Reviews
        </h1>

        <p className="text-gray-500 mt-5 text-xl">
          What our happy customers say about us
        </p>

      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Review 1 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Anjali
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Amazing property and very clean rooms.
            Booking process was smooth and easy.
          </p>

        </div>

        {/* Review 2 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Rahul
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Very beautiful location and nice service.
            I really enjoyed my stay here.
          </p>

        </div>

        {/* Review 3 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Priya
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Luxury experience with affordable pricing.
            Highly recommended platform for property rentals.
          </p>

        </div>

        {/* Review 4 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Arjun
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Exceptional hospitality and stunning views.
            The property exceeded all my expectations.
          </p>

        </div>

        {/* Review 5 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/women/22.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Meera
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Perfect getaway spot with excellent amenities.
            Will definitely book again for future trips.
          </p>

        </div>

        {/* Review 6 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/men/67.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Vikram
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Seamless booking and top-notch customer support.
            The property was immaculate and well-maintained.
          </p>

        </div>

        {/* Review 7 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/women/33.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Kavita
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Incredible value for money with breathtaking scenery.
            A memorable experience from start to finish.
          </p>

        </div>

        {/* Review 8 */}
        <div className="bg-white/80 backdrop-blur-lg border border-white hover:border-cyan-300 p-8 rounded-3xl shadow-2xl hover:-translate-y-3 hover:scale-105 hover:shadow-cyan-200 transition duration-500 h-full">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="https://randomuser.me/api/portraits/men/55.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Rohan
              </h2>

              <p className="text-yellow-500 text-xl mt-1">
                ⭐⭐⭐⭐⭐
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg">
            Friendly staff and comfortable accommodations.
            Ideal for both business and leisure travelers.
          </p>

        </div>

      </div>
    </div>
  );
};

export default ReviewSection;