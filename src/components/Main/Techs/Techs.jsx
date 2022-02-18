import "./Techs.css";
import "../Main.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="main__title">Технологии</h2>
      <hr className="main__line" />
      <h3 className="techs__head">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__links">
        <li className="techs__links-item">HTML</li>
        <li className="techs__links-item">CSS</li>
        <li className="techs__links-item">JS</li>
        <li className="techs__links-item">React</li>
        <li className="techs__links-item">Git</li>
        <li className="techs__links-item">Express.js</li>
        <li className="techs__links-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
