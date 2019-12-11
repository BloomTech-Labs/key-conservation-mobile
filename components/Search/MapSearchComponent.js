import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {getOrganizations, setMapSearchCategory, setMapSearchQuery} from '../../store/actions'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
import {TextInput} from "react-native-gesture-handler";
import GooglePlacesInput from './GooglePlacesInput'



const  MapSearchBarComponent = (props)=>{
	const [shouldOpenFilter, setShouldOpenFilter] = useState(false);
	const [message, setMessage] =  useState('Please enter to search');
	
	const [state, setState] = useState({
		query:'',
		key:'location',
	});
	
	const reset = () => {
		setState({...state, query:'', key:''});
	}

	const handleSearch = ()=>{
		console.log('searching query', state.query)
		console.log('searching key', state.key)
		props.setMapSearchQuery( state.query, state.key)
		// reset();
	}
	
	const handleSelectKey = (key)=>{
		console.log('shandleSelectKey', key)
		setState({...state, key:key});
		// console.log('state', state)
	}
	
	const openFilter = (e)=>{
		console.log('openFilter')
		setShouldOpenFilter(!shouldOpenFilter)
	}
	
	const getCoordsFromName = (data, details) => {
		console.log('loc', data)
		setState({ ...state, query: data })
		handleSearch(data)
		// console.log('details', details)
		//  const coords = {
		// 	latitue:loc.lat,
		// 	longitude:loc.lng,
		// }
		//
		// console.log('coords',coords )
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.searchInputContainer}>
					<TouchableOpacity style={styles.dropDownArrow} onPress={openFilter}>
						<MaterialIcons name="arrow-drop-down" size={30}/>
					</TouchableOpacity>
					{/*<TextInput*/}
					{/*	style={styles.searchInput}*/}
					{/*	value={state.query}*/}
					{/*	placeholder='Search by city or organization'*/}
					{/*	onChangeText={text =>*/}
					{/*		setState({ ...state, query: text })*/}
					{/*	}*/}
					{/*/>*/}
					<GooglePlacesInput notifyChange={(data, details) => getCoordsFromName(data, details)}/>
					<TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
						<FontAwesome name="search"  size={30}/>
					</TouchableOpacity>
				</View>
				<Text>{props.message}</Text>
				<View style={[styles.selectionRow]} >
					<TouchableOpacity onPress={()=>handleSelectKey('location')}><Text>Location</Text></TouchableOpacity>
					<TouchableOpacity  onPress={()=>handleSelectKey('org_name')}><Text>Organization Name</Text></TouchableOpacity>
				</View>
		</View>
	
	)
}

const styles = StyleSheet.create({
	container: {
		display:'flex',
		flexDirection:'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:"yellow",
		border:5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		height:150,
	},
	
	searchInputContainer:{
		flexDirection:'row',
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
		height:60,
		width:'100%'
	},
	selectionRow:{
		fontSize:24,
		fontWeight:700,
		backgroundColor:"green",
		padding:10,
		alignSelf: 'stretch',
	},
	
	searchInput: {
		flex: 1,
		padding: '3%',
		backgroundColor:"#00FF9D",
		fontSize:20,
		height:50,
		fontWeight:600
	},
	dropDownArrow:{
		width:50,
		height:50,
		display:'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchButton:{
		width:50,
		height:50,
		backgroundColor:'green',
		borderRadius:5,
		display:'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	keyInput: {
		padding: '5%',
		backgroundColor:"yellow",
		fontSize:20
	},
	
});

const mapPropsToState = (state)=>{
	let message  = ''
	
	const orgs = state.filteredOrganization
	
	if ( orgs.length <= 0){
		 message = 'There is no data found!'
	}else{
		message = `${orgs.length} results found`
	}
	
	return {
		organizations: state.filteredOrganization,
		message:message
	}
}

export default connect(
	mapPropsToState,
	{getOrganizations, setMapSearchCategory, setMapSearchQuery})
(MapSearchBarComponent);
