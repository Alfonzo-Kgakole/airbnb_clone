import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Lisiting from '@/components/Lisiting'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes')
  const OnDataChanged = (category: string) => {
    console.log(`Changed: `, category)
    setCategory(category)
  }
  return (
    <View style={{flex: 1, marginTop: 150}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChange={OnDataChanged}/>
      }} />

      <Lisiting listing={[]} category={category} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Page
