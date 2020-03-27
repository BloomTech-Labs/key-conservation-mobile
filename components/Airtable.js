import React from 'react';

const Airtable = props => {
  var Airtable = require('airtable');
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keybUdphipr0RgMaa'
  });

  var base = new Airtable({ apiKey: 'keybUdphipr0RgMaa' }).base(
    'appbPeeXUSNCQWwnQ'
  );

  if (
    props.org_name &&
    props.website &&
    props.address &&
    props.country !== null
  ) {
    base('Table 1').create(
      [
        {
          fields: {
            name: props.name,
            website: props.website,
            address: props.address,
            country: props.country,
            point_of_contact: props.point_of_contact,
            poc_position: props.poc_position
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err + '*** test ***');
          return;
        }
        records.forEach(function(record) {
          // console.log(record.getId());
        });
      }
    );
  } else {
    // console.log('props are null');
    return null;
  }
};

export default Airtable;
