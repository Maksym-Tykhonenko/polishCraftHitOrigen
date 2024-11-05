import { View } from "react-native"
import Places from "../components/Places"
import MenuPanel from "../components/MenuPanel";

const PlacesScreen = () => {
    return (
        <View style={styles.container}>
            <Places />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 0
    }
}

export default PlacesScreen;