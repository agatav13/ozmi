import "../assets/styles/NavBar.css";
import "../assets/styles/Sections.css";
import { MdOutlineNewspaper } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BsFillCalculatorFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import NewsSection from "./Sections/NewsSection/NewsSection";
import AboutUs from "./Sections/AboutUs/AboutUs";
import Education from "./Sections/Education/Education";
import CaseStudies from "./Sections/CaseStudies/CaseStudies";
import Default from "./Sections/Default";

export default function NavBar() {
  const [activeElement, setActiveElement] = useState<1 | 2 | 3 | 4 | null>(null);

  const renderElement = () => {
    switch (activeElement) {
      case 1:
        return <NewsSection />;
      case 2:
        return <AboutUs />;
      case 3:
        return <Education />;
      case 4:
        return <CaseStudies />;
      default:
        return <Default />;
    }
  };

  return (
  	<>
    	<div className="NavBarButtonsContainer">
        <button className="NavBarButton" onClick={() => setActiveElement(1)}><MdOutlineNewspaper />Aktualności</button>
        <button className="NavBarButton" onClick={() => setActiveElement(2)}><IoPersonSharp />O nas</button>
        <button className="NavBarButton" onClick={() => setActiveElement(3)}><BsFillCalculatorFill />Edukacja</button>
        <button className="NavBarButton" onClick={() => setActiveElement(4)}><FaMagnifyingGlass />Case studies</button>
      </div>
      <div>
        {renderElement()}
      </div>
    </>
  );
}