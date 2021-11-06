import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function HeaderTitle() {

    return <View >
        <LinearGradient
            start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.2 }}
            locations={[0, 0.5]}
            colors={['#442a75', '#57398f']}
            style={styles.ViewUI}
        >
            <Text style={styles.titleUI}>TASK TO - DO APP</Text>
        </LinearGradient>
    </View >
}

const styles = StyleSheet.create({
    ViewUI: {
        backgroundColor: '#251249',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    titleUI: {
        textAlign: 'center',
        fontSize: 23,
        color: '#fff',
        padding: 12,
    }
})