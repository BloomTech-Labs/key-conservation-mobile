import React, {useState}  from 'react';
import View from "react-native-web/dist/exports/View";
import MapSearchInput from './MapSearchInput'
import {
	Text,
	Button
} from 'react-native'

export const  MapSearchComponent = ()=>{
	const [filterName, setFilterName] = useState();
	const doSearch = ()=>{
	
	}
	
	return(
		<View>
			<Text>Map Search Component</Text>
			<MapSearchInput filterName={filterName} doSearch={doSearch}/>
			<Button onClick={}>Address</Button>
			<Button>Organization</Button>
			<Button>Project </Button>
		</View>
	)
}

