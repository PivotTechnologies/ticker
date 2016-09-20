import React from 'react';

const Signup = () => (
  <div>
    <input
      type="text"
      placeholder="Enter first name"
    />

    <input
      type="text"
      placeholder="Enter last name"
    />

    <input
      type="text"
      placeholder="Create username"
    />

    <input
      type="email"
      placeholder="Enter email"
    />

    <input
      type="password"
      placeholder="Create password"
    />
  </div>
);

// class Signup extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//
//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Enter first name"
//         />
//
//         <input
//           type="text"
//           placeholder="Enter last name"
//         />
//
//         <input
//           type="text"
//           placeholder="Create username"
//         />
//
//         <input
//           type="email"
//           placeholder="Enter email"
//         />
//
//         <input
//           type="password"
//           placeholder="Create password"
//         />
//       </div>
//     );
//   }
// }

export default Signup;
