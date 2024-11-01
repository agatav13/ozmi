export default function Header() {
  return (
    <header className="MainPage">
      <img src="ozmi-logo.webp" alt="Logo Ośrodka Zastosowań Matematyki i Informatyki" />
      <div className="MainPageNav">
        <a href="#about-us"><p>O nas</p></a>
        <a href="#news-section"><p>Aktualności</p></a>
        <a href="#education"><p>Edukacja</p></a>
        <a href="#case-studies"><p>Case studies</p></a>
      </div>
    </header>
  );
}
