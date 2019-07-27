// import React, { useEffect } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';

// import { getCampaigns } from '../store/actions';

// import ProScreen from '../screens/ProScreen';

// function CampOnProfile(props) {
//   let { allCampaigns } = useSelector(state => state);
//   const dispatch = useDispatch();
//   const { navigation } = props;

//   useEffect(() => {
//     dispatch(getCampaigns());
//   }, []);

//   const handlePress = orgId => {
//     navigation.navigate('Pro', { orgId });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {allCampaigns.length > 0 &&
//         allCampaigns.map(campaign => {
//           return (
//             <ProScreen
//               key={campaign.camp_id}
//               data={campaign}
//               handlePress={handlePress}
//               navigation={navigation}
//             />
//           );
//         })}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff'
//   },
//   searchIcon: { marginRight: 20 }
// });

// export default CampOnProfile;
