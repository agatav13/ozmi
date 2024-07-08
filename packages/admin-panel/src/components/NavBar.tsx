import "../assets/styles/NavBar.css"

export default function NavBar() {
    return (
        <div className="NavBarButtonsContainer">
            <button className="NavBarButton">Aktualności</button>
            <button className="NavBarButton">O nas</button>
            <button className="NavBarButton">Edukacja</button>
            <button className="NavBarButton">Case studies</button>
        </div>
    );
}