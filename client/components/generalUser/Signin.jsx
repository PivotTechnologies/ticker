import React from 'react';

const Signin = () => (
  <div>
    <input
      type="text"
      placeholder="Enter username"
    />

    <input
      type="password"
      placeholder="Enter password"
    />
  </div>
);

// class Signin extends React.Component {
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
//           placeholder="Enter username"
//         />
//
//         <input
//           type="password"
//           placeholder="Enter password"
//         />
//       </div>
//     );
//   }
// }

export default Signin;
