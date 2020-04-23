import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/Profile/tabs/Saved';

const Saved = (props) => {
    const { profile } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Campaigns</Text>
        </View>
    );
};

export default Saved;