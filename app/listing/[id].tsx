import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import listingsData from "@/assets/data/airbnb-listings.json"


const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    console.log(` 🚀 ~ file: [id].tsx: 7 ~ Page ~ id:`, id)
  return (
    <View>
      <Text>Checking alfonzo</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})