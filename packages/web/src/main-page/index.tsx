import "./assets/styles/MainPage.css"
import "./assets/styles/NewsPage.css"
import AboutUs from "./components/AboutUs";
import CaseStudies from "./components/CaseStudies";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsSection from "./components/NewsSection";

export default function MainPage() {
  return (
    <>
      <Header />
      <AboutUs />
      <NewsSection />
      <Education />
      <CaseStudies />
      <Footer />
    </>
  );
}
