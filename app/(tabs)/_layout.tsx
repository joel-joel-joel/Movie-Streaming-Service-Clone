import React from 'react';
import {Text, View} from 'react-native';
import {Tabs} from "expo-router";

const _Layout = () => {
    return (
        <Tabs>
            // Customize the header for each tab
            <Tabs.Screen name="index" options={{headerShown: false}}/>

            <Tabs.Screen name="profile" options={{headerShown: false}}/>

            <Tabs.Screen name="saved" options={{headerShown: false}}/>

            <Tabs.Screen name="search" options={{headerShown: false}}/>
        </Tabs>
    )
}

export default _Layout