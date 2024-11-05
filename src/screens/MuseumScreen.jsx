import { View } from "react-native"
import Museum from "../components/Museum"
import MenuPanel from "../components/MenuPanel";

const MuseumScreen = ({route}) => {
    const { name, museum } = route.params;

    return (
        <View style={styles.container}>
            <Museum name={name} museum={museum} />
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

export default MuseumScreen;