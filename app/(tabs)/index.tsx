import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Link href={"/(models)/login"}>
        <Text>Login</Text>
      </Link>

      <Link href={"/(models)/booking"}>
      <Text>Booking</Text>
      </Link>

      <Link href={"/listing/[id]"}>
        <Text>Listing</Text>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})