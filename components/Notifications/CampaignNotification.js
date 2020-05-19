import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Button, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const CampaignNotification = (props) => {
    // useEffect(() => {

    //     // console.log(props);
    //     // console.log(props.notifData.item.sender_name);
    //     // console.log(props.notifData.item.sender_Pic);

    // });

    return (
        <TouchableOpacity style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size="medium"
                        rounded
                    source={{ 
                        uri: `${props.notifData.item.sender_Pic}` || undefined
                    }}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.connectionInfo}>{props.notifData.item.sender_name} has a {props.notifData.item.campaign_update_type} campaign post</Text>
                    <Text style={styles.timeStamp}>8 minutes ago</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size="medium"
                    source={{ 
                        uri: `${props.notifData.item.campaign_pic}` || undefined
                    }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        height: 80,
        backgroundColor:'white'
    },
    container: {
        flex: 1,
        height: 20,
        width: "100%",
        padding: 5,
        flexDirection: "row",
        // padding: 10,
        borderRadius: 0,
        marginVertical: 6,
        alignItems: 'center'
    },
    content: {
        flex: 4,
        marginLeft: 10

    },
    avatarContainer: {
        alignSelf: "center",
        flex: 1,
        marginLeft: 10  //no need to put px all numbers are already knownas it? Ok,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        height: 30,
        padding:10,
        margin: 5,
        justifyContent:"center",
        color: 'black',
        backgroundColor: '#00FF9D',
        alignItems:"center",
        shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.6,
        elevation: 10,
        

    },
    connect: {

        fontFamily: "Lato",
        fontWeight: "bold"

    },
    connectionInfo:{
        fontFamily: "Lato",
        fontSize: 17,

    },
    timeStamp: {
        fontFamily: "Lato",
        fontSize: 16,
        fontWeight: "700",
        color: "#ADADAD"
    }
})

export default CampaignNotification;