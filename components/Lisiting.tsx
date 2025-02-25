import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
  listing: any[],
  category: string
}

const Lisiting = ({listing, category} : Props) => {

  // useStates

  // useEffects
  useEffect(() => {
    console.log("Reloading list")

  }, [category])

  // methods
  return (
    <View>
      <Text>Lisiting</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Lisiting
