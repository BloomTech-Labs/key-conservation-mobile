import React, { Component } from 'react';
import { View, Text, Keyboard, ActivityIndicator, Animated } from 'react-native';

import { connect } from 'react-redux';

import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftBlack';

import styles from '../../constants/Auth/AuthForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginForm from './LoginForm';

class AuthForm extends Component {
	constructor(props) {
		super(props);

		this.TABS = [ 'Log In', 'Sign Up' ];

		this.state = {
			loadingOpacity : new Animated.Value(0),
			keyboardOpen   : false,
			currentTab     : 0,
		};

		this.animateLoadIn = Animated.timing(this.state.loadingOpacity, {
			toValue : 1,
		});

		this.animateLoadOut = Animated.timing(this.state.loadingOpacity, {
			toValue : 0,
		});
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardOpen: true }));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
			this.setState({ keyboardOpen: false }),
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	realmLogin = (username, password) => {
		this.props.realmLogin(username, password);
	};

	componentDidUpdate() {
		if (this.props.loading) {
			this.animateLoadIn.start();
		} else {
			this.animateLoadOut.start();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View
					pointerEvents={this.props.loading ? 'auto' : 'none'}
					style={[ styles.loading, { opacity: this.state.loadingOpacity } ]}>
					<ActivityIndicator size='large' />
				</Animated.View>
				<View style={styles.tabSelector}>
					{this.TABS.map((tab, index) => {
						return (
							<View key={index} style={styles.tabContainer}>
								<TouchableOpacity onPress={() => this.setState({ currentTab: index })} style={styles.tab}>
									<Text style={styles.tabText}>{tab}</Text>
									{this.state.currentTab === index && <View style={styles.selectedTab} />}
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
				<View style={styles.headerSection}>
					<TouchableOpacity
						onPress={() => {
							this.props.goBack();
						}}
						style={styles.backButton}>
						<ChevronLeft fill='#000' />
					</TouchableOpacity>
					<Text style={styles.headerText}>
						{this.state.currentTab ? 'Sign up' : 'Log in'} as a {this.props.role}
					</Text>
				</View>
				<View style={styles.formContent}>
					{this.state.currentTab && this.state.confirmPassowrd ? (
						<Text>Confirm Password</Text>
					) : (
						<LoginForm
							type={this.state.currentTab}
							realmLogin={this.state.currentTab ? this.props.createUser : this.props.realmLogin}
						/>
					)}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	loading : state.pending.login,
});

export default connect(mapStateToProps, {})(AuthForm);
