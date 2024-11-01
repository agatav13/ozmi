export default function Education() {
  return (
    <div className="Education" id="education">
      <h2 className="TextAlignCenter SectionTitle">Edukacja</h2>
      <div className="EducationTiles">
        <div className="EducationRow1">
          <a id="education-tile-1" className="EducationTile BottomText" href="">
            <p className="TileText">Pracownia Matematyczna</p>
            <p><i className="RightArrow"></i></p>
          </a>
          <a id="education-tile-2" className="EducationTile TopText" href="">
            <p className="TileText">Szkoła Modelowania Matematycznego</p>
            <p><i className="RightArrow"></i></p>
          </a>
        </div>
        <div className="EducationRow2">
          <a id="education-tile-3" className="EducationTile BottomText" href="https://mathinsight.xyz/">
            <p className="TileText">Koło Naukowe Matematyki Stosowanej Insight.</p>
            <p><i className="RightArrow"></i></p>
          </a>
        </div>
      </div>
    </div>
  );
}
