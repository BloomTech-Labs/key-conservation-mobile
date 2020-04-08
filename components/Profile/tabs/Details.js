import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from '../../../constants/Profile/tabs/Details';

import FileIcon from '../../../assets/jsicons/detailAboutUs/File';
import ConnectFurther from '../ConnectFurther';
import HandshakeIcon from '../../../assets/jsicons/detailAboutUs/Handshake';
import RocketIcon from '../../../assets/jsicons/detailAboutUs/Rocket';
import BranchIcon from '../../../assets/jsicons/detailAboutUs/Branch';
import PlusSignCircle from '../../../assets/jsicons/PlusSignCircle';

const Details = props => {
  const { profile } = props;

  return (
    <View style={styles.container}>
      {profile.roles !== 'supporter' && (
        <View>
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <FileIcon />
              <Text style={styles.title}>{'About Us'}</Text>
            </View>
            <Text style={styles.body}>{profile.about_us}</Text>

            <View style={styles.iconWrap}>
              <RocketIcon />
              <Text style={styles.title}>{'Support Our Mission'}</Text>
            </View>
            <Text style={styles.body}>
              Donate funds to go towards the overall mission of our conservation
              organization. Your donation will be used to support our team, our
              daily activities and research.
            </Text>
            <TouchableOpacity style={styles.donateButton}>
              <Text style={styles.donateText}>Donate</Text>
            </TouchableOpacity>
            <View style={styles.iconWrap}>
              <BranchIcon />
              <Text style={styles.title}>
                {'Projects Within Our Organization'}
              </Text>
            </View>
            <Text style={styles.body}>
              These projects are directly supported by us and are within our
              organization. They have their own organization pages so the team
              on the ground can better share the work they are doing in the
              field.
            </Text>
            <View style={styles.ProjectPartnerSection}>
              <TouchableOpacity style={styles.addProjectsButton}>
                <PlusSignCircle />
                <Text style={styles.buttonText}>Add a Project</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconWrap}>
              <HandshakeIcon />
              <Text style={styles.title}>{'Our Partners'}</Text>
            </View>
            <Text style={styles.body}>
              These are the organizations that we are currently collaborating
              with in order to spread awareness and raise the resources needed
              to achieve our mission.
            </Text>
            <View style={styles.ProjectPartnerSection}>
              <TouchableOpacity style={styles.addProjectsButton}>
                <PlusSignCircle />
                <Text style={styles.buttonText}>Add a Partner</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Species and Habitats is a feature not yet in place */}
          {/* <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Seedling />
              <Text style={styles.title}>{'Species & Habitats'}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText}>
                {profile.species_and_habitats}
              </Text>
            </View>
          </View> */}
        </View>
      )}
      {profile.roles === 'supporter' && (
        <View style={styles.sections}>
          <ConnectFurther profile={profile} />
        </View>
      )}
    </View>
  );
};

export default Details;
