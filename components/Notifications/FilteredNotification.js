import React, {useEffect} from "react";
import { View, TouchableOpacity, Text, Image, Button, StyleSheet } from 'react-native';

import ConnectionNotification from './ConnectionNotification';
// import CampaignNotification from "../../components/Notifications/CampaignNotification";

const FilteredNotification = (props) => {

    useEffect(() => {

        console.log(props.notifData.item.notification_type);
        // console.log(props.notifData.item.sender_name);
        // console.log(props.notifData.item.sender_Pic);

    });

    // switch(props.notifData.item.notification_type) {

    //     case 1:
    //         return <ConnectionNotification />
    //     case 2:
    //         return <ConnectionNotification />

    //     default: 
    //         return <Text>No new notifications</Text>

    // }

    return <Text>{props.notifData.item.notification_type}</Text>
};

export default FilteredNotification;