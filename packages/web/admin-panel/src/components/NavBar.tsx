import "../assets/styles/NavBar.css";
import "../assets/styles/Sections.css";
import { MdOutlineNewspaper } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BsFillCalculatorFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { lazy, useState, Suspense } from "react";

const NewsSection = lazy(() => import("./Sections/NewsSection/NewsSection"));
const AboutUs = lazy(() => import("./Sections/AboutUs/AboutUs"));
const Education = lazy(() => import("./Sections/Education/Education"));
const CaseStudies = lazy(() => import("./Sections/CaseStudies/CaseStudies"));
const Default = lazy(() => import("./Sections/Default"));

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
        <button type="button" className="NavBarButton" onClick={() => setActiveElement(1)}><MdOutlineNewspaper />Aktualności</button>
        <button type="button" className="NavBarButton" onClick={() => setActiveElement(2)}><IoPersonSharp />O nas</button>
        <button type="button" className="NavBarButton" onClick={() => setActiveElement(3)}><BsFillCalculatorFill />Edukacja</button>
        <button type="button" className="NavBarButton" onClick={() => setActiveElement(4)}><FaMagnifyingGlass />Case studies</button>
      </div>
      <div>
        <Suspense fallback={<div className="DefaultContainer"><p>Ładowanie...</p></div>}>
          {renderElement()}
        </Suspense>
      </div>
    </>
  );
}