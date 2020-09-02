// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { connect } from "react-redux";
// // import useForm from "react-hook-form";
// import { useForm } from "react-hook-form";

// function SampleForm() {
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     alert(JSON.stringify(data));
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="firstName">First Name</label>
//           <input name="firstName" placeholder="bill" ref={register} />
//         </div>

//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input name="lastName" placeholder="luo" ref={register} />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             name="email"
//             placeholder="bluebill1049@hotmail.com"
//             type="email"
//             ref={register}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// class Sample extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <SampleForm />;
//   }
// }

// export default connect()(Sample);

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<Sample />, rootElement);
