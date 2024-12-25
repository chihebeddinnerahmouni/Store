// interface Props {
//   selected: string;
//   options: string[];
//   setSelected: (value: string) => void;
// }

// const SwitchButtons = ({ options, setSelected, selected }: Props) => {
//   return (
//     <section className="flex mt-5 lg:mt-10">
//       {options.map((value) => (
//         <div
//           key={value}
//           onClick={() => setSelected(value)}
//           className={`p-3 cursor-pointer rounded-t-md text-center flex-1  ${
//             selected === value
//               ? "text-whit shadow-sm bg-white border-l-2 border-r-2 border-t-2 border-main "
//               : "text-gray-700 border-b-2 border-main"
//           }`}
//         >
//           {value}
//         </div>
//       ))}
//     </section>
//   );
// };

// export default SwitchButtons;
interface Props {
  selected: string;
  options: string[];
  setSelected: (value: string) => void;
}

const SwitchButtons = ({ options, setSelected, selected }: Props) => {
  return (
    <section className="flex mt-5 lg:mt-10">
      {options.map((value) => (
        <div
          key={value}
          onClick={() => setSelected(value)}
          className={`p-1 cursor-pointer rounded-t-md text-center flex-1 transition-all duration-100 ease-linear lg:p-3 lg:text-lg ${
            selected === value
              ? "shadow-sm border-b-2 border-main "
              : "text-writingGrey/30 border-b-2 border-writingGrey/30"
          }`}
        >
          {value}
        </div>
      ))}
    </section>
  );
};

export default SwitchButtons;
