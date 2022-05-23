import React from 'react';
import { View, TextInput } from 'react-native';

import Search from '../../assets/jsicons/SearchIcon';
import styles from '../../constants/Partners/SearchBar';

const SearchBar = () => {
  return (
    <View style={styles.background}>
      <Search />
      <TextInput></TextInput>
    </View>
  );
};

export default SearchBar;
