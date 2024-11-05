import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const MenuPanel = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        setTimeout(() => navigation.navigate(screen), 0);
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'HomeScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('HomeScreen')}>
                    <Icons type={'home'} active={activeButton === 'HomeScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'ArtsScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('ArtsScreen')}>
                    <Icons type={'arts'} active={activeButton === 'ArtsScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'LegendsScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('LegendsScreen')}>
                    <Icons type={'legends'} active={activeButton === 'LegendsScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'PlacesScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('PlacesScreen')}>
                    <Icons type={'places'} active={activeButton === 'PlacesScreen'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height * 0.12,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#e1251b',
        borderTop: 1,
        borderColor: '#e1251b',
        borderRadius: 20,
        alignSelf: "center",
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 45,
        height: 45,
        padding: 5
    },
    activeButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
    }
});

export default MenuPanel;
