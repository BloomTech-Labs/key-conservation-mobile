import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { getOrganizations, setMapSearchQuery } from '../../store/actions';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../../constants/Map/MapSearchBarComponent';
import Search from '../../assets/jsicons/mapIcons/searchIconColor';
import ClearIcon from '../../assets/jsicons/mapIcons/clearIcon';
import Sliders from '../../assets/jsicons/mapIcons/Sliders';
import CheckActive from '../../assets/jsicons/mapIcons/check-active';
import CheckInactive from '../../assets/jsicons/mapIcons/check-inactive';

const MapSearchBarComponent = (props) => {
  const [selectionOptions, setSelectedOptions] = useState([
    {
      label: 'Location',
      field: 'location',
      checked: true,
    },
    {
      label: 'Organization',
      field: 'name',
      query: '',
      checked: false,
    },
    // species and habitats to be used in future product cycle
    // {
    // 	label:'Species and Habitats',
    // 	field:'species_and_habitats',
    // 	checked:false
    // },
  ]);

  const [state, setState] = useState({
    query: '',
    field: 'location',
    locationQuery: '',
    shouldOpenFilter: false,
    shouldShowSearch: true,
    message: 'Please enter to search',
    latitude: 0,
    longitude: 0,
  });

  // Clean up when navigate to a different screen
  useEffect(() => {
    setState({
      ...state,
      query: '',
      shouldOpenFilter: false,
      shouldShowSearch: true,
    });
  }, [!props.isFocused]);

  const handleClearText = () => {
    setState({ ...state, query: '', shouldShowSearch: true });
    handleQueryChange('');
  };

  // Handler for option section changes
  const handleFieldChange = (field) => {
    selectionOptions.forEach((option) => {
      option.checked = false;
    });

    const oldIndex = selectionOptions.findIndex((option) => {
      return option.field === field;
    });

    const updatedItem = selectionOptions[oldIndex];
    updatedItem.checked = !updatedItem.checked;

    const newArr = [
      ...selectionOptions.slice(0, oldIndex),
      updatedItem,
      ...selectionOptions.slice(oldIndex + 1, selectionOptions.length),
    ];

    setSelectedOptions([...newArr]);
    if (updatedItem.checked) {
      setState({ ...state, field });
      doSearch(field);
    }
  };

  // Handler for text field value changes
  async function handleQueryChange(query = state.query) {
    // console.log('query', query);
    setState({ ...state, query: query });
    props.setMapSearchQuery(query, state.field);

    // Google Places API iOS
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDNSJvHyNd-86fimhQLo_ivS0hF_S4n1U0&input=${query}&location=${latitude}, ${longitude}&radius=2000`;

    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      console.log(json);
    } catch (err) {
      console.log(
        err,
        'This is the asyn await error on the google places api on the MapsSearchComponent Screen'
      );
    }
  }

  const handleInputBlur = () => {
    // console.log('handleInputBlur');
    // show search icon
    if (state.query === '') {
      // console.log("state.query===''");
      setState({ ...state, shouldShowSearch: true });
    }
  };

  const handleInputFocus = () => {
    // console.log('handleInputFocus');
    setState({ ...state, shouldShowSearch: false });
  };

  const doSearch = (field) => {
    props.setMapSearchQuery(state.query, field);
  };

  const openFilter = (e) => {
    setState({ ...state, shouldOpenFilter: !state.shouldOpenFilter });
  };

  const renderSearchIcon = (stateProps) => {
    if (stateProps) {
      return (
        <TouchableOpacity style={[styles.searchButton]}>
          <Search />
        </TouchableOpacity>
      );
    }
  };

  const renderClearIcon = (stateProps) => {
    if (stateProps) {
      return (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearText}>
          <ClearIcon />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.outterContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={[
                styles.searchInput,
                { paddingLeft: state.shouldShowSearch ? 50 : 16 },
              ]}
              value={state.query}
              placeholder="See dropdown for options"
              onFocus={() => handleInputFocus()}
              onBlur={() => handleInputBlur()}
              onChangeText={(query) => handleQueryChange(query)}
            />
            {renderSearchIcon(state.shouldShowSearch)}
            {renderClearIcon(state.query)}
            <TouchableOpacity
              style={styles.dropDownArrowButton}
              onPress={openFilter}
            >
              <Sliders style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.selectionRow, state.shouldOpenFilter && styles.show]}
        >
          {selectionOptions.map((option) => {
            return (
              <TouchableOpacity
                key={option.field}
                style={styles.filterSelectOption}
                onPress={() => handleFieldChange(option.field)}
              >
                {option.checked === true ? (
                  <CheckActive style={{ marginRight: 16 }} />
                ) : (
                  <CheckInactive style={{ marginRight: 16 }} />
                )}
                <Text style={styles.filterOption}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={[styles.messageContainer]}>
            <Text style={styles.messageText}>{props.message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapPropsToState = (state) => {
  let message = '';
  // Get filtered organization records
  const filteredOrganization = state.filteredOrganization;
  // Filter out orgs with null coords
  const len = filteredOrganization.length;
  if (len <= 0) {
    message = 'No organization found!';
  } else {
    message = `${len} organization${len > 1 ? 's' : ''} found`;
  }

  return {
    organizations: state.filteredOrganization,
    message: message,
  };
};

export default connect(mapPropsToState, {
  getOrganizations,
  setMapSearchQuery,
})(withNavigationFocus(MapSearchBarComponent));
