import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    console.log(` 🚀 ~ file: [id].tsx: 7 ~ Page ~ id:`, id)
  return (
    <View>
      <Text>Listing</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})