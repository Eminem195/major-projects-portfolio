import { useContext } from "react";

import { WishlistContext } from "../context/WishlistContext";

import Navbar from "../components/Navbar";

const Wishlist = () => {

  const { wishlist } = useContext(WishlistContext);

  return (
    <>
      <Navbar />

      <div className="px-5 md:px-10 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Wishlist
        </h1>

        {wishlist.map((item) => (

          <div
            key={item.id}
            className="bg-white shadow p-5 rounded-xl mb-5"
          >

            <h1 className="text-2xl font-bold">
              {item.title}
            </h1>

            <p className="mt-2">
              {item.location}
            </p>

          </div>

        ))}

      </div>
    </>
  );
};

export default Wishlist;