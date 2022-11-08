import { useState, useEffect } from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';
import Spinner from './Spinner';

function App() {
  const [properties, setProperties] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState(() => JSON.parse(localStorage.getItem("saved") || "[]"))

  const handleClick = (id) => {
    const isSaved = savedProperties?.includes(id)
    const newStorageItem = isSaved ?
      savedProperties.filter((savedId) => savedId !== id) :
      [...savedProperties, id]
    setSavedProperties(newStorageItem);
    localStorage.setItem("saved", JSON.stringify(newStorageItem))
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();

      setProperties(json.result.properties.elements);
      setIsLoading(false);
    };

    fetchPropertyData();
  }, []);

  const handleChangeQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  function search(properties) {
    if(!searchQuery) return properties
    return properties.filter((item) => (item?.short_description?.toLowerCase().indexOf(searchQuery?.toLowerCase()) !== -1));
  }

  return (
    <div className="main-wrapper container mx-auto my-5">
      <Header
        searchQuery={searchQuery}
        handleChangeQuery={handleChangeQuery}
        className="header"
      />
      <div className="content">
        {isLoading ? (
          <Spinner />
        ) : (
          <div> {!!properties && search(properties).length ? (
            <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!!properties && search(properties).map((property) => (
                <PropertyCard
                  key={property.property_id}
                  property={property}
                  handleClick={handleClick}
                  isSaved={savedProperties.includes(property.property_id)}
                />))}
            </div>
          ) : "No results match your search criteria" }
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
