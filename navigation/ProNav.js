import {createStackNavigator, createAppContainer} from 'react-navigation';

import CampScreen from '../screens/CampScreen'

const ProNav = createStackNavigator({
 
  Profile: {screen: CampScreen},
});

const AppProNav = createAppContainer(ProNav);

export default AppProNav;