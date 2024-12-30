import image from "../assets/images/logo";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-black flex justify-center items-center h-screen py-0 px-4">
      <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5 text-center bg-whit p-6 rounded-lg shadow-lg">
        <img
          src={image}
          alt="logo"
          className=" object-cover rounded w-[200px] h-[200px] mb-5"
        />
        <p className="text-[26px] font-semibold text-white text-writingMainDark lg:text-[26px]">
          Page non trouvée
        </p>
        <button
          onClick={() => navigate("/tableau-de-bord")}
          className="mt-4 px-6 py-2 bg-main text-white rounded-lg hover:bg-mainHover transition duration-300 flex items-center gap-2"
        >
          Retour à la page d'accueil
        </button>
      </div>
    </div>
  );
};

export default NoPage;

// import React from "react";
// import { useTranslation } from "react-i18next";
// import { FaAnchor, FaShip } from "react-icons/fa";

// const NoPage: React.FC = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="w-full flex justify-center items-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-0 px-4">
//       <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5 text-center bg-white p-6 rounded-lg shadow-lg">
//         <img
//           src={image}
//           alt="Boat"
//           className="w-1/2 md:w-1/3 lg:w-1/4 mb-4 rounded-full border-4 border-white shadow-md"
//         />
//         <FaAnchor className="text-blue-700 text-6xl mb-4" />
//         <p className="text-[26px] font-semibold text-blue-900 lg:text-[26px]">
//           {t("page_not_found")}
//         </p>
//         <p className="text-[18px] text-blue-700 lg:text-[20px]">
//           {t("sailed_into_uncharted_waters")}
//         </p>
//         <a
//           href="/?page=1"
//           className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300 flex items-center gap-2"
//         >
//           <FaShip />
//           {t("go_back_home")}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NoPage;