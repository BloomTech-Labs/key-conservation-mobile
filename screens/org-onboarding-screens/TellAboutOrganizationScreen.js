import React from "react";
import { Button, View, StyleSheet, Text, TextInput} from "react-native";

const TellAboutOrganizationScreen = () => {
    return (
        <View>
            <Text>Tell us about your organization.</Text>
            <Text>We will want to make sure we can autosave your progress. So first things first: let's get you some login credentials.</Text>
            <Text>Organization Name</Text>
            <TextInput style={styles.inputfield} />
            <Text>Organization Address</Text>
            <TextInput style={styles.inputfield}/>
            <Text>Organization Phone</Text>
            <TextInput style={styles.inputfield}/>
            <Text>WebsiteURL</Text>
            <TextInput style={styles.inputfield}/>
            <Button 
                title="Next"
                onPress={() => {
                }}
            />
        </View>
    );
}
 export default TellAboutOrganizationScreen;

 const styles = StyleSheet.create({
     inputfield: {
        borderColor: "black",
        borderWidth: 1
     }
 })