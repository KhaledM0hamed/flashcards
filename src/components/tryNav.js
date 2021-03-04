
// import * as React from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

// class DetailsScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>Details!</Text>
//             </View>
//         );
//     }
// }

// class HomeScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
//                 <Button
//                     title="Go to Details"
//                     onPress={() => this.props.navigation.navigate('Details')}
//                 />
//             </View>
//         );
//     }
// }

// class SettingsScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                 <Button
//                     title="Go to Details"
//                     onPress={() => this.props.navigation.navigate('Details')}
//                 />
//             </View>
//         );
//     }
// }

// const HomeStack = createStackNavigator({
//     Home: HomeScreen,
//     Details: DetailsScreen,
// });

// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
//     Details: DetailsScreen,
// });

// export default createAppContainer(
//     createBottomTabNavigator(
//         {
//             Home: HomeStack,
//             Settings: SettingsStack,
//         }
//     )
// );


