import { markerTypeToEmoji } from "../utils/utils"

function ControlPanel({ markers, activeMarkerId, setActiveMarkerId }) {

  const activeMarkerIndex = markers.findIndex(m => m.id === activeMarkerId);
  const activeMarker = markers[activeMarkerIndex];
  
  if (!activeMarker) return null;

  const btnPrevClickHandler = () => {
	setActiveMarkerId(prev => {
	  return markers[activeMarkerIndex - 1].id
	});
  }

  const btnNextClickHandler = () => {
	setActiveMarkerId(prev => {
	  return markers[activeMarkerIndex + 1].id
	});
  }
    
  return (
    <>
	  <div>
	  	<span>{`Marker: ${activeMarkerIndex + 1}/${markers.length}`}</span>
		<span> | </span>
		<span>Type:{markerTypeToEmoji(activeMarker.type)}</span>
		<span> | </span>
		<span>Lat: {activeMarker.lat.toFixed(2)}</span>
		<span> | </span>
		<span>Lon: {activeMarker.lon.toFixed(2)}</span>
		{activeMarker.type === 'plane' && (
		  <div>
			<span>Distance from you: {activeMarker.distance.toFixed(2)} km</span>
			<span> | </span>
			<span>Origin: {activeMarker.origin}</span>
		  </div>
		)}
	  </div>
	  <div>
	  	<button
		  disabled={markers.length <= 1 || activeMarkerIndex === 0}
		  onClick={btnPrevClickHandler}
		>
		  Prev
		</button>
		<button
		  disabled={markers.length <= 1 || activeMarkerIndex === markers.length - 1}
		  onClick={btnNextClickHandler}
		>
		  Next
		</button>
		<p className="info">🔎  Click earth to toggle zoom</p>
	  </div>
	</>
  )
}
export default ControlPanel