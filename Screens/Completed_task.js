import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Dimensions, TouchableOpacity, FlatList, ToastAndroid, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("screen")
import LinearGradient from 'react-native-linear-gradient';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const BackIcon = () => <IoniconsIcon name="chevron-back-circle-outline" size={45} color="#fff" />;
import { Context_Data } from '../__Context-data'
const DeleteIcon = () => <Icon name="delete" size={28} color="#2f185a" />;
const AddToListIcon = () => <EntypoIcon name="add-to-list" size={28} color="#2f185a" />;
import { v4 as uuidv4 } from 'uuid';

export default function Completed_task({ navigation }) {

    const { list_operation, completedList } = useContext(Context_Data)
    const [taskCompletedList, setTaskCompletedList] = useState(null)

    useEffect(() => {
        setTaskCompletedList(completedList)
    }, [completedList])
    const DeleteHandler = async (ITEM) => {
        const result = await list_operation("delete_completed_one", ITEM.id)
        if (result === 'done') {
            ToastAndroid.show("Removed !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Error !", ToastAndroid.SHORT);
        }
    }
    const SaveToAsyncHandler = async (TEXT) => {
        const toSave = {
            id: uuidv4(),
            task: TEXT,
            createdAt: new Date().toLocaleString(),
            isImportant: false
        }
        const result = await list_operation("create", toSave)
        if (result === 'done') {
            ToastAndroid.show("New task added to your list !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("facing some issue !", ToastAndroid.SHORT);
        }
    }
    return <LinearGradient
        start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
        locations={[0, 0.5]}
        colors={['#442a75', '#2f185a']}
        style={{ flex: 1, position: "relative" }}
    >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 25 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, fontFamily: "sans-serif-light", marginLeft: 20 }}>Completed task</Text>
        </View>

        {taskCompletedList && taskCompletedList.length ? <FlatList
            data={taskCompletedList}
            keyExtractor={e => e.id}
            renderItem={({ item, index }) => <LinearGradient
                start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
                locations={[0, 0.5]}
                colors={['#6644a7', '#51328a']}
                style={styles.taskView}
            >
                <View style={{ margin: 7 }} key={index}>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10, marginRight: 10, fontFamily: 'sans-serif-thin' }}>{item.task}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 6 }}>
                        <Text onPress={() => {
                            SaveToAsyncHandler(item.task)
                            DeleteHandler(item)
                        }} style={{ ...styles.deleteIcons, marginRight: 10 }}> <AddToListIcon /></Text>
                        <Text onPress={() => {
                            DeleteHandler(item)
                        }} style={styles.deleteIcons}> <DeleteIcon /></Text>
                    </View>
                </View>
            </LinearGradient>}
        /> :
            <View style={{ width, height: height * 0.3, flex: 1, marginTop: 60 }}>
                <Text style={{ textAlign: "center", fontSize: 30, textAlignVertical: 'center', flex: 1, backgroundColor: "#442877", marginHorizontal: 30, borderRadius: 10 }}>
                    No task
                </Text>
            </View>}
    </LinearGradient>
}





const styles = StyleSheet.create({
    taskView: {
        flex: 1,
        elevation: 6,
        marginHorizontal: 19,
        marginVertical: 12,
        borderRadius: 14
    },
    deleteIcons: {
        backgroundColor: "#fff",
        width: 45,
        height: 45,
        marginBottom: -13,
        marginRight: -10,
        textAlignVertical: "center",
        paddingLeft: 4,
        borderRadius: 45 / 2
    }

})