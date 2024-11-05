import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import places from '../constants/places';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Map = () => {
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (mapRef.current) {
            const coordinates = places.map((item) => ({
                latitude: item.coordinates[0].lat,
                longitude: item.coordinates[0].lng,
            }));
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, []);

    const handleNextMarker = () => {
        const nextIndex = (currentIndex + 1) % places.length;
        setCurrentIndex(nextIndex);

        const { lat, lng } = places[nextIndex].coordinates[0];
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
                <Icons type={'arrow'}/>
            </TouchableOpacity>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 52.215933,
                    longitude: 19.134422,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
                {places.map((item) => (
                    <Marker
                        key={item.city}
                        coordinate={{
                            latitude: item.coordinates[0].lat,
                            longitude: item.coordinates[0].lng,
                        }}
                        title={item.city}
                    />
                ))}
            </MapView>
            <TouchableOpacity style={styles.btn} onPress={handleNextMarker}>
                <Text style={styles.btnText}>Next place</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btn: {
        position: 'absolute',
        bottom: 40,
        left: '35%',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#990000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    iconBack: {
        padding: 10,
        transform: [{ rotate: '180deg' }],
        width: 65,
        height: 65,
        position: 'absolute',
        top: height * 0.05,
        left: 15,
        zIndex: 10
    },
});

export default Map;
