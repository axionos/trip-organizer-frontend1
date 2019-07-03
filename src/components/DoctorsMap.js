import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DoctorMarker from "./DoctorMarker";

const DoctorsMap = withScriptjs(withGoogleMap((props) =>{

  // const markers = props.doctors.map( doctor => <DoctorMarker
  //                   ***REMOVED***={doctor.uid}
  //                   doctor={doctor}
  //                   location={{lat: doctor.closestPractice.lat, lng: doctor.closestPractice.lon}}
  //                 />);
  console.log('Doctors Map Props', props);
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  42.3601, lng: -71.0589 } }
        >
        {/*markers*/ null}
      </GoogleMap>
    );
  }
))

export default DoctorsMap;