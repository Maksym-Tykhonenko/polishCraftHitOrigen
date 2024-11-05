import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Quiz = ({ name, quiz, museum }) => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [lives, setLives] = useState(3);
    const [modalSadVisible, setModalSadVisible] = useState(false);
    const [modalHappyVisible, setModalHappyVisible] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !quizCompleted) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            setQuizCompleted(true);
        }
    }, [timeLeft, quizCompleted]);

    const handleAnswer = (selectedOption) => {
        const correctAnswer = quiz[currentQuestionIndex].answer;
        const isCorrect = selectedOption === correctAnswer;

        setSelectedOption(selectedOption);
        setIsCorrect(isCorrect);

        if(isCorrect){
            setCorrectCount((prevCount) => prevCount + 1);
        } else {
            setLives(lives - 1);
                if (lives - 1 === 0) {
                    setTimeout(() => {
                        setQuizCompleted(true);
                    }, 1000);
                    return;
                }
        }

        setTimeout(() => {
            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setTimeout(() => {
                    setQuizCompleted(true);
                }, 1000);
            }
        }, 1000);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleModalSadVisible = () => {
        setModalSadVisible(!modalSadVisible)
    };

    useEffect(() => {
        if (lives < 1 && quizCompleted) {
            setModalSadVisible(true);
        }
    }, [lives, quizCompleted]);

    const handleModalHappyVisible = () => {
        setModalHappyVisible(!modalHappyVisible)
    };

    useEffect(() => {
        if (lives > 0 && quizCompleted && correctCount > quiz.length - 3) {
            setModalHappyVisible(true);
        }
    }, [lives, quizCompleted]);

    const handleTryAgain = () => {
        setLives(3);
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
        setModalSadVisible(false);
        setModalHappyVisible(false);
        setIsCorrect(null);
        setSelectedOption(null);
        setTimeLeft(120)
    }

    return (
        <ImageBackground source={require('../assets/newDiz/loader3.png')} style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>

            {quizCompleted ? (
                <View style={styles.finishContainer}>
                    <Text style={styles.finishText}>You have completed the quiz!</Text>
                    <TouchableOpacity style={[styles.tryAgainBtn, {width: '100%', padding: 12,}]} onPress={handleTryAgain}>
                        <Text style={[styles.tryAgainBtnText, {fontWeight: '400'}]}>Try again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack('')}>
                        <Text style={styles.blackBtnText}>Go back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.questionContainer}>

                    <View style={styles.timerBox}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{width: 40, height: 40, marginRight: 10}}>
                            <Icons type={'clock'}/>
                        </View>
                        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
                    </View>

                    <View style={styles.livesContainer}>
                        {[...Array(3)].map((_, index) => (
                            <View key={index} style={styles.lifeIcon}>
                                <Icons
                                    type={index < lives ? 'life' : 'life-gone'}
                                />
                            </View>
                        ))}
                    </View>
                    </View>

                    <Text style={styles.questionIndex}>
                        Question {currentQuestionIndex + 1} of {quiz.length}
                    </Text>
                    
                    <View style={styles.questionBox}>
                        <Text style={styles.question}>
                            {quiz[currentQuestionIndex].question}
                        </Text>
                    </View>

                    {quiz[currentQuestionIndex].options.map((option, index) => {
                        const isSelected = option === selectedOption;
                        const isCorrectOption = option === quiz[currentQuestionIndex].answer;

                        let backgroundColor;
                        if (isSelected) {
                            backgroundColor = isCorrect ? '#93c47d' : '#e06666';
                        } else if (isCorrectOption && selectedOption) {
                            backgroundColor = '#93c47d';
                        } else {
                            backgroundColor = '#f0f0f0';
                        }

                        return (
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.optionButton, { backgroundColor }]}
                                    onPress={() => handleAnswer(option)}
                                    disabled={selectedOption !== null}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            )}

            {
                lives < 1 && quizCompleted && (
                <Modal
                    transparent={true}
                    visible={modalSadVisible}
                    animationType="slide"
                    onRequestClose={handleModalSadVisible}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.livesContainer}>
                                {[...Array(3)].map((_, index) => (
                                    <View key={index} style={styles.lifeIcon}>
                                        <Icons
                                            type={index < lives ? 'life' : 'life-gone'}
                                        />
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.modalText}>You`ve been wrong, nothing is left !</Text>
                            <View style={styles.sadIcon}>
                                <Icons type={'sad'}/>
                            </View>
                            <TouchableOpacity style={styles.tryAgainBtn} onPress={handleTryAgain}>
                                <Text style={styles.tryAgainBtnText}>Try again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleModalSadVisible}>
                                <Icons type={'close'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {
                correctCount > quiz.length - 3 && quizCompleted && lives > 0 && (
                    <Modal
                    transparent={true}
                    visible={modalHappyVisible}
                    animationType="slide"
                    onRequestClose={handleModalHappyVisible}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.congratsIcon}>
                                <Icons type={'congrats'}/>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>You have successfully completed the quiz and unlocked our virtual museum of Polish crafts. Now you can enjoy exploring the exhibits that showcase the richness and uniqueness of Polish culture.</Text>
                                <TouchableOpacity style={styles.btnMuseum} onPress={() => navigation.navigate('MuseumScreen', { name: name, museum: museum }, setModalHappyVisible(false))}>
                                    <Text style={styles.btnMuseumText}>Enter the Museum</Text>
                                </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleModalHappyVisible}>
                                <Icons type={'close'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                )
            }
        </View>
        </ImageBackground>
    );
};

export default Quiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: height * 0.12,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        color: '#990000'
    },
    timerBox: {
        width: '95%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: height * 0.03,
        shadowColor: '#fff',
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    timer: {
        fontSize: 20,
        color: '#990000',
        fontWeight: 'bold',
    },
    livesContainer: {
        flexDirection: 'row',
    },
    lifeIcon: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    questionContainer: {
        width: '100%',
        alignItems: 'center'
    },
    questionIndex: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30
    },
    questionBox: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderRadius: 10,
        marginBottom: height * 0.12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    question: {
        fontSize: 18,
        textAlign: 'center',
    },
    optionButton: {
        padding: 12,
        marginVertical: 5,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#990000',
        borderWidth: 1
    },
    optionText: {
        fontSize: 17,
        color: '#990000',
        textAlign: 'center'
    },
    finishContainer: {
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: height * 0.2,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    finishText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#e06666',
        marginBottom: height * 0.03
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#999999',
        textAlign: 'center',
        marginTop: 20
    },
    sadIcon: {
        width: 60,
        height: 60,
        marginVertical: 15
    },
    closeButton: {
        padding: 10,
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    tryAgainBtn: {
        width: 200,
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#93c47d',
    },
    tryAgainBtnText: {
        fontSize: 16,
        fontWeight: 300,
        color: '#fff'
    },
    btnMuseum: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6aa84f',
        marginTop: 15
    },
    btnMuseumText: {
        fontSize: 17,
        fontWeight: 300,
        color: '#fff'
    },
    congratsIcon: {
        width: 150,
        height: 150,
        marginTop: 20,
        marginBottom: 10
    },
    homeBtn: {
        width: '100%',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e9e7',
        marginTop: 10
    },
    blackBtnText: {
        color: '#000',
        fontSize: 17,
        fontWeight: '300'
    },
});
