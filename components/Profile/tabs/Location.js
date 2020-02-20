import React from 'react';
import { ScrollView } from 'react-navigation';

import LocationMap from '../../Location/LocationMap';

const Location = props => {
    return (
      <ScrollView>
        <LocationMap
          profile={props.profile}
        />
      </ScrollView>
    );
}

export default Location;
