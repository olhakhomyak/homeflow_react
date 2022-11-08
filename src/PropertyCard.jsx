import { FaBookmark } from 'react-icons/fa';


function PropertyCard({ property, handleClick, isSaved }) {
  const imageSrc = `https://mr0.homeflow.co.uk/${property.photos[0]}`; 
  const fallbackSrc = "https://aqareyonline.com/site_new_assets/assets/images/placeholder-listing.jpeg";

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        <img
          src={imageSrc}
          onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}}
          alt={property.display_address}
        />
        <button
          onClick={()=>handleClick(property.property_id)}
          className="absolute top-0 right-2"
          title="Click to bookmark this property">
          <FaBookmark className={isSaved ? "text-red-400" : "text-yellow-400"} size="40" />
        </button>
        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{property.price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
