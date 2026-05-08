import { createContext, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (property) => {
    setWishlist([...wishlist, property]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;