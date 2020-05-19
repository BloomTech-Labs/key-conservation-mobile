import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, Button } from 'react-native';
import { Avatar } from 'react-native-elements';


const ConnectionNotification = () => {
    return (
        <TouchableOpacity style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size="medium"
                        rounded
                    // source={{
                    //     uri: profile.profile_image || undefined
                    // }}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.connectionInfo}>Johnathan Tincher wants to connect</Text>
                    <Text style={styles.timeStamp}>8 minutes ago</Text>
                </View>
                <Button style={styles.button} title="Connect" />
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        height: 80
    },
    container: {
        flex: 1,
        height: 20,
        width: "100%",
        padding: 5,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "black",
        // padding: 10,
        borderRadius: 0,
        marginVertical: 6,
    },
    content: {
        flex: 2,
        backgroundColor: 'blue'
    },
    avatarContainer: {
        alignSelf: "center",
        flex: 1
    },
    button: {
        flex: 1
    },
    timeStamp: {
        // color: ""
    }

})

export default ConnectionNotification