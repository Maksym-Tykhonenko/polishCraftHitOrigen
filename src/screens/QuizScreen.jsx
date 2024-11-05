import { View } from "react-native"
import Quiz from "../components/Quiz"

const QuizScreen = ({route}) => {
    const { name, quiz, museum } = route.params;

    return (
        <View style={styles.container}>
            <Quiz 
                name={name} 
                quiz={quiz}
                museum={museum}
                 />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default QuizScreen;