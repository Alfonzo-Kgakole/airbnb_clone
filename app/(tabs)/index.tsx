import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useMemo } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import Lisiting from '@/components/Lisiting'


const Page = () => {
  // useState
  const [category, setCategory] = useState('Tiny homes')


  // useEffect


  // useMemo
  const items = useMemo(() => listingsData as any, [])


  // methods
  const OnDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View style={{flex: 1, marginTop: 150}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChange={OnDataChanged}/>
      }} />

      <Lisiting listing={items} category={category} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Page
