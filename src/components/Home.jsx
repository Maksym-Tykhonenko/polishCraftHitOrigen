import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MusicProvider } from '../constants/music';
import MusicPlayer from './MusicPlayer';
import UserProfile from './UserProfile';
import WelcomeModal from './WelcomeModal';
import AboutModal from './AboutModal';
import SettingsModal from './SettingsModal';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);

    const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
    const [userName, setUserName] = useState('');  

    const loadAvatar = async () => {
        try {
          const storedImageUri = await AsyncStorage.getItem('uploadedImage');
            
          if (storedImageUri) {
            setUploadedImage(({ uri: storedImageUri }));
        } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      };
    
      const loadName = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userProfile');
          setUserName(storedName || '');
        } catch (error) {
          console.error('Error loading name:', error);
        }
      };
    
      useEffect(() => {
        loadAvatar();
        loadName();
      }, []);

      const closeWelcomeModal = () => {
        setWelcomeModalVisible(false);
    }

      const closeUserProfileModal = async () => {
        setUserProfileModalVisible(false);
        await loadAvatar();
        await loadName();
    };

    const closeSettingsModal = async () => {
        setSettingsModalVisible(false);
        setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        await loadAvatar();
        await loadName();
    };

    return(
        <MusicProvider>
        <MusicPlayer />
        <ImageBackground source={require('../assets/newDiz/loader3.png')} style={{flex: 1}}>
        <View style={styles.container}>

            <TouchableOpacity style={styles.userContainer} onPress={() => setUserProfileModalVisible(true)}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={uploadedImage} 
                        style={styles.avatarImage}
                    />
                </View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>{userName || "User"}</Text>
                    </View>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DailyGameScreen')}>
                <Text style={styles.btnTxt}>Daily game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setAboutModalVisible(true)}>
                <Text style={styles.btnTxt}>About us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setSettingsModalVisible(true)}>
                <Text style={styles.btnTxt}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnFolders} onPress={() => navigation.navigate('FoldersScreen')}>
                <Text style={styles.btnTxt}>Folders</Text>
            </TouchableOpacity>

            <WelcomeModal visible={welcomeModalVisible} onClose={closeWelcomeModal}/>
            <UserProfile visible={userProfileModalVisible} onClose={closeUserProfileModal}/>
            <AboutModal visible={aboutModalVisible} onClose={() => setAboutModalVisible(false)}/>
            <SettingsModal visible={settingsModalVisible} onClose={closeSettingsModal}/>
            </View>
        </View>
        </ImageBackground>
        </MusicProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        paddingTop: height * 0.07
    },

    userContainer: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        borderColor: '#e1251b',
        borderWidth: 2,
        zIndex: 10,
        marginBottom: height * 0.05
    },

    imageContainer: {
        padding: 0,
        width: height * 0.2,
        height: height * 0.2,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: height * 0.03,
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    nameBox: {
        padding: 5, 
        borderRadius: 10, 
        backgroundColor: '#f9f9f9', 
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 7,
    },

    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#990000',
        textAlign: 'center'
    },

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    btn: {
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        height: height * 0.175,
        borderWidth: 2,
        borderColor: '#e1251b',
        backgroundColor: ('rgba(255, 37, 27, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },

    btnFolders: {
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        height: height * 0.175,
        borderWidth: 2,
        borderColor: '#e1251b',
        backgroundColor: ('rgba(255, 37, 27, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        marginTop: height * 0.03,
        zIndex: 10
    },

    btnTxt: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600'
    },

});

export default Home;