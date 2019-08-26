How to import and use icons.
These pro icons are from https://fontawesome.com
SVG URI package is found here https://github.com/vault-development/react-native-svg-uri

- SVG URI do not support an onPress Prop. You need to wrap it with in a TouchableOpacity and put the onPress on the TouchableOpacity.

- Reason we're not using the fontawesome package to display the icons: We do not want to expose the StakeHolder license key on GitHub.

1. Navigate to the FontAwesome website, find the desired icon and download it as an SVG file and drop it into the icons folder.
2. Import SVG into /icons folder
3. Go to the page/component where it will be used and import : "import SvgUri from 'react-native-svg-uri';"
4. Here is an example:
   <SvgUri
   fill='#3b3b3b' - DO NOT USE COLOR use FILL you can find more on the supported props on the package website.
   width='25'
   height='25'
   source={require('../../assets/icons/clipboard.svg')}
   />
5. Here is a focused example for the Navigation bar. Found in MainNavigation.js.
   It is focused/filled when a user is on the current page :
   tabBarIcon: ({ focused }) => (
   <SvgUri
   fill='#3b3b3b'
   width='25'
   height='25'
   source={
   focused
   ? require('../assets/icons/home-fill.svg')
   : require('../assets/icons/home.svg')
   }
   />
   )
