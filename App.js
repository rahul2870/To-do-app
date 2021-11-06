import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const StackNavigator = createStackNavigator();

// context data
import { Context_Data } from './__Context-data'

// screens 
import Main_Screen from './Screens/Main_Screen'
import Completed_task_Screen from './Screens/Completed_task'

const TO_DO_LIST_ASYNC_TOKEN = 'TO_DO_LIST_ASYNC_TOKEN';
const TO_DO_LIST_ASYNC_TOKEN_COMPELETED = 'TO_DO_LIST_ASYNC_TOKEN_COMPELETED';

export default function App() {

  const { list, completedList } = useContext(Context_Data)
  const [toDoList, setList] = useState([])
  const [taskCompletedList, setTaskCompletedList] = useState([])

  useEffect(() => {
    AsyncStorage.getItem(TO_DO_LIST_ASYNC_TOKEN, (err, result) => {
      if (result) {
        const PARSED_RESULT = JSON.parse(result)
        setList(PARSED_RESULT)
      } else {
        setList([])
      }
    })
    AsyncStorage.getItem(TO_DO_LIST_ASYNC_TOKEN_COMPELETED, (err, result) => {
      if (result) {
        const PARSED_RESULT = JSON.parse(result)
        setTaskCompletedList(PARSED_RESULT)
      } else {
        setTaskCompletedList([])
      }
    })
  }, [list, completedList])

  const __listOperationHandler = async (TASK, ITEM) => {
    return new Promise(async (resolve, reject) => {
      if (TASK === "create") {
        const UPDATED_LIST = JSON.stringify([...toDoList, ITEM]);
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN, UPDATED_LIST).then(() => {
            setList([...toDoList, ITEM])
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }
      } else if (TASK === "delete") {
        const UPDATED_LIST = toDoList.filter(e => e.id !== ITEM);
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN, JSON.stringify(UPDATED_LIST)).then(() => {
            setList(UPDATED_LIST)
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }
      } else if (TASK === "edit") {
        const findItem = toDoList.findIndex(e => e.id === ITEM.id)
        toDoList[findItem] = ITEM

        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN, JSON.stringify(toDoList)).then(() => {
            setList(toDoList)
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }

      } else if (TASK === "completed") {
        const UPDATED_LIST = JSON.stringify([...taskCompletedList, ITEM]);
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN_COMPELETED, UPDATED_LIST).then(() => {
            setTaskCompletedList([...taskCompletedList, ITEM])
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }
      } else if (TASK === "delete_completed_one") {
        const UPDATED_LIST = taskCompletedList.filter(e => e.id !== ITEM);
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN_COMPELETED, JSON.stringify(UPDATED_LIST)).then(() => {
            setTaskCompletedList(UPDATED_LIST)
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }
      } else if (TASK === "add-important") {
        const findItem = toDoList.findIndex(e => e.id === ITEM.id)
        toDoList[findItem] = ITEM;
        setList([])
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN, JSON.stringify(toDoList)).then(() => {
            setList(toDoList)
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }

      } else if (TASK === "remove-important") {
        const findItem = toDoList.findIndex(e => e.id === ITEM.id)
        toDoList[findItem] = ITEM;
        setList([])
        try {
          await AsyncStorage.setItem(TO_DO_LIST_ASYNC_TOKEN, JSON.stringify(toDoList)).then(() => {
            setList(toDoList)
            resolve('done')
          })
        } catch (e) {
          reject('error')
        }

      } else {
        reject("error")
      }
    })

  }


  return <Context_Data.Provider value={{
    list: toDoList,
    completedList: taskCompletedList,
    list_operation: __listOperationHandler
  }} >
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName='main'>
        <StackNavigator.Screen options={{ headerShown: false }} name='main' component={Main_Screen} />
        <StackNavigator.Screen options={{ headerShown: false }} name='completed-list' component={Completed_task_Screen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  </Context_Data.Provider>

}