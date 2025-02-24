import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Link href={"/(models)/login"}>Login</Link>
      <Link href={"/(models)/booking"}>Booking</Link>
      <Link href={"/listing/[id]"}>Listing</Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})