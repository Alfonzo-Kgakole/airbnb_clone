import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Share } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import listingsData from "@/assets/data/airbnb-listings.json"
import Animated, { interpolate, SlideInDown, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'


const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window')


const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(` 🚀 ~ file: [id].tsx: 7 ~ Page ~ id:`, id)
  const listing = (listingsData as any[]).find((item) => item.id === id)
  const navigation = useNavigation()

  // useRef
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  //use Effects
const sharedListing = async() => {
  try {
    await Share.share({
      title: listing.name,
      url: listing.listing_url,
    });
  } catch (err) {
    console.log(err);
  }
}


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => {
        <Animated.View style={[headerAnimatedStyle, styles.header]}>

        </Animated.View>
      },
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={() => sharedListing()}>
            <Ionicons name='share-outline' size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={() => sharedListing()}>
            <Ionicons name='heart-outline' size={22} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' size={22} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  // methods
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 3], [0, 1]),
    };
  }, []);
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image source={{ uri: listing.xl_picture_url }} style={[imageAnimatedStyle, styles.image]} resizeMode='cover' />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>

          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>

          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name='star' size={16} />
            <Text style={styles.ratings}>
              {(listing.review_scores_rating ?? 0) / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>

        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: IMG_HEIGHT,
    width: width
  },
  infoContainer: {
    padding: 24,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb'
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey
  },
  hostView: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 12
  },
  footerText: {
    height: "100%",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb'
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
})