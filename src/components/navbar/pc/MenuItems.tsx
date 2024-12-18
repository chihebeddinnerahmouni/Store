import { NavLink } from "react-router-dom";
import navbar_classes_array from "../../../assets/file/NavbarClassesArray";

// const MenuItems = ({isHomePage}: {isHomePage: boolean}) => {
const MenuItems = () => {
  
  //  console.log(isHomePage, isBlurred);
  
  // not used
  
  return (
    <div className="list hidden gap-8 buttomFadeCss lg:flex">
      {navbar_classes_array.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          style={{ textShadow: "01px 01px 1px rgba(0, 0, 0, 0.6)" }}
          className={({ isActive }) => `text-lg font-semibold hover:text-main ${isActive && "text-main" }`}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default MenuItems;