import React from "react";
import { View, TouchableOpacity, Text, Image, Button, StyleSheet } from 'react-native';

const CampaignNotification = ({sender_name, campaign_update_type}) => {
    return (
        <TouchableOpacity>
        <View>
            <View>
                <Text> 
                  <Text style={styles.sender}>{sender_name}</Text> has a <Text style={styles.update}>{campaign_update_type}</Text> campaign post
                </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sender: {
        fontWeight: 'bold'
    },
    update: {
        fontWeight: 'bold',
        color: 'red'
    }
})

export default CampaignNotification;