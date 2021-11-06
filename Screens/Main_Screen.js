import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from './_components/headerTitle';
import TaskListCompo from './_components/taskList';
import Bottom_create_task from './_components/Bottom_create_task';
import CompletedTaskCompo from './_components/Completed_task'

export default function Main_Screen({ navigation }) {

    return <LinearGradient
        start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
        locations={[0, 0.5]}
        colors={['#442a75', '#2f185a']}
        style={{ flex: 1, position: "relative" }}
    >
        <HeaderTitle />
        <TaskListCompo />
        <Bottom_create_task />
        <CompletedTaskCompo navigation={navigation} />
    </LinearGradient>
}
