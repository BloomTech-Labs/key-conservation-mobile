import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = (props) => {
	return (
		<GooglePlacesAutocomplete
			placeholder='Search'
			minLength={2} // minimum length of text to search
			autoFocus={true}
			returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
			keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
			listViewDisplayed={false}    // true/false/undefined
			fetchDetails={true}
			renderDescription={row => row.description} // custom description render
			onPress={(data, details) => { // 'details' is provided when fetchDetails = true
				props.notifyChange(details.geometry.location)
			}}
			textInputProps={{
				onChangeText: (data, details) => { // 'details' is provided when fetchDetails = true
					props.notifyChange(data, details)
				}
			}}
			getDefaultValue={() => ''}
			
			query={{
				// available options: https://developers.google.com/places/web-service/autocomplete
				key: '',
				language: 'en', // language of the results
				types: '(cities)' // default: 'geocode'
			}}
			
			styles={{
				textInputContainer: {
					width: '100%'
				},
				description: {
					fontWeight: 'bold'
				},
				predefinedPlacesDescription: {
					color: '#1faadb'
				}
			}}
			
			currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
			currentLocationLabel="Current location"
			nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
			GoogleReverseGeocodingQuery={{
				// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
			}}
			GooglePlacesSearchQuery={{
				// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
				rankby: 'distance',
				type: 'cafe'
			}}
			
			GooglePlacesDetailsQuery={{
				// available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
				fields: 'formatted_address',
			}}
			
			filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
			
			debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
			// renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
			// renderRightButton={() => <Text>Custom text after the input</Text>}
		/>
	);
}
export default GooglePlacesInput;
