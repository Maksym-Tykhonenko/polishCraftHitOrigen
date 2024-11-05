import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const Museum = ({ name, museum }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleItemPress = (index) => {
        setSelectedItemIndex(index === selectedItemIndex ? null : index);
    };

    return (
        <ImageBackground source={require('../assets/newDiz/loader3.png')} style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <ScrollView style={{width: '100%'}}>
            {museum.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    {selectedItemIndex === index ? (
                        <View style={styles.detailContainer}>
                            <Image source={item.image} style={styles.itemImageLarge} />
                            <Text style={styles.itemCharacteristic}>{item.characteristic}</Text>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => handleItemPress(index)}
                            >
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => handleItemPress(index)}
                        >
                            <Image source={item.image} style={styles.itemImage} />
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            </ScrollView>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: height * 0.18,
        paddingTop: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        color: '#990000'
    },
    itemContainer: {
        marginBottom: 20,
    },
    itemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    itemName: {
        fontSize: 16,
        marginLeft: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    detailContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    itemImageLarge: {
        width: 170,
        height: 160,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    itemCharacteristic: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        color: '#333333',
    },
    backButton: {
        backgroundColor: '#e06666',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 16,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
});

export default Museum;
