// import { Link } from "react-router-dom";

// interface ButtonTopProps {
//     title: string;
//     icon: string;
//     url: string;
// }

// const ButtonTop = ({ title, icon, url }: ButtonTopProps) => {
//     return (
//       <Link
//         to={url}
//         className="cardCss flex items-center gap-2 transition-transform duration-300 hover:scale-[102%]"
//       >
//         <img
//           src={icon}
//           className="w-[30px] h-[30px] object-cover lg:w-[40px] lg:h-[40px]"
//           alt="Pic"
//         />
//         <div className="text">
//           <p className="text-xs text-writingGrey">Vers</p>
//           <p className="text-lg">{title}</p>
//         </div>
//       </Link>
//     );
// };

// export default ButtonTop;







import { Link } from "react-router-dom";

interface ButtonTopProps {
    title: string;
    Icon: any;
  url: string;
  value:number
}

const ButtonTop = ({ title, Icon, url, value }: ButtonTopProps) => {
    return (
      <Link
        to={url}
        className="cardCss flex items-center gap-2 transition-transform duration-300 hover:scale-[102%] whitespace-nowrap lg:flex-grow" 
      >
        <Icon className="w-[30px] h-[30px] object-cover text-main lg:w-[40px] lg:h-[40px]" />
        <div className="text">
          <p className="text-xs text-writingGrey lg:text-base">{title}</p>
          <p className="text-lg font-semibold lg:text-2xl">{value} DA</p> 
        </div>
      </Link>
    );
};

export default ButtonTop;