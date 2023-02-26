import React from "react"
import { View, Text } from "react-native"
import styles from "./style"

export default function Title(){
    return (
        <View styles={styles.boxTitle}>
            <Text style={styles.textTitle}>ONEBITHEALTH</Text>
        </View>
    )
}