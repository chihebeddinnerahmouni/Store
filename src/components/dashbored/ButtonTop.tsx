// import { Link } from "react-router-dom"


// interface ButtonTopProps {
//     title: string
//                 icon:string
//                 url: string
//     }

// const ButtonTop = ({title, icon, url}: ButtonTopProps) => {
//   return (
//     <Link to={url} className="shadow-hardShadow p-4 flex items-center gap-2 rounded-10">
//           <img src={icon} className="" alt="Pic" />
//           <div className="text">
//               <p className="text-xs text-writingGrey">Vers</p>
//               <p className="text-lg">{title}</p>
              
//           </div>
//     </Link>
//   )
// }

// export default ButtonTop

import { Link } from "react-router-dom";

interface ButtonTopProps {
    title: string;
    icon: string;
    url: string;
}

const ButtonTop = ({ title, icon, url }: ButtonTopProps) => {
    return (
      <Link
        to={url}
        className="shadow-mainShadow flex items-center gap-2 rounded-10 transition-transform duration-300 hover:scale-[102%] p-[1.25em]"
      >
        <img
          src={icon}
          className="w-[30px] h-[30px] object-cover lg:w-[40px] lg:h-[40px]"
          alt="Pic"
        />
        <div className="text">
          <p className="text-xs text-writingGrey">Vers</p>
          <p className="text-lg">{title}</p>
        </div>
      </Link>
    );
};

export default ButtonTop;