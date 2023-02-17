const HomeScreen = ({ toggleHomeScreen }) => {
  return (
    <main className="home-screen">
      <button
        className="start-button"
        onClick={() => toggleHomeScreen(false)}
        type="button"
      >
        Make your CV now!
      </button>
    </main>
  );
};

export default HomeScreen;
