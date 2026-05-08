// const PropertyDetails = () => {
//   return (
//     <div
//       style={{
//         padding: "50px",
//       }}
//     >

//       <h1
//         style={{
//           fontSize: "50px",
//         }}
//       >
//         Property Details
//       </h1>

//       <img
//         src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
//         alt=""
//         style={{
//           width: "100%",
//           maxWidth: "700px",
//           marginTop: "30px",
//           borderRadius: "20px",
//         }}
//       />

//       <h2
//         style={{
//           marginTop: "30px",
//         }}
//       >
//         Luxury Villa In Goa
//       </h2>

//       <p>₹4500/night</p>

//       <button
//         style={{
//           background: "blue",
//           color: "white",
//           border: "none",
//           padding: "12px 25px",
//           borderRadius: "10px",
//           marginTop: "20px",
//         }}
//       >
//         Book Now
//       </button>

//     </div>
//   );
// };

// export default PropertyDetails;

// import { useParams } from "react-router-dom";

// const PropertyDetails = () => {

//   const { id } = useParams();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-10 rounded-3xl shadow-2xl">

//         <h1 className="text-5xl font-bold mb-5">
//           Property Details
//         </h1>

//         <p className="text-2xl text-gray-600">
//           Property ID: {id}
//         </p>

//       </div>

//     </div>
//   );
// };

// export default PropertyDetails;


import { useParams } from "react-router-dom";

const PropertyDetails = () => {

  const { id } = useParams();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1F4D",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          marginBottom: "20px",
        }}
      >
        Property Details
      </h1>

      <div
        style={{
          background: "white",
          color: "black",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "600px",
        }}
      >

        <h2>Property ID: {id}</h2>

        <p style={{ marginTop: "15px" }}>
          Full property details will show here.
        </p>

      </div>

    </div>
  );
};

export default PropertyDetails;