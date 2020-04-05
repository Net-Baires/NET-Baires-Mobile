import React, { Component, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert
} from "react-native";
import { BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileAuthor,
  ProfileGroup,
  Card,
  PostListItem
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import { EventDetail } from "models/EventDetail";
import { getRequest } from "app/services/requestServices";
import { AttendeDetail } from "models/MemberDetail";

const PostDetail = ({ navigation }) => {
  const _deltaY = new Animated.Value(0);

  const heightHeader = Utils.heightHeader();
  const heightImageBanner = Utils.scaleWithPixel(250);
  const marginTopBanner = heightImageBanner - heightHeader - 30;
  const [eventDetail, setEventDetail] = useState<EventDetail>();
  const [attendes, setAttendes] = useState<AttendeDetail[]>();
  useEffect(() => {
    getRequest<EventDetail>(`/events/${navigation.state.params.eventId}`)
      .then((event)=> {
        setEventDetail(event);
      });
      getRequest<Array<AttendeDetail>>(`/events/${navigation.state.params.eventId}/attendees`)
      .then((attendes)=> {
        setAttendes(attendes);
      });

      
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.Image
        source={{uri : eventDetail?.imageUrl}}
        style={[
          styles.imgBanner,
          {
            height: _deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(195),
                Utils.scaleWithPixel(195)
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader]
            })
          }
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
            );
          }}
          renderRight={() => {
            return (
              <Icon
                name="bookmark"
                solid
                size={20}
                color={BaseColor.whiteColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
        />
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: _deltaY }
              }
            }
          ])}
          scrollEventThrottle={8}
        >
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
              marginTop: marginTopBanner
            }}
          >
            <Text headline semibold whiteColor numberOfLines={1}>
              {/* {eventDetail?.title}  */}
            </Text>
            <ProfileAuthor
               image={Images.logoNetBaires}
              name={eventDetail?.title}
              description={eventDetail?.date}
              // textRight="Jun 2018"
              style={{
                marginTop: 20
              }}
            />
            <Text body2>
              {eventDetail?.description}
            </Text>
            <Text
              headline
              semibold
              style={{
                marginTop: 20
              }}
            >
              User Following
            </Text>
            <ProfileGroup
              name="Steve, Lincoln, Harry"
              detail={`Y ${attendes?.length} desarrolladores mas`}
              users={[
                { image: Images.profile1 },
                { image: Images.profile3 },
                { image: Images.profile4 }
              ]}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Text headline semibold>
                Top experiences
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Post")}>
                <Text footnote grayColor>
                  Show more
                </Text>
              </TouchableOpacity>
            </View>
            {/* Image gallery */}
            <View style={styles.contentImageFollowing}>
              <View style={{ flex: 4, marginRight: 10 }}>
                <Card style={{ borderRadius: 8 }} image={Images.trip7}>
                  <Text headline semibold whiteColor>
                    Dallas
                  </Text>
                </Card>
              </View>
              <View style={{ flex: 6 }}>
                <View style={{ flex: 1 }}>
                  <Card style={{ borderRadius: 8 }} image={Images.trip3}>
                    <Text headline semibold whiteColor>
                      Warsaw
                    </Text>
                  </Card>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10
                  }}
                >
                  <View style={{ flex: 6, marginRight: 10 }}>
                    <Card
                      style={{
                        borderRadius: 8
                      }}
                      image={Images.trip4}
                    >
                      <Text headline semibold whiteColor>
                        Yokohama
                      </Text>
                    </Card>
                  </View>
                  <View style={{ flex: 4 }}>
                    <Card style={{ borderRadius: 8 }} image={Images.trip6}>
                      <Text headline semibold whiteColor>
                        10+
                      </Text>
                    </Card>
                  </View>
                </View>
              </View>
            </View>
            {/* Featured Posts */}
            <Text
              headline
              semibold
              style={{
                marginTop: 20
              }}
            >
              Featured Posts
            </Text>
            <PostListItem
              title="See The Unmatched"
              description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
              style={{ marginTop: 10, width: "100%" }}
              image={Images.trip9}
              onPress={() => {
                navigation.navigate("Post");
              }}
            />
            <PostListItem
              description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
              title="Top 15 Things Must To Do"
              style={{ marginTop: 10, width: "100%" }}
              image={Images.trip8}
              onPress={() => {
                navigation.navigate("Post");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PostDetail;
