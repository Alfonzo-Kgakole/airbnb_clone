import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router';

const Profile = () => {
  const { signOut, isSignedIn} = useAuth();
  return (
    <View>
      <Button title="log Out" onPress={() => signOut()} />
        {!isSignedIn && (
          <Link href={'/(models)/login'}>
            <Text>Login</Text>
          </Link>
        )}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})