// import { useForm, SubmitHandler } from 'react-hook-form';
// import './Test.css'; // Import the CSS file

// interface FormValues {
//   name: string;
//   email: string;
// }

// function Test() {
//   const {
//     register, // Registers form inputs
//     handleSubmit, // Handles form submission
//     formState: { errors }, // Captures validation errors
//   } = useForm<FormValues>();

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log(data); // Handle form submission
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Name Input */}
//       <div>
//         <label>Name</label>
//         <input {...register("name", { required: "Name is required" })} />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>

//       {/* Email Input */}
//       <div>
//         <label>Email</label>
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//               message: "Invalid email address",
//             },
//           })}
//         />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>

//       {/* Submit Button */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default Test;

const Test = () => {
  return (
    <div>
      
    </div>
  )
}

export default Test
