import React from 'react';
import SellerSearchBar from './SellerSearchBar.jsx';

const SellerForm = () => (
  <div>
    <SellerSearchBar />
    <input
      placeholder="Enter Starting Price"
    />

    <input
      placeholder="Enter Min Price"
    />

    <input
      placeholder="Enter number of tickets"
    />
  </div>
);

// class SellerForm extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//
//   render() {
//     return (
//       <div>
//         <SellerSearchBar />
//         <input
//           placeholder="Enter Starting Price"
//         />
//
//         <input
//           placeholder="Enter Min Price"
//         />
//
//         <input
//           placeholder="Enter number of tickets"
//         />
//       </div>
//     );
//   }
// }

export default SellerForm;
