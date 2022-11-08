import SearchBox from './SearchBox';

function Header({searchQuery, handleChangeQuery}) {
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-8xl">
        Posh Properties
      </h1>
      <SearchBox
        searchQuery={searchQuery}
        handleChangeQuery={handleChangeQuery}
      />
    </header>
  );
};

export default Header;
