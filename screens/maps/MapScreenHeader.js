import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreenHeader = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>See Organizations</Text>
        </View>
    )
}

export default MapScreenHeader; 

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#323338',
        width: '100%'
    },
    headerTitle: {

    }
})