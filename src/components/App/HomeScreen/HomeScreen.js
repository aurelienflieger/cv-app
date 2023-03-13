import CVMock from "../Form/Download/CVMock";
import github from "../../../assets/HomeScreen/github.svg";

const HomeScreen = ({ toggleHomeScreen }) => {
  return (
    <main className="home-screen">
      <header className="home-screen__header">
        <nav className="home-screen__header__nav">
          <li className="home-screen__header__nav__list">
            <ul className="home-screen__header__nav__list__element">
              What we offer
            </ul>
            <ul className="home-screen__header__nav__list__element">
              Who we are
            </ul>
            <ul className="home-screen__header__nav__list__element">
              Our values
            </ul>
          </li>
        </nav>
      </header>
      <section className="home-screen__main">
        <div className="CV-mock__wrapper">
          <CVMock />
        </div>
        <h1 className="home-screen__main__title">Your online CV for free</h1>
        <p className="home-screen__main__description">
          Let us guide you through making an awesome CV to get hired fast.
        </p>
        <button
          className="home-screen__main__button button start"
          onClick={() => toggleHomeScreen()}
        >
          Make your CV
        </button>
      </section>
      <footer>
        <a href="https://github.com/ElMoscaviador">
          <img alt="footer" src={github} />
          <span>2023 - ElMoscaviador</span>
        </a>
      </footer>
    </main>
  );
};

export default HomeScreen;
