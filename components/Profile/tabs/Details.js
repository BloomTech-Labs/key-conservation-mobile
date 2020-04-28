import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../constants/Profile/tabs/Details';

import FileIcon from '../../../assets/jsicons/detailAboutUs/File';
import ConnectFurther from '../ConnectFurther';
import HandshakeIcon from '../../../assets/jsicons/detailAboutUs/Handshake';
import RocketIcon from '../../../assets/jsicons/detailAboutUs/Rocket';
import BranchIcon from '../../../assets/jsicons/detailAboutUs/Branch';
import PlusSignCircle from '../../../assets/jsicons/PlusSignCircle';
import TakeAction from '../../../components/TakeAction/TakeActionCallToAction';

import PartnersModal from '../../Partners/PartnersModal';

const Details = (props) => {
  const { data } = props;
  const { profile } = props;

  const [isPartnersModalVisible, setIsPartnersModalVisible] = useState(false);

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
            {/* // April 2020: Props needs to pass properly for donate button */}
            {/* <View>
              <TakeAction donate={props.data} />
            </View> */}
            {/* // April 2020: Projects will be added at a later time */}
            {/* <View style={styles.iconWrap}>
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
            </View> */}
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
              {/* Code below commented out because by default the modal displays
              for some reason...working on it. */}

              {/* <PartnersModal
                setIsPartnersModalVisible={setIsPartnersModalVisible}
                isPartnersModalVisible={isPartnersModalVisible}
              /> */}
              <TouchableOpacity
                style={styles.addProjectsButton}
                onPress={() => {
                  setIsPartnersModalVisible(true);
                  console.log('plus clicked');
                }}
              >
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

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {})(Details);
