import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';
import { getOrganizations, setMapSearchQuery } from '../../store/actions';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../../constants/Search/MapSearchBarComponent';
import SvgUri from 'react-native-svg-uri';

const MapSearchBarComponent = props => {
  const [selectionOptions, setSelectedOptions] = useState([
    {
      label: 'Location',
      field: 'location',
      checked: true
    },
    {
      label: 'Organization',
      field: 'org_name',
      query: '',
      checked: false
    }
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
    message: 'Please enter to search'
  });

  // Clean up when navigate to a different screen
  useEffect(() => {
    setState({
      ...state,
      query: '',
      shouldOpenFilter: false,
      shouldShowSearch: true
    });
  }, [!props.isFocused]);

  const handleClearText = () => {
    setState({ ...state, query: '', shouldShowSearch: true });
    handleQueryChange('');
  };

  // Handler for option section changes
  const handleFieldChange = field => {
    selectionOptions.forEach(option => {
      option.checked = false;
    });

    const oldIndex = selectionOptions.findIndex(option => {
      return option.field === field;
    });

    const updatedItem = selectionOptions[oldIndex];
    updatedItem.checked = !updatedItem.checked;

    const newArr = [
      ...selectionOptions.slice(0, oldIndex),
      updatedItem,
      ...selectionOptions.slice(oldIndex + 1, selectionOptions.length)
    ];

    setSelectedOptions([...newArr]);
    if (updatedItem.checked) {
      setState({ ...state, field });
      doSearch(field);
    }
  };

  // Handler for text field value changes
  const handleQueryChange = (query = state.query) => {
    console.log('query', query);
    setState({ ...state, query: query });
    props.setMapSearchQuery(query, state.field);
  };

  const handleInputBlur = () => {
    console.log('handleInputBlur');
    // show search icon
    if (state.query === '') {
      console.log("state.query===''");
      setState({ ...state, shouldShowSearch: true });
    }
  };

  const handleInputFocus = () => {
    console.log('handleInputFocus');
    setState({ ...state, shouldShowSearch: false });
  };

  const doSearch = field => {
    props.setMapSearchQuery(state.query, field);
  };

  const openFilter = e => {
    setState({ ...state, shouldOpenFilter: !state.shouldOpenFilter });
  };

  const renderSearchIcon = stateProps => {
    if (stateProps) {
      return (
        <TouchableOpacity style={[styles.searchButton]}>
          <FontAwesome
            name='search'
            style={[styles.icon]}
            size={24}
            color='#333333'
          />
        </TouchableOpacity>
      );
    }
  };

  const renderClearIcon = stateProps => {
    if (stateProps) {
      return (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearText}>
          <MaterialIcons
            tyle={styles.icon}
            name='clear'
            color={'#ccc'}
            size={24}
          />
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
                { paddingLeft: state.shouldShowSearch ? 50 : 16 }
              ]}
              value={state.query}
              placeholder='See dropdown for options'
              onFocus={() => handleInputFocus()}
              onBlur={() => handleInputBlur()}
              onChangeText={query => handleQueryChange(query)}
            />
            {renderSearchIcon(state.shouldShowSearch)}
            {renderClearIcon(state.query)}
            <TouchableOpacity
              style={styles.dropDownArrowButton}
              onPress={openFilter}
            >
              <FontAwesome
                style={styles.icon}
                name='sliders'
                size={24}
                color='#333333'
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.selectionRow, state.shouldOpenFilter && styles.show]}
        >
          {selectionOptions.map(option => {
            return (
              <TouchableOpacity
                key={option.field}
                style={styles.filterSelectOption}
                onPress={() => handleFieldChange(option.field)}
              >
                {option.checked === true ? (
                  <SvgUri
                    width='26'
                    height='26'
                    style={{ marginRight: 16 }}
                    source={require('../../assets/icons/check-active.svg')}
                  />
                ) : (
                  <SvgUri
                    width='26'
                    height='26'
                    style={{ marginRight: 16 }}
                    source={require('../../assets/icons/check-inactive.svg')}
                  />
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

const mapPropsToState = state => {
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
    message: message
  };
};

export default connect(mapPropsToState, {
  getOrganizations,
  setMapSearchQuery
})(withNavigationFocus(MapSearchBarComponent));
