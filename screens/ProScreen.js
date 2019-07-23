import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import { Avatar, Icon } from 'react-native-elements';

import { NativeRouter, Route, Link, Switch } from "react-router-native";
import CampScreen from './CampScreen';
import DetailScreen from './DetailScreen'
 
import AppProNav from '../../react-elements/navigation/ProNav';


export default class ProScreen extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0
    }
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  renderSection = () => {
    if (this.state.activeIndex == 0)
    {
      return (
        <View>
          <Text>This is the first section</Text>
        </View>
      )
    }
  }
 
  render() {
    return (
      <ScrollView style={styles.pic}>
      
        <View style={styles.container}>
          <Avatar
            size='large'
            rounded
            source={{
              uri:
                'https://www.seewinter.com/wp-content/uploads/2018/09/poolboy-hatchling-100-1200-wide.jpg'
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.org}>Carribean Sea Turtle Project</Text>
            <Text style={styles.location}>St. George's, Grenada</Text>
            <Text style={styles.social}>@CarribeanSeaTurtleProject</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={{ textAlign: 'left', width: 300 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nemo
              voluptatibus minima neque esse reiciendis rem!
            </Text>
          </View>

          <View>
            <TouchableOpacity style={{ paddingTop: 25, width: 250 }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  height: 35
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 2
                  }}
                >
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
        <View style={styles.buttons}>
        <Button transparent onPress={() =>this.segmentClicked(0)} active={this.state.activeIndex == 0} title="Campaigns" icon={
    <Icon
      name="heartbeat"
      size={1}
      color="red"
      type="font-awesome"
    />
  } />
        
       
        <Button  onPress={() =>this.segmentClicked(0)} active={this.state.activeIndex == 0}  title="Details" style={[this.state.activeIndex == 2 ? {} : { color: "red"}]} />
        
        </View>
        {this.renderSection()}
        </View>
      </ScrollView>
    );
  }
}



ProScreen.navigationOptions = {
  title: 'Profile'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    backgroundColor: '#eee',
    paddingTop: 50,
    paddingBottom: 50,
    flexWrap: 'wrap'
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 90,
    marginRight: 60,
    textAlign: 'center',
    alignItems: 'center'
  },
  bio: {
    marginBottom: 50
  },
  org: {
    fontSize: 22
  },
  pic: {
    flex: 1
  },
  textContainer: {},
  buttons: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    
    borderBottomWidth: 3, 
    borderBottomColor: "whitesmoke", 
   
  }
});
