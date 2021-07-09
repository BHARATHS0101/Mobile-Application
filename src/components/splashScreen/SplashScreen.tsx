import React, {useEffect} from "react";
import {
    View, 
    Text,
} from 'react-native';
import { useNavigation } from "@react-navigation/core";

import Styles from './SplashScreen.styles';

const SplashScreen = () => {
    const navigation = useNavigation<NavigationNS.SplashScreenAuthStackProps['navigation']>();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login");
        }, 3000);
    });

    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.text}>{'CARGER'}</Text>
        </View>
    );

};

export default SplashScreen;