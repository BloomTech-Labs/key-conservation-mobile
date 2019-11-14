var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keysBuwAO4KtektL1'
});

var base = new Airtable({apiKey: 'keysBuwAO4KtektL1'}).base('appbPeeXUSNCQWwnQ');

var test = 'Lorem Ipsum'

base('Table 1').create([
  { 
    'fields': {
      "What is your organization’s name?": test,
      "Name of your point of contact": test,
      "What is your contact email?": test,
      "What is your organization’s website?": test,
      "What city and country is your organization based?": test,
      "Are there other countries that your organization works in?": test,
      // "Does your org have access to smartphone?": "Yes",
      "If you have access to a smartphone, what type do you have?": ["iOS (Apple) "],
      "What are your current partnerships and affiliations": test,
      "Position": test,
      // "Country": test,
      // "Will you join us in practicing Conservation Optimism?": "Yes",
      // "Do you have multiple projects within your organization?": "Yes",
      "If you have multiple projects within your organization please name them below": test
    }
  }
], function(err, records) {
  if (err) {
    console.error(err + "*** test ***");
    return;
  }
  records.forEach(function (record) {
    console.log(record.getId());
  });
});

// ---------------------------------------------------------

base('Table 1').create([
  { 
    'fields': {
      "Attachments": test,
    }
  }
], function(err, records) {
  if (err) {
    console.error(err + "*** test ***");
    return;
  }
  records.forEach(function (record) {
    console.log(record.getId());
  });
});