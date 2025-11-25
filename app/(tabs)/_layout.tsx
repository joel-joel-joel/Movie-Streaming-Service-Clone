import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import {Tabs} from "expo-router";
import {images} from '@/constants/images';
import {icons} from '@/constants/icons';


{/* Design interface for each tab, define functional variables */}
const TabIcon = ({focused, icon, title} : any) => {

    /// Highlight the active tab
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                {/* Display functional icon for active tab */}
                <Image source={icon}
                       tintColor="#151312"
                       className="size-5"/>

                {/* Display functional title for active tab */}
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        )
    }

    /* Show the icon for inactive tabs */
    else {
        return (
            <View className = "mt-4 justify-center items-center rounded-full">
                <Image source={icon} tintColor="#A8B5DB" className="size-5"/>
            </View>
        )
    }
}


/* Create a layout for each tab */
const Layout = () => {
    return (
        /* Tab dimensions and color*/
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,

            tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            },

            tabBarStyle: {
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0f0D23'
            }
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    /* Hide header on home screen */
                    headerShown: false,
                    /* Utilize interface function for tab icon upon focus */
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused}
                                 icon={icons.home}
                                 title="Home"
                        />
                    )
                }}
            />


            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused}
                                 icon={icons.search}
                                 title="Search"
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused}
                                 icon={icons.save}
                                 title="Saved"
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused}
                                 icon={icons.person}
                                 title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default Layout