import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {getOrganizations, setMapSearchQuery} from '../../store/actions'
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
import {TextInput} from "react-native-gesture-handler";

import styles from '../../constants/Search/MapSearchBarComponent';

const  MapSearchBarComponent = (props)=>{
	const [selectionOptions, setSelectedOptions] = useState([
			{
				label:'Location',
				field:'location',
				checked:true
			},
			{
				label:'Organization Name',
				field:'org_name',
				query:'',
				checked:false
			},
			{
				label:'Species and Habitats',
				field:'species_and_habitats',
				checked:false
			},
	])
	const [state, setState] = useState({
		query:'',
		field:'location',
		locationQuery:'',
		shouldOpenFilter:false,
		shouldOpenMessage:true,
		message:'Please enter to search',
	});
	useEffect(()=>{
	},[])
	
	const handleClearText = () => {
		setState({...state, query:''});
		handleQueryChange('')
	}
	
	// Handler for option section changes
	const handleFieldChange = (field)=>{
		selectionOptions.forEach(option =>{
			option.checked = false;
		})
		
		const oldIndex = selectionOptions.findIndex(option =>{
			return option.field === field
		})
		
		const updatedItem = selectionOptions[oldIndex]
		updatedItem.checked = !updatedItem.checked
		
		
		const newArr =
			[ ...selectionOptions.slice(0, oldIndex),
				updatedItem,
				...selectionOptions.slice(oldIndex+1, selectionOptions.length),
			]
		setSelectedOptions([...newArr]);
		if (updatedItem.checked){
			setState({ ...state, field})
			doSearch(field)
		}
	}
	
	// Handler for text field value changes
	const handleQueryChange = (query = state.query) => {
		setState({ ...state, query: query, shouldOpenMessage:true })
		props.setMapSearchQuery(query,state.field)
	}
	
	const doSearch = (field) => {
		props.setMapSearchQuery(state.query, field)
	}
	
	const openFilter = (e)=>{
		setState({...state,
		shouldOpenFilter:!state.shouldOpenFilter,
		shouldOpenMessage:true
	});
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<View style={styles.searchInputContainer}>
					<TouchableOpacity style={styles.dropDownArrow} onPress={openFilter}>
						<MaterialIcons name="arrow-drop-down" size={30} color="#404040"/>
					</TouchableOpacity>
	                <TextInput style={styles.searchInput}
						value={state.query}
						placeholder="Search by City or Country"
						onChangeText={query =>
							handleQueryChange(query)
						}
					/>
					<TouchableOpacity style={[styles.clearButton, (state.query) ?  styles.show :  styles.hide]} onPress={handleClearText}>
						<MaterialIcons name="clear" color={"#ccc"} size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.searchButton} onPress={()=>doSearch(state.field)}>
						<FontAwesome name="search"  size={24} color="#5D8017"/>
					</TouchableOpacity>
				</View>
				<View style={[styles.selectionRow, state.shouldOpenFilter && styles.show]}>
                    <Text style={styles.selectionRowHeader}>Search By Category</Text>
	
					{selectionOptions.map((option) => {
						return <TouchableOpacity key={option.field} style={styles.filterSelectOption}   >
									{ option.checked === true
										? <MaterialIcons onPress={()=>handleFieldChange(option.field )} name="radio-button-checked" size={22} color="#444" style={{marginRight:10}}/>
										: <MaterialIcons onPress={()=>handleFieldChange(option.field )} name="radio-button-unchecked" size={22} color="#444" style={{marginRight:10}}/>
									}
									<Text style={styles.filterOption}>{option.label}</Text>
								</TouchableOpacity>
					})}
					
				</View>
				<View style={[styles.messageContainer, (state.shouldOpenMessage) ?  styles.show :  styles.hide]}>
					<Text style={styles.messageText}>{props.message}</Text>
				</View>
			</View>
		</View>
	)
}


const mapPropsToState = (state)=>{
	let message  = ''
	// Get filtered organization records
	const filteredOrganization = state.filteredOrganization
	// Filter out orgs with null coords
	const cleanedupOrgs = filteredOrganization.filter(coords => coords.latitude && coords.longitude !== null);
	const len = cleanedupOrgs.length
	if ( len <= 0){
		 message = 'No organization found!'
	}else{
		message = `${len} organization${len > 1 ? "s" : ''} found`
	}
	
	return {
		organizations: state.filteredOrganization,
		message:message
	}
}

export default connect(
	mapPropsToState,
	{getOrganizations, setMapSearchQuery})
(MapSearchBarComponent);
