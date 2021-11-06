import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, Dimensions, ToastAndroid, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Context_Data } from '../../__Context-data'
const { width, height } = Dimensions.get("screen")
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

const EditIcon = () => <Icon name="edit" size={17} color="#6644a7" />;
const DeleteIcon = () => <Icon name="delete" size={17} color="#6644a7" />;
const CheckmarkIcon = () => <IoniconsIcon name="checkmark-done-outline" size={20} color="#6644a7" />;
const PinIcon = () => <Icon name="pushpin" size={20} color="#6644a7" />;
const PinOutlineIcon = () => <Icon name="pushpino" size={20} color="#6644a7" />;


export default function TaskList() {

    const { list, list_operation } = useContext(Context_Data)
    const [isEditModal, setIsEditModal] = useState(false)
    const [editTextInput, setEditTextInput] = useState("")
    const [selectedTask, setSelectedTask] = useState({})
    const [taskList, setTaskList] = useState(null)

    useEffect(() => {
        const listOne = list.filter(e => e.isImportant)
        const listTwo = list.filter(e => !e.isImportant)
        setTaskList([...listOne.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }), ...listTwo.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })])


    }, [list, isEditModal])

    const DeleteHandler = async (ITEM) => {
        const result = await list_operation("delete", ITEM.id)
        if (result === 'done') {
            ToastAndroid.show("Removed !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Error !", ToastAndroid.SHORT);
        }
    }

    const MakeImportant = async (ITEM) => {
        const updatedItem = { ...ITEM, isImportant: true }
        const result = await list_operation('add-important', updatedItem)
        if (result === 'done') {
            ToastAndroid.show("Done !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Error !", ToastAndroid.SHORT);
        }
    }
    const RemoveFromImportant = async (ITEM) => {
        const updatedItem = { ...ITEM, isImportant: false }
        const result = await list_operation('remove-important', updatedItem)
        if (result === 'done') {
            ToastAndroid.show("Done !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Error !", ToastAndroid.SHORT);
        }
    }
    if (!list.length) {
        return <View style={{ width, height: height * 0.3, flex: 1, marginTop: 60 }}>
            <Text style={{ textAlign: "center", fontSize: 30, textAlignVertical: 'center', flex: 1, backgroundColor: "#442877", marginHorizontal: 30, borderRadius: 10 }}>No task</Text>
        </View>
    }

    const EditTaskHandler = async () => {
        const UpdatedTask = { ...selectedTask, task: editTextInput, createdAt: new Date().toLocaleString() }
        const result = await list_operation("edit", UpdatedTask)
        if (result === 'done') {
            setIsEditModal(false)
            ToastAndroid.show("Task updated !", ToastAndroid.SHORT);
            setEditTextInput("")
        } else {
            setIsEditModal(false)
            ToastAndroid.show("facing some issue !", ToastAndroid.SHORT);
        }
    }
    const TaskIsCompletedHandler = async (ITEM) => {
        const result = await list_operation("completed", ITEM)
        if (result === 'done') {
            ToastAndroid.show("Moved to completed list !", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Error !", ToastAndroid.SHORT);
        }
    }

    return <View style={{ flex: 1 }}>



        <Modal
            animationIn="fadeIn"
            animationInTiming={1500}
            isVisible={isEditModal}>
            <LinearGradient
                start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
                locations={[0, 0.5]}
                colors={['#472b7b', '#7f53d1']}
                style={styles.modalStyle}>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5, fontFamily: "sans-serif-light" }}>Edit task</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEditTextInput}
                    value={editTextInput}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styles.modalButtons} onPress={() => {
                        if (editTextInput.length > 10) {
                            EditTaskHandler()
                        } else {
                            ToastAndroid.show("Write some more BUDDY !", ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={{ textAlign: 'center', color: 'black' }}>Save changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButtons} onPress={() => {
                        setIsEditModal(false)
                        setEditTextInput("")
                    }}>
                        <Text style={{ textAlign: 'center', color: 'black' }}>Leave</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </Modal>




        {taskList && <FlatList
            style={{ marginBottom: 70 }}
            data={taskList}
            key="list"
            keyExtractor={e => e.id}
            renderItem={({ item, index }) => <LinearGradient
                start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
                locations={[0, 0.5]}
                colors={['#6644a7', '#51328a']}
                style={styles.taskView}
            >
                <View style={{ margin: 10 }} key={index}>
                    {item.isImportant ? <Text onPress={() => {
                        RemoveFromImportant(item)
                    }} style={styles.labelStyle}><PinIcon /> </Text> :
                        <Text onPress={() => {
                            MakeImportant(item)
                        }} style={{ ...styles.labelStyle, paddingLeft: 4 }}> <PinOutlineIcon /></Text>}

                    <Text style={{ color: 'white', fontSize: 17, marginLeft: 10, fontFamily: 'sans-serif-light' }}>{item.task}</Text>
                    <Text style={{ fontFamily: 'sans-serif-thin', textAlign: "right", marginTop: 10, fontSize: 10 }}>{item.createdAt}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text
                            style={styles.iconsStyle}
                            onPress={() => {
                                setSelectedTask(item)
                                setEditTextInput(item.task)
                                setIsEditModal(true)
                            }}> <EditIcon /></Text>
                        <Text
                            style={styles.iconsStyle}
                            onPress={() => {
                                DeleteHandler(item)
                            }} > <DeleteIcon /></Text>
                        <Text
                            style={styles.iconsStyle}
                            onPress={() => {
                                list_operation("delete", item.id)
                                TaskIsCompletedHandler(item)
                            }} > <CheckmarkIcon /></Text>
                    </View>
                </View>
            </LinearGradient>}
        />}
    </View>

}



const styles = StyleSheet.create({
    taskView: {
        flex: 1,
        elevation: 6,
        marginHorizontal: 19,
        marginVertical: 14,
        borderRadius: 14
    },
    modalStyle: {
        backgroundColor: '#7f53d1',
        borderRadius: 8,
        padding: 10
    },
    input: {
        borderWidth: 0.5,
        paddingVertical: 4,
        paddingHorizontal: 7,
        borderColor: '#fff',
        borderRadius: 5
    },
    modalButtons: {
        flex: 1,
        backgroundColor: 'white',
        margin: 4,
        padding: 7,
        borderRadius: 4,
        marginTop: 60
    },
    labelStyle: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 35,
        height: 35,
        textAlignVertical: 'center',
        paddingLeft: 7,
        elevation: 10,
        position: 'absolute',
        right: -15,
        top: -20
    },
    iconsStyle: {
        backgroundColor: '#fff',
        borderRadius: 100,
        marginLeft: 20,
        width: 35,
        height: 35,
        marginBottom: -20,
        textAlignVertical: 'center',
        paddingLeft: 4,
        elevation: 10
    }

})