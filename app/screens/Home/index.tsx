import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList} from "react-native";
import {
  Text,
  Icon,
  SafeAreaView
} from "@components";
import { BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PromotionData, TourData, HotelData } from "@data";
import {
  getBadgesFromMember
} from "app/services/membersServices";
import { BadgeMemberDetail } from "models/BadgeDetail";
import { formatStringDate, parseDate } from "app/helpers/DateHelpers";
import { isEmpty } from "app/helpers/objectHelper";
import { getEventsLive, getEventsUpcoming } from "app/services/eventsServices";
import BadgeListItem from "app/components/Badges/BadgeListItem";
import { EventCard } from "app/components";
import { EventDetail } from "app/models/EventDetail";

const Home = ({ navigation }) => {
  const [state, setState] = useState({
    icons: [
      // {
      //   icon: "calendar-alt",
      //   name: "Hotel",
      //   route: "Hotel"
      // },
      // {
      //   icon: "map-marker-alt",
      //   name: "Tour",
      //   route: "Tour"
      // },
      {
        icon: "users",
        name: "Miembros",
        route: "SearchMembers"
      },
      {
        name: "Contactate",
        icon: "phone-square",
        route: "ContactUs"
      },
      // {
      //   icon: "plane",
      //   name: "Flight",
      //   route: "FlightSearch"
      // },
      // {
      //   icon: "ship",
      //   name: "Cruise",
      //   route: "CruiseSearch"
      // },
      // {
      //   icon: "bus",
      //   name: "Bus",
      //   route: "BusSearch"
      // },
      // {
      //   icon: "star",
      //   name: "Event",
      //   route: "DashboardEvent"
      // },
      {
        icon: "ellipsis-h",
        name: "More",
        route: "More"
      }
    ],
    relate: [
      {
        id: "0",
        image: Images.event4,
        title: "BBC Music Introducing",
        time: "Thu, Oct 31, 9:00am",
        location: "Tobacco Dock, London"
      },
      {
        id: "1",
        image: Images.event5,
        title: "Bearded Theory Spring Gathering",
        time: "Thu, Oct 31, 9:00am",
        location: "Tobacco Dock, London"
      }
    ],
    promotion: PromotionData,
    tours: TourData,
    hotels: HotelData.splice(0, 4),
    heightHeader: Utils.heightHeader()
  });
  const [meBadges, setMeBadges] = useState<BadgeMemberDetail[]>();
  const [eventsLive, setEventsLive] = useState<EventDetail[]>(
    new Array<EventDetail>()
  );

  const [upComingEvents, setUpComingEvents] = useState<EventDetail[]>(
    new Array<EventDetail>()
  );
  useEffect(() => {
    getBadgesFromMember(1015).then(badges => {
      setMeBadges(badges);
    });
    getEventsLive().then(events => setEventsLive(events));
    getEventsUpcoming().then(events => setUpComingEvents(events));
  }, []);

  const _deltaY = new Animated.Value(0);

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderIconService = () => {
    return (
      <FlatList
        data={state.icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name={item.icon}
                  size={18}
                  color={BaseColor.primaryColor}
                  solid
                />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const { heightHeader } = state;
  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.Image
        source={Images.trip3}
        style={[
          styles.imageBackground,
          {
            height: _deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100)
              ],
              outputRange: [heightImageBanner, heightHeader, 0]
            })
          }
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
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
          <View style={{ alignItems: "center" }}>
            <View style={[styles.searchForm, { marginTop: marginTopBanner }]}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                activeOpacity={0.9}
              >
                <View style={BaseStyle.textInput}>
                  <Text body1 grayColor>
                    What're you looking for ?
                  </Text>
                </View>
              </TouchableOpacity> */}
              {renderIconService()}
            </View>
          </View>
          {!isEmpty(eventsLive) && (
            <>
              <Text title3 semibold style={{ padding: 20 }}>
                Eventos en Vivo
              </Text>
              <View>
                <FlatList
                  contentContainerStyle={{
                    paddingRight: 20
                  }}
                  data={eventsLive}
                  showsHorizontalScrollIndicator={true}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <EventCard
                      image={item.imageUrl}
                      title={item.title}
                      tag="En vivo"
                      time={parseDate(item.date)}
                      onPress={() => navigation.navigate("EventLiveDetailScreen",{
                        eventId: item.id
                      })}
                      style={{ marginLeft: 20, marginBottom: 20 }}
                    />
                  )}
                />
              </View>
              {/* <View style={styles.line} /> */}
            </>
          )}
          {!isEmpty(upComingEvents) && (
            <>
              <Text title3 semibold style={{ padding: 20 }}>
                Próximos Eventos
              </Text>
              <View>
                <FlatList
                  contentContainerStyle={{
                    paddingRight: 20
                  }}
                  data={upComingEvents}
                  showsHorizontalScrollIndicator={true}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <EventCard
                      image={item.imageUrl}
                      title={item.title}
                      time={parseDate(item.date)}
                      // location={item.location}
                      onPress={() => navigation.navigate("EventDetailScreen",{
                        eventDetail: item
                      })}
                      style={{ marginLeft: 20, marginBottom: 20 }}
                    />
                  )}
                />
              </View>
              {/* <View style={styles.line} /> */}
            </>
          )}
          {!isEmpty(meBadges) && (
            <View
              style={{
                padding: 20
              }}
            >
              <Text title3 semibold style={{ padding: 20 }}>
                Mis Badges
              </Text>
              {/* <Text body2 grayColor>
              What’s the Worst That Could Happen
            </Text> */}
              {/* <Image source={Images.banner1} style={styles.promotionBanner} /> */}
              <View>
                <FlatList
                  columnWrapperStyle={{ marginBottom: 20 }}
                  numColumns={2}
                  data={meBadges}
                  keyExtractor={(item) => item.assignmentDate.toString()}
                  renderItem={({ item, index }) => (
                    <BadgeListItem
                      grid
                      image={item.badge.imageUrl}
                      name={item.badge.name}
                      location={formatStringDate(item.assignmentDate)}
                      // price={item.price}
                      // available={item.available}
                      // rate={item.rate}
                      // rateStatus={item.rateStatus}
                      // numReviews={item.numReviews}
                      // services={item.services}
                      style={index % 2 ? { marginLeft: 15 } : {}}
                      
                    />
                  )}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
