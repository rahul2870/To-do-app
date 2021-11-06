import React, { useContext } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, TouchableOpacity } from "react-native";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
const CheckmarkIcon = () => <IoniconsIcon name="ios-checkmark-done-circle" size={90} color="#fff" />;
import { Context_Data } from '../../__Context-data'

export default CompletedTask = ({ navigation }) => {

    const { completedList } = useContext(Context_Data)

    return (
        <View style={styles.container}>
            <Text style={styles.nums}>{completedList ? completedList.length : 0}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("completed-list")}>
                <CheckmarkIcon />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: -10,
        zIndex: 100,
        elevation: 100
    },
    nums: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: '#2f185a',
        borderWidth: 2,
        borderColor: '#fff',
        textAlign: 'center',
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        textAlignVertical: 'center',
        top: 2,
        left: 2
    }
});