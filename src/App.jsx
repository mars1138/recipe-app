import MainHeader from './Navigation/MainHeader';
import SearchResults from './components/SearchResults';
import Recipe from './components/Recipe';

function App() {
  const MainBody = (props) => {
    return (
      <>
        <SearchResults />
        <Recipe />
      </>
    );
  };

  return (
    <main className="container">
      <MainHeader />
      <MainBody />
    </main>
  );
}

export default App;
