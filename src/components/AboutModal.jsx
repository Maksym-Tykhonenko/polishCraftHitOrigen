import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const AboutModal = ({ visible, onClose }) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.modalText}>
                    Welcome to <Text style={styles.bold}>Polish Craft Hit</Text> - your gateway to the rich world of Polish culture! Our mission is to immerse you in an exciting journey where traditional crafts come to life and ancient legends become a part of your experience.
                    </Text>
                    <Text style={styles.modalText}>
                    At <Text style={styles.bold}>Polish Craft Hit,</Text> we’ve combined all the elements that shape the uniqueness of Polish heritage into one app. Here’s what you will find with us:
                    </Text>
                    <Text style={styles.title}>Artistic Journey</Text>
                    <Text style={styles.modalText}>
                    Explore the diverse crafts of Poland through the captivating rooms of our virtual museum. Each craft opens a new world where traditions intertwine with modernity, allowing you to touch every aspect of Polish art.
                    </Text>
                    <Text style={styles.title}>Legends</Text>
                    <Text style={styles.modalText}>
                    Dive into a world of magic and myths! Our collection of Polish legends will transport you to times when heroes and gods walked the earth. Discover new stories and learn about their influence on Polish culture.
                    </Text>
                    <Text style={styles.title}>What to See (Top 10 Polish Cities)</Text>
                    <Text style={styles.modalText}>
                    Familiarize yourself with the most beautiful cities in Poland that are worth visiting! Explore the history, architecture, and culture of each of these cities and learn why they are important to Polish heritage.
                    </Text>
                    <Text style={styles.title}>Quiz</Text>
                    <Text style={styles.modalText}>
                    Test your knowledge of Polish culture with our quiz! Answer questions and learn more about traditions, crafts, and the history of Poland. It’s not just fun; it’s educational!
                    </Text>
                    <Text style={styles.title}>Craft Products Museum</Text>
                    <Text style={styles.modalText}>
                    Our virtual exhibition provides an opportunity to see unique folk art creations. You can learn about the techniques used in crafting each piece and delve into the depth of Polish craftsmanship.
                    </Text>
                    <Text style={styles.title}>Daily Game</Text>
                    <Text style={styles.modalText}>
                    Try your luck with our daily game! Each day brings new challenges and opportunities that allow you to learn and grow in the world of Polish culture.
                    </Text>
                    <Text style={styles.title}>Historical Facts</Text>
                    <Text style={styles.modalText}>
                    Explore intriguing facts about Polish history that highlight the importance of cultural heritage. Discover how the past shapes the present and influences our today.
                    </Text>
                    <Text style={styles.title}>Our Mission</Text>
                    <Text style={styles.modalText}>
                    We believe that culture is a living, dynamic process. At <Text style={styles.bold}>Polish Craft Hit,</Text> we strive to make Polish heritage accessible and engaging for everyone. Our team works to ensure that every aspect of our app inspires you to explore, learn, and perhaps even create your own works of art, drawing on the rich cultural experience.
                    </Text>
                    <Text style={styles.modalText}>
                    Join us on this incredible journey, where traditions come alive, and your love for culture grows! Discover, learn, enjoy - and let <Text style={styles.bold}>Polish Craft Hit</Text> be your faithful companion in the world of Polish culture!
                    </Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icons type={'close'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        height: '65%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        color: '#817a6e'
    },
    title: {
        fontSize: 21,
        marginBottom: 10,
        textAlign: 'center',
        color: '#e1251b',
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default AboutModal;
