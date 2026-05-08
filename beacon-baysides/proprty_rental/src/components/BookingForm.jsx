// import { useState } from "react";

// const BookingForm = () => {

//   const [name, setName] = useState("");

//   const submitBooking = () => {

//     if (name === "") {
//       alert("Please enter your name");
//       return;
//     }

//     alert(`Booking confirmed for ${name}`);
//   };

//   return (
//     <div
//       style={{
//         background: "white",
//         padding: "30px",
//         borderRadius: "20px",
//         marginTop: "50px",
//         boxShadow: "0px 0px 10px gray",
//       }}
//     >

//       <h1
//         style={{
//           marginBottom: "20px",
//         }}
//       >
//         Book Property
//       </h1>

//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <input
//         type="date"
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <input
//         type="date"
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <button
//         onClick={submitBooking}
//         style={{
//           background: "#2563eb",
//           color: "white",
//           border: "none",
//           padding: "12px 25px",
//           borderRadius: "10px",
//           cursor: "pointer",
//         }}
//       >
//         Confirm Booking
//       </button>

//     </div>
//   );
// };

// export default BookingForm;
// import { useState } from "react";

// const BookingForm = () => {

//   const [name, setName] = useState("");

//   const submitBooking = () => {

//     if (name.trim() === "") {
//       alert("Please enter your name");
//     } else {
//       alert("Booking Confirmed for " + name);
//     }

//   };

//   return (

//     <div
//       style={{
//         background: "white",
//         padding: "30px",
//         borderRadius: "20px",
//         marginTop: "50px",
//         boxShadow: "0px 0px 10px gray",
//       }}
//     >

//       <h1
//         style={{
//           marginBottom: "20px",
//         }}
//       >
//         Book Property
//       </h1>

//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <input
//         type="date"
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <input
//         type="date"
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "20px",
//         }}
//       />

//       <button
//         onClick={submitBooking}
//         style={{
//           background: "#2563eb",
//           color: "white",
//           border: "none",
//           padding: "12px 25px",
//           borderRadius: "10px",
//           cursor: "pointer",
//         }}
//       >
//         Confirm Booking
//       </button>

//     </div>

//   );
// };

// export default BookingForm;
import { useState } from "react";

const BookingForm = () => {

  const [name, setName] = useState("");

  const submitBooking = () => {

    if (name.trim() === "") {
      alert("Please enter your name");
    } else {
      alert("Booking Confirmed for " + name);
    }

  };

  return (

    <div
      style={{
        background: "#1f2937",
        padding: "40px",
        borderRadius: "20px",
        marginTop: "50px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
        color: "white",
        // maxWidth: "700px",
        // marginLeft: "auto",
        // marginRight: "auto",
      }}
    >

      <h1
        style={{
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "35px",
        }}
      >
        Book Property
      </h1>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          background: "#374151",
          color: "white",
        }}
      />

      <input
        type="date"
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          background: "#374151",
          color: "white",
        }}
      />

      <input
        type="date"
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "25px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          background: "#374151",
          color: "white",
        }}
      />

      <button
        onClick={submitBooking}
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "15px",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Confirm Booking
      </button>

    </div>

  );
};

export default BookingForm;