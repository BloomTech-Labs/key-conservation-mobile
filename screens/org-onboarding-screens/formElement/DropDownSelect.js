import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet } from 'react-native';

class DropDownSelect extends Component {
  render() {
    let data = [
      {
        value: 'Species 1'
      },
      {
        value: 'Species 2'
      },
      {
        value: 'Species 1'
      }
    ];

    return (
      <Dropdown
        label="Species / Habitats"
        data={data}
      />
    );
  }
}

export default DropDownSelect;
