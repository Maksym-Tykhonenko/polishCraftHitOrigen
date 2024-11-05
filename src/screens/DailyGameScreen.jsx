import { View } from "react-native"
import DailyGame from "../components/DailyGame"

const DailyGameScreen = () => {
    return (
        <View style={styles.container}>
            <DailyGame />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DailyGameScreen;