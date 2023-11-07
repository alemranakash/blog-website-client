// import  { useState } from 'react';
// import swal from 'sweetalert';

// const Newsletter = () => {
//   const [email, setEmail] = useState('');

//   const handleSubscription = (e) => {
//     e.preventDefault();

   
//     swal({
//         title: 'Thank you',
//         text: 'Thank you for subscribing to our newsletter',
//         icon: 'success',
//       });
//   };

//   return (
//     <div className="flex mt-10 flex-col lg:flex-row justify-center items-center  mx-auto p-4 border border-blac rounded-lg shadow-lg mb-10" style={{ backgroundImage: 'url("https://i.ibb.co/pZVP6Qz/pexels-skylar-kang-6044235.jpg")', backgroundSize: 'cover' }}>
//         <img src="https://i.ibb.co/bB771Tx/3d-email-envelope-icon-maill-newsletter-illustration-with-glass-morphism-style-78434-215-removebg-pr.png" alt="" />
//      <div>
//      <h2 className="text-2xl text-white font-semibold mb-2">Subscribe to our Newsletter</h2>
//       <form onSubmit={handleSubscription}>
//         <div className="mb-4">
//           <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
//           />
//         </div>
//         <div className="text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-white hover:text-black"
//           >
//             Subscribe
//           </button>
//         </div>
//       </form>
//      </div>
//     </div>
//   );
// };

// export default Newsletter;


import { useState } from 'react';
import swal from 'sweetalert';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscription = (e) => {
    e.preventDefault();

    // Simulate a subscription
    setIsSubscribed(true);

    // Display a success message with animation
    swal({
      title: 'Thank you',
      text: 'Thank you for subscribing to our newsletter',
      icon: 'success',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex mt-10 flex-col lg:flex-row justify-center items-center mx-auto p-4 border border-black rounded-lg shadow-lg mb-10"
      style={{
        backgroundImage: 'url("https://i.ibb.co/pZVP6Qz/pexels-skylar-kang-6044235.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <img
        src="https://i.ibb.co/bB771Tx/3d-email-envelope-icon-maill-newsletter-illustration-with-glass-morphism-style-78434-215-removebg-pr.png"
        alt=""
      />
      <div>
        <h2 className="text-2xl text-white font-semibold mb-2">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubscription}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="text-center">
            {isSubscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <motion.button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
              >
                Subscribe
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
