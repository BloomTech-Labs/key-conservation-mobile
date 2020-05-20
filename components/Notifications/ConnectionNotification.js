import React, {useEffect} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import TimeStamp from './TimeStamp';

{/* TEAL COLOR: #00FF9D */}

const ConnectionNotification = (props) => {

    useEffect(() => {

        // console.log(props);
        // console.log(props.notifData.item.sender_name);
        // console.log(props.notifData.item.sender_Pic);

    });

  const createdAt = props.notifData.item.time;


  const goToCommenterProfile = () => {
    props.nav.push('Pro', {
      selectedProfile: props.notifData.item.sender_id,
    });
  };

    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => { props.nav.push('Connections', (props = { forceOpen: true })) }}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={goToCommenterProfile}>
                        <Avatar
                            size="medium"
                            rounded
                        source={{ 
                            uri: `${props.notifData.item.sender_Pic}` || undefined
                        }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.connectionInfo}>
                        <Text style={styles.connect} onPress={goToCommenterProfile}>{props.notifData.item.sender_name} </Text>
                        wants to connect
                    </Text>
                    <TimeStamp style={styles.timeStamp} createdAt={createdAt}/>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { props.nav.push('Connections', (props = { forceOpen: true })) }}>
                    <Text style = {styles.connect}>Connect</Text>
                </TouchableOpacity>
        
 
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
        marginLeft: 10
    },
    button: {
        flex: 1,
        borderRadius: 7.5,
        height: 27,
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 5,
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
        fontSize: 13,
        fontWeight: "700",
        color: "#B5B5B5"
    }

})

export default ConnectionNotification