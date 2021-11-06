import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("screen")
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
const CreateIcon = () => <Icon name="create-outline" size={20} color="#fff" />;
const ClosecircleIcon = () => <AntIcons name="closecircle" size={50} color="#fff" />;
import Modal from "react-native-modal";
import { Context_Data } from '../../__Context-data'
import { v4 as uuidv4 } from 'uuid';


export default function Bottom_create_task() {
    const { list_operation } = useContext(Context_Data)
    const [isModal, setIsModal] = useState(false)
    const [text, onChangeText] = useState("")
    const SaveToAsyncHandler = async (TEXT) => {
        const toSave = {
            id: uuidv4(),
            task: TEXT,
            createdAt: new Date().toLocaleString(),
            isImportant: false
        }
        const result = await list_operation("create", toSave)
        if (result === 'done') {
            setIsModal(false)
            ToastAndroid.show("New task added to your list !", ToastAndroid.SHORT);
            onChangeText("")
        } else {
            setIsModal(false)
            ToastAndroid.show("facing some issue !", ToastAndroid.SHORT);
        }
    }
    return <View>

        <Modal
            isVisible={isModal}>
            <LinearGradient
                start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
                locations={[0, 0.5]}
                colors={['#472b7b', '#7f53d1']}
                style={styles.modalStyle}>
                <Text onPress={() => {
                    setIsModal(false)
                    onChangeText("")
                }} style={styles.closeBtn}><ClosecircleIcon /></Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5, fontFamily: "sans-serif-light" }}>Add task</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Revise system design ..."
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={styles.modalButtons} onPress={() => {
                        if (text.length > 10) {
                            SaveToAsyncHandler(text)
                        } else {
                            ToastAndroid.show("Write some more BUDDY !", ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={{ textAlign: 'center', color: 'black', paddingHorizontal: 20 }}>Save</Text>
                    </TouchableOpacity>


                </View>
            </LinearGradient>
        </Modal>

        <LinearGradient
            start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
            locations={[0, 0.5]}
            colors={['#51328a', '#6644a7']}
            style={styles.BottomUI}
        >
            <TouchableOpacity onPress={() => setIsModal(true)} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleUI}>Create task</Text>
                <View><CreateIcon /></View>
            </TouchableOpacity>
        </LinearGradient>
    </View >
}







const styles = StyleSheet.create({
    BottomUI: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 99,
        width,
        position: 'absolute',
        bottom: 0,
        zIndex: 99
    },
    closeBtn: {
        position: 'absolute',
        top: -27,
        right: -15
    },
    titleUI: {
        textAlign: 'center',
        fontSize: 23,
        color: '#fff',
        paddingVertical: 15,
        marginRight: 20,
        fontFamily: 'sans-serif-thin'
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
        backgroundColor: 'white',
        margin: 4,
        padding: 7,
        borderRadius: 5,
        marginTop: 60
    }
})