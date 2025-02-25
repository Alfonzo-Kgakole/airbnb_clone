import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Listing } from '@/interfaces/Listing'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'


interface Props {
  listing: any[],
  category: string
}

const Lisiting = ({listing: items, category} : Props) => {

  // useStates
  const [loading, setLoading] = useState(false)

  // useEffects
  useEffect(() => {
    console.log("Reloading list", items.length)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)

  }, [category])

  // useRef
  const listRef = useRef<FlatList>(null)

  // methods
  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeInLeft}>
          <Image source={{uri: item.medium_url || 'https://fallback-image-url.com/default.jpg'}} style={styles.image} resizeMode='cover'/>
          <TouchableOpacity style={{position: "absolute", top: 30, right: 30}}>
            <Ionicons name='heart-outline' size={24} color='#000' />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, fontFamily: 'mon-sb'}}>{item.name}</Text>
            <View style={{flexDirection: 'row', gap: 4}}>
              <Ionicons name='star' size={16} />
              <Text style={{fontFamily: 'mon-sb'}}>{(item.review_scores_rating ?? 0) / 20}</Text>
            </View>
          </View>

          <Text style={{fontFamily: 'mon'}}>{item.room_type}</Text>

          <View style={{flexDirection: 'row', gap: 4}}>
            <Text style={{fontFamily: 'mon-sb'}}>P {item.price}</Text>
            <Text style={{fontFamily: 'mon-sb'}}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );


  return (
    <View style={defaultStyles.container}>
      <FlatList 
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderRow}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
})

export default Lisiting
