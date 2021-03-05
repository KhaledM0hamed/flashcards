import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import { setLocalNotification } from "./src/utils/helpers";
import reducer from './src/reducers'
import Home from './src/components/Home'
import Tabs from './src/components/TabNavigator'
import thunk from 'redux-thunk';
import { handleInitialData } from './src/actions/index';

const store = createStore(reducer,  applyMiddleware(thunk))

class App extends Component {

	componentDidMount() {
		setLocalNotification()
		handleInitialData()

	}

	render() {
		return (
			<Provider store={store}>
				<Tabs />
			</Provider>
		)
	}
}



export default App 
