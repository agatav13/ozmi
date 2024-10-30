import "../assets/styles/NavBar.css";
import "../assets/styles/Sections.css";
import { MdOutlineNewspaper } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BsFillCalculatorFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { lazy, useState, Suspense } from "react";
import { IconType } from "react-icons";

const NewsSection = lazy(() => import("./Sections/NewsSection/NewsSection"));
const AboutUs = lazy(() => import("./Sections/AboutUs/AboutUs"));
const Education = lazy(() => import("./Sections/Education/Education"));
const CaseStudies = lazy(() => import("./Sections/CaseStudies/CaseStudies"));
const Default = lazy(() => import("./Sections/Default"));

export default function NavBar() {
  type SectionNames = "Aktualności" | "O nas" | "Edukacja" | "Case Studies";

  const [activeSection, setActiveSection] = useState<SectionNames | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case "Aktualności":
        return <NewsSection />;
      case "O nas":
        return <AboutUs />;
      case "Edukacja":
        return <Education />;
      case "Case Studies":
        return <CaseStudies />;
      default:
        return <Default />;
    }
  };

  const NavBarButton = ({ label, Icon }: { label: SectionNames, Icon: IconType }) => {
    return (
      <button type="button" className="NavBarButton" onClick={() => setActiveSection(label)} aria-label={label}>
        <Icon />
        {label}
      </button>
    );
  };

  return (
    <>
      <nav className="NavBarButtonsContainer">
        <NavBarButton label="Aktualności" Icon={MdOutlineNewspaper} />
        <NavBarButton label="O nas" Icon={IoPersonSharp} />
        <NavBarButton label="Edukacja" Icon={BsFillCalculatorFill} />
        <NavBarButton label="Case Studies" Icon={FaMagnifyingGlass} />
      </nav>

      <main>
        <Suspense
          fallback={
            <div className="DefaultContainer">
              <p>Ładowanie...</p>
            </div>
          }
        >
          {renderSection()}
        </Suspense>
      </main>
    </>
  );
}
