import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share, Dimensions, ScrollView, ImageBackground } from "react-native";
import legends from "../constants/legends.js";

const { height } = Dimensions.get('window');

const Legends = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLegend, setSelectedLegend] = useState(null);

    const handleShare = async () => {
        if (selectedLegend) {
            try {
                await Share.share({
                    message: `${selectedLegend.name}\n\n${selectedLegend.legend}`,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        }
    };

    const renderCategories = () => (
        <View style={{width: '100%', marginTop: height * 0.13}}>
            {legends.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => setSelectedCategory(category)}
                >
                    <Text style={styles.buttonText}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderLegends = () => (
        <View style={{width: '100%', marginTop: height * 0.13, paddingBottom: height * 0.01}}>
            <ScrollView style={{width: '100%'}}>
            {selectedCategory.legends.map((legend, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => setSelectedLegend(legend)}
                >
                    <Text style={styles.buttonText}>{legend.name}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.goBackButton} onPress={() => setSelectedCategory(null)}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>

            </ScrollView>
        </View>
    );

    const renderLegendDetails = () => (
        <View style={{width: '100%', marginTop: height * 0.07}}>
            <ScrollView style={{width: '100%'}}>
                <View style={styles.legendsTextBox}>
                    <Text style={styles.legendName}>{selectedLegend.name}</Text>
                    <Text style={styles.legendText}>{selectedLegend.legend}</Text>
                </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goBackButton} onPress={() => setSelectedLegend(null)}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>

            </ScrollView>
        </View>
    );

    return (
        <ImageBackground source={require('../assets/newDiz/loader3.png')} style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>Legends</Text>
            {selectedLegend
                ? renderLegendDetails()
                : selectedCategory
                ? renderLegends()
                : renderCategories()}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#990000'
    },
    button: {
        padding: 15,
        borderColor: '#990000',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 12,
        width: '100%',
        backgroundColor: '#f9f9f9'
    },
    buttonText: {
        color: "#990000",
        fontSize: 17,
        textAlign: "center",
        fontWeight: '500'
    },
    goBackButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#e06666",
        borderRadius: 10,
    },
    goBackText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    legendsTextBox: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 7,
    },
    legendName: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: 'center'
    },
    legendText: {
        fontSize: 17,
        color: "#333",
        marginVertical: 10,
        textAlign: 'center'
    },
    shareButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#990000",
        borderRadius: 10,
    },
    shareText: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
    },
});

export default Legends;
