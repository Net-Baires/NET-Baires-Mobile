import React, { useState, useEffect } from "react";
import { View, ScrollView, Animated } from "react-native";
import { BaseColor, GreenColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  Button
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import styles from "./styles";
import QRCode from "react-native-qrcode-svg";
import { HelpBlockData } from "@data";
import {
  NavigationLeafRoute,
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import {
  getLiveEventDetail,
  getSpeakersOfEvent
} from "app/services/eventsServices";
import ReportAttendanceGeneral from "./reportAttendanceGeneral";
import Spinner from "react-native-loading-spinner-overlay";
import TimerWatch from "app/components/TimerWatch";
import { EventLiveDetail } from "app/models/EventLiveDetail";
import { parseDate } from "app/helpers/DateHelpers";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: NavigationLeafRoute<RouteParams>;
}
interface RouteParams {
  eventId: number;
}
type EventLiveDetailScreenProps = Props;
const EventLiveDetailScreen: React.SFC<EventLiveDetailScreenProps> = ({
  navigation
}) => {
  // Temp data define
  const [eventLiveDetail, setEventLiveDetail] = useState<EventLiveDetail>(
    {} as EventLiveDetail
  );

  const [loading, setLoading] = useState(true);
  const _deltaY = new Animated.Value(0);
  const [state, setState] = useState({
    heightHeader: Utils.heightHeader(),
    renderMapView: false,
    region: {
      latitude: 1.9344,
      longitude: 103.358727,
      latitudeDelta: 0.05,
      longitudeDelta: 0.004
    },
    roomType: [
      {
        id: "1",
        image: Images.room8,
        name: "Standard Twin Room",
        price: "$399,99",
        available: "Hurry Up! is your last room!",
        services: [
          { icon: "wifi", name: "Free Wifi" },
          { icon: "shower", name: "Shower" },
          { icon: "users", name: "Max 3 aduts" },
          { icon: "subway", name: "Nearby Subway" }
        ]
      },
      {
        id: "2",
        image: Images.room5,
        name: "Delux Room",
        price: "$399,99",
        available: "Hurry Up! is your last room!",
        services: [
          { icon: "wifi", name: "Free Wifi" },
          { icon: "shower", name: "Shower" },
          { icon: "users", name: "Max 3 aduts" },
          { icon: "subway", name: "Nearby Subway" }
        ]
      }
    ],
    todo: [
      {
        id: "1",
        title: "South Travon",
        image: Images.trip1
      },
      {
        id: "2",
        title: "South Travon",
        image: Images.trip2
      },
      {
        id: "3",
        title: "South Travon",
        image: Images.trip3
      },
      {
        id: "4",
        title: "South Travon",
        image: Images.trip4
      },
      {
        id: "5",
        title: "South Travon",
        image: Images.trip5
      }
    ],
    helpBlock: HelpBlockData
  });

  useEffect(() => {
    getEventLiveDetail();
    getSpeakersOfEvent(navigation.state.params?.eventId!).then(x => {
      console.log(x);
    });
  }, []);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setState({ ...state, renderMapView: true });
    });
  }, []);
  const getEventLiveDetail = () => {
    getLiveEventDetail(navigation.state.params?.eventId!)
      .then(x => {
        setEventLiveDetail(x);
        setLoading(false);
      })
      .catch(x => {
        console.log(x);
      });
  };
  const eventUpdateHandler = () => {
    getEventLiveDetail();
  };
  const { heightHeader } = state;
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={BaseColor.primaryColor}
      />
      <Animated.Image
        source={{ uri: eventLiveDetail.imageUrl }}
        style={[
          styles.imgBanner,
          {
            height: _deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(200),
                Utils.scaleWithPixel(200)
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader]
            })
          }
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        {/* Header */}
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate("PreviewImage");
          }}
        />
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: _deltaY }
              }
            }
          ])}
          onContentSizeChange={() =>
            setState({ ...state, heightHeader: Utils.heightHeader() })
          }
          scrollEventThrottle={8}
        >
          {/* Main Container */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Information */}
            <View
              style={[styles.contentBoxTop, { marginTop: marginTopBanner }]}
            >
              <Text title2 semibold style={{ marginBottom: 7 }}>
                {eventLiveDetail.title}
              </Text>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={4.5}
                selectedStar={() => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                body2
                style={{
                  marginTop: 7,
                  textAlign: "center"
                }}
              >
                {/* Lorem ipsum dolor sit amet, consectetur labore adipiscing elit,
                sed do eiusmod tempor. */}
              </Text>
            </View>

            {/* Rating Review */}
            <View style={styles.blockView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={[
                    styles.circlePoint,
                    eventLiveDetail.attended
                      ? { backgroundColor: GreenColor.primaryColor }
                      : { backgroundColor: BaseColor.primaryColor }
                  ]}
                >
                  <Text title3 whiteColor></Text>
                </View>
                <View>
                  <Text title3 primaryColor style={{ marginBottom: 3 }}>
                    Estado
                  </Text>

                  <Text body2>
                    {eventLiveDetail.attended ? "Presente" : "Ausente"}
                  </Text>
                </View>
              </View>
              <View>
                {eventLiveDetail && (
                  <TimerWatch
                    startDate={parseDate(eventLiveDetail.startLiveTime)}
                  ></TimerWatch>
                )}
              </View>
              <View style={styles.contentRateDetail}>
                <View style={[styles.contentLineRate, { marginRight: 10 }]}>
                  <View style={{ flex: 1 }}>
                    <Text caption2 grayColor style={{ marginBottom: 5 }}>
                      Interio Design
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View style={[styles.linePercent, { width: "40%" }]} />
                  </View>
                  <Text caption2 style={{ marginLeft: 15 }}>
                    4
                  </Text>
                </View>
                <View style={styles.contentLineRate}>
                  <View style={{ flex: 1 }}>
                    <Text caption2 grayColor style={{ marginBottom: 5 }}>
                      Server Quality
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View style={[styles.linePercent, { width: "70%" }]} />
                  </View>
                  <Text caption2 style={{ marginLeft: 15 }}>
                    7
                  </Text>
                </View>
              </View>
              <View style={styles.contentRateDetail}>
                <View style={[styles.contentLineRate, { marginRight: 10 }]}>
                  <View style={{ flex: 1 }}>
                    <Text caption2 grayColor style={{ marginBottom: 5 }}>
                      Interio Design
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View style={[styles.linePercent, { width: "50%" }]} />
                  </View>
                  <Text caption2 style={{ marginLeft: 15 }}>
                    5
                  </Text>
                </View>
                <View style={styles.contentLineRate}>
                  <View style={{ flex: 1 }}>
                    <Text caption2 grayColor style={{ marginBottom: 5 }}>
                      Server Quality
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View style={[styles.linePercent, { width: "60%" }]} />
                  </View>
                  <Text caption2 style={{ marginLeft: 15 }}>
                    6
                  </Text>
                </View>
              </View>
            </View>
            {/* Description */}
            <ReportAttendanceGeneral
              eventLiveDetail={eventLiveDetail}
              eventUpdate={eventUpdateHandler}
            ></ReportAttendanceGeneral>
           
            {/* Facilities Icon */}
            {/* <View style={styles.contentService}>
              {[
                { key: "1", name: "wifi" },
                { key: "2", name: "coffee" },
                { key: "3", name: "bath" },
                { key: "4", name: "car" },
                { key: "5", name: "paw" }
              ].map((item, index) => (
                <View style={{ alignItems: "center" }} key={"service" + index}>
                  <Icon
                    name={item.name}
                    size={24}
                    color={BaseColor.accentColor}
                  />
                  <Text overline grayColor style={{ marginTop: 4 }}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            {/* Map location */}
            {/* <View style={styles.blockView}>
              <Text headline style={{ marginBottom: 5 }} semibold>
                Location
              </Text>
              <Text body2 numberOfLines={2}>
                218 Austen Mountain, consectetur adipiscing, sed do eiusmod
                tempor incididunt ut labore et …
              </Text>
              <View
                style={{
                  height: 180,
                  width: "100%",
                  marginTop: 10
                }}
              >
                {renderMapView && (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={state.region}
                    onRegionChange={() => {}}
                  >
                    <Marker
                      coordinate={{
                        latitude: 1.9344,
                        longitude: 103.358727
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>
            {/* Open Time */}
            {/* <View style={styles.blockView}>
              <Text headline semibold>
                Good To Know
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <Text body2 grayColor>
                    Check in from
                  </Text>
                  <Text body2 accentColor semibold>
                    15:00
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <Text body2 grayColor>
                    Check in from
                  </Text>
                  <Text body2 accentColor semibold>
                    15:00
                  </Text>
                </View>
              </View>
            </View>
            {/* Rooms */}
            {/* <View style={styles.blockView}>
              <Text headline semibold>
                Room Type
              </Text>
              <FlatList
                data={roomType}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <RoomType
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    available={item.available}
                    services={item.services}
                    style={{ marginTop: 10 }}
                    onPress={() => {
                      navigation.navigate("HotelInformation");
                    }}
                  />
                )}
              />
            </View>
            {/* Todo Things */}
            {/* <View style={styles.blockView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  alignItems: "flex-end"
                }}
              >
                <Text headline semibold>
                  Todo Things
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Post");
                  }}
                >
                  <Text caption1 grayColor>
                    Show More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={todo}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <PostListItem
                    style={{ marginRight: 20 }}
                    title="South Travon"
                    date="6 Deals Left"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    image={item.image}
                    onPress={() => {
                      navigation.navigate("PostDetail");
                    }}
                  />
                )}
              />
            </View>
            {/* Help Block Information */}
            {/* <View style={styles.blockView}>
              <HelpBlock
                title={helpBlock.title}
                description={helpBlock.description}
                phone={helpBlock.phone}
                email={helpBlock.email}
                style={{ margin: 20 }}
                onPress={() => {
                  navigation.navigate("ContactUs");
                }}
              />
            </View>
            {/* Other Information */}
            {/* <View style={{ paddingVertical: 10 }}> 
              <Text headline semibold>
                4 Reason To Choose Us
              </Text>
              <View style={styles.itemReason}>
                <Icon
                  name="map-marker-alt"
                  size={18}
                  color={BaseColor.accentColor}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text subhead semibold>
                    Good Location
                  </Text>
                  <Text body2>
                    Lorem ipsum dolor sit amet, nec et suas augue diceret, cu
                    cum malis veniam democritum. Eu liber vocibus his, qui id
                    cetero
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon
                  name="pagelines"
                  size={18}
                  color={BaseColor.accentColor}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text subhead semibold>
                    Great Food
                  </Text>
                  <Text body2>
                    Excellent cuisine, typical dishes from the best Romagna
                    tradition and more!
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon
                  name="servicestack"
                  size={18}
                  color={BaseColor.accentColor}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text subhead semibold>
                    Private Beach
                  </Text>
                  <Text body2>
                    Excellent cuisine, typical dishes from the best Romagna
                    tradition and more!
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon name="trophy" size={18} color={BaseColor.accentColor} />
                <View style={{ marginLeft: 10 }}>
                  <Text subhead semibold>
                    5 Stars Hospitality
                  </Text>
                  <Text body2>Romagna hospitality, typical and much</Text>
                </View>
              </View>
            </View> */}
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
        {/* <View style={styles.contentButtonBottom}>
          <View>
            <Text caption1 semibold>
              Price/Room/Night
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{ marginTop: 5 }}>
              AVG/Night
            </Text>
          </View>
          <Button
            style={{ height: 46 }}
            onPress={() => navigation.navigate("PreviewBooking")}
          >
            Book Now
          </Button>
        </View> */}
      </SafeAreaView>
    </View>
  );
};
export default EventLiveDetailScreen;
