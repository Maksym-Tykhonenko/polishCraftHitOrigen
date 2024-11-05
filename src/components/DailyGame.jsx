import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ImageBackground, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import dailyGame from '../constants/dailyGame.js';
import facts from '../constants/facts.js';
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');
const GAME_INTERVAL = 60 * 60 * 24 * 1000;

const DailyGame = () => {
  const navigation = useNavigation();
  const [selectedResult, setSelectedResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [factsModalVisible, setFactsModalVisible] = useState(false);
  const [selectedFact, setSelectedFact] = useState(null);
  const [isFactSelected, setIsFactSelected] = useState(false);
  const [isGameAvailable, setIsGameAvailable] = useState(false);
  const [timer, setTimer] = useState('');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const initializeGame = async () => {
      const savedIndex = await AsyncStorage.getItem('currentGameIndex');
      const savedProgress = await AsyncStorage.getItem('progress');

      if (savedIndex !== null) {
        setCurrentGameIndex(parseInt(savedIndex, 10));
      }
      if (savedProgress !== null) {
        setProgress(parseInt(savedProgress, 10));
      }
      checkGameAvailability();
    };

    initializeGame();

    const timerInterval = setInterval(() => {
      checkGameAvailability();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const checkGameAvailability = async () => {
    try {
      const nextGameTime = await AsyncStorage.getItem('nextGameTime');
      const currentTime = Date.now();

      if (!nextGameTime || currentTime >= parseInt(nextGameTime, 10)) {
        if (currentGameIndex < dailyGame.length) {
          setIsGameAvailable(true);
        } else {
          setIsGameAvailable(false);
        }
      } else {
        setIsGameAvailable(false);
        const timeRemaining = parseInt(nextGameTime, 10) - currentTime;
        setTimer(formatTime(timeRemaining));
      }
    } catch (error) {
      console.error('Error checking game availability:', error);
    }
  };

  const startNewGameTimer = async () => {
    const nextGameTime = Date.now() + GAME_INTERVAL;
    await AsyncStorage.setItem('nextGameTime', nextGameTime.toString());

    const newIndex = currentGameIndex + 1;
    setCurrentGameIndex(newIndex);
    await AsyncStorage.setItem('currentGameIndex', newIndex.toString());

    setIsGameAvailable(false);
  };

  const progressColor = progress < 50 ? '#e1251b' : '#4CAF50';

  const handleOptionPress = async (result, satisfaction) => {
    setSelectedResult(result);

    let updatedProgress;
    if (progress === 0) {
        updatedProgress = Math.min(Math.max(progress + parseInt(satisfaction, 10), 0), 100);
    } else {
        const satisfactionValue = (progress * parseInt(satisfaction, 10)) / 100;
        updatedProgress = Math.min(Math.max(progress + satisfactionValue, 0), 100);
    }
    
    setProgress(updatedProgress);
    await AsyncStorage.setItem('progress', updatedProgress.toString());

    setTimeout(() => {
      setModalVisible(true);
      startNewGameTimer();
  }, 1500); 
};

  const closeModal = () => {
    setModalVisible(false);
    setSelectedResult(null);
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };  

  const resultText = (progress) => {
    if(progress < 50) {
        return `Thank you for your reply!\n
            Today you made a choice that significantly affected the fate of the city.\n
            Unfortunately, your decision has resulted in a drop in resident satisfaction to ${progress}.\n 
            The impact of your choice:\n Resident Satisfaction: Many residents are unhappy with your decision 
            and express their displeasure. There is a risk of protests and social unrest.\nThe following situation:\n
            You need to fix the situation! The next historical situation will be available tomorrow. Be careful in 
            your decisions, because their consequences can be serious.`
    } else if(progress < 80) {
        return `Thank you for your reply!\n
            Today you made an important choice that affected the fate of the city.\nYour decision led to a change 
            in the satisfaction level of residents to ${progress}.\n
            The impact of your choice:\n
            Resident Satisfaction: Many residents are happy with your actions, but there are still some issues 
            that need to be addressed. You need to keep working to improve living conditions.\n
            The following situation:\n
            You need to take action to increase community satisfaction! The next historical situation will be 
            available tomorrow. Get ready for new challenges!`
    } else {
        return `Thank you for your reply!\n
            Today you made an outstanding choice that significantly affected the fate of the city.\nYour decision 
            led to an increase in the level of satisfaction of residents to ${progress}.\n
            The impact of your choice:\n
            Resident satisfaction: Residents are happy and supportive of your initiatives. Your activity has 
            positively affected the life of the community, and they are ready to support new changes.\n
            The following situation:\n
            You need to keep this positive trend going! The next historical situation will be available tomorrow. 
            Your decisions can open up new opportunities for development.`
    }
  }

  const handleReset = async () => {
    try {
        await AsyncStorage.removeItem('nextGameTime');
        await AsyncStorage.removeItem('currentGameIndex');
        await AsyncStorage.removeItem('progress');

        Alert.alert('Daily game Reset', 'Your daily game has been reset successfully!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);

    } catch (error) {
        console.error('Error resetting daily game:', error);
        Alert.alert('Error', 'There was a problem resetting your daily game. Please try again later.');
    }
};

const openFactsModal = () => {
    setFactsModalVisible(true);
    setIsFactSelected(false);
    setSelectedFact(null);
};

const selectFact = (fact) => {
    setSelectedFact(fact);
    setIsFactSelected(true);
};

const goBackToTopics = () => {
    setIsFactSelected(false);
    setSelectedFact(null);
};

  return (
    <ImageBackground source={currentGameIndex >= dailyGame.length ? dailyGame[dailyGame.length - 1].image : dailyGame[currentGameIndex].image} style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Progress.Bar
            progress={progress / 100}
            width={310}
            height={20}
            color={progressColor}
            unfilledColor="#fff"
            borderRadius={20}
            style={styles.progressBar}
        />
        <View style={styles.progressIcon}>
            {progress < 50 ? <Icons type={'sad'}/> : <Icons type={'happy'}/>}
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
    </View>

        {currentGameIndex < dailyGame.length ? (
          isGameAvailable ? (
            <View style={styles.card}>
              <Text style={styles.dayText}>Day {dailyGame[currentGameIndex].day}</Text>
              <Text style={styles.titleText}>{dailyGame[currentGameIndex].title}</Text>
              <Text style={styles.situationText}>{dailyGame[currentGameIndex].situation}</Text>

              <View style={styles.optionsContainer}>
                {dailyGame[currentGameIndex].options.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(option.result, option.satisfaction)}
                  >
                    <Text style={styles.optionText}>{option.option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <View style={{ width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 30}}>
                <Text style={styles.timerText}>New daily game will be available in {timer}</Text>
              </View>
              <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack('')}>
                <Text style={styles.blackBtnText}>Home</Text>
              </TouchableOpacity>
            </View>        
          )
        ) : (
            <View style={{width: '100%'}}>
                <View style={{ width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                    <Text style={styles.finishText}>Congratulations, you passed the last daily game !</Text>
                </View>
                <TouchableOpacity style={styles.factsBtn} onPress={openFactsModal}>
                    <Text style={styles.btnText}>Historical facts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack('')}>
                    <Text style={styles.blackBtnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                    <Text style={styles.btnText}>Reset daily game</Text>
                </TouchableOpacity>
            </View>
        )}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, {paddingTop: 50}]}>
                <ScrollView style={{width: '100%'}}>
                <Text style={styles.resultText}>{selectedResult}</Text>
              <Text style={styles.resultText}>{resultText(progress)}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Icons type={'close'}/>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
                visible={factsModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setFactsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, {paddingTop: 50}]}>
                        <ScrollView style={{width: '100%'}}>
                        {!isFactSelected ? (
                            facts.map((fact, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.button, { backgroundColor: index % 2 === 0 ? '#e1251b' : '#ccc' }]}
                                    onPress={() => selectFact(fact)}
                                >
                                    <Text style={[styles.buttonText, { color: index % 2 === 0 ? '#fff' : '#000' }]}>{fact.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={{width: '100%'}}>
                                <Text style={styles.modalTitle}>{selectedFact.name}</Text>
                                <Text style={styles.modalFact}>{selectedFact.fact}</Text>
                                <TouchableOpacity style={styles.backArrowIcon} onPress={goBackToTopics}>
                                    <Icons type={'back-arrow'}/>
                                </TouchableOpacity>
                            </View>
                        )}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setFactsModalVisible(false)}>
                            <Icons type={'close'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressContainer: {
    position: 'relative',
    width: 310,
    height: 50
  },
  progressIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 45,
    right: -60,
    transform: [{ translateX: -50 }, { translateY: -50 }],
    },
  progressText: {
    position: 'absolute',
    left: 190,
    top: 54,
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontWeight: '300',
    color: '#000',
    fontSize: 12
},
  progressBar: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e1251b',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center'
  },
  situationText: {
    fontSize: 20,
    color: '#666',
    marginTop: 10,
    textAlign: 'center'
  },
  optionsContainer: {
    marginTop: 15
  },
  optionButton: {
    backgroundColor: 'rgba(255, 37, 27, 0.7)',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '90%',
    height: '70%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center'
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  closeButton: {
    backgroundColor: '#e1251b',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16
  },
  timerText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  finishText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000'
  },
button: {
    backgroundColor: '#e1251b',
    padding: 10,
    borderRadius: 5,
    marginVertical: 3,
    width: '100%',
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
},
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
},
modalFact: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
},
factsBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c79e21',
    marginBottom: height * 0.01,
    marginTop: height * 0.07
},
homeBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e9e7',
    marginBottom: height * 0.01
},
resetBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5352c'
},
btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 500
},
blackBtnText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 500
},
closeButton: {
    padding: 10,
    width: 42,
    height: 42,
    position: 'absolute',
    top: 10,
    right: 10,
},
backArrowIcon: {
    width: 70,
    height: 70,
    padding: 10,
    alignSelf: 'center',
}
});

export default DailyGame;
