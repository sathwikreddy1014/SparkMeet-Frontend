// import { useState } from "react";
// import Usercard from "./Usercard";

// const CardsDeck = ({ users }) => {
//   const [cards, setCards] = useState(users);

//   const handleCardRemove = (id) => {
//     setCards((prev) => prev.filter((user) => user._id !== id));
//   };

//   return (
//     <div className="relative w-full flex justify-center items-center">
//       {cards.map((user, index) => (
//         <Usercard
//           key={user._id}
//           user={user}          onCardRemove={handleCardRemove}
//           index={index}
//         />
//       ))}

//       {cards.length === 0 && (
//         <p className="text-center text-gray-500 mt-6">No more users 🥲</p>
//       )}
//     </div>
//   );
// };

// export default CardsDeck;
