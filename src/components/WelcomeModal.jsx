import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from './Icons';

const WelcomeModal = ({ visible, onClose }) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalText, {color: '#544d40', fontWeight: '600'}]}>
                    Open the Door to Polish Culture!
                    </Text>
                    <Text style={styles.modalText}>
                    Immerse yourself in the enchanting world of traditional crafts that enrich our diverse heritage. Explore captivating stories, uncover new horizons, and delight in the beauty of Poland’s cultural legacy.
                    </Text>
                    <TouchableOpacity style={styles.startBtn} onPress={onClose}>
                        <Text style={styles.btnText}>Start</Text>
                    </TouchableOpacity>
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
    },
    startBtn: {
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#990000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        marginTop: 10
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
});

export default WelcomeModal;
