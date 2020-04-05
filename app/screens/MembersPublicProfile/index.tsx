import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Switch,
  TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  HotelItem,
  Button,
  ProfilePerformance
} from "@components";
import styles from "./styles";
import { TabView, TabBar } from "react-native-tab-view";
import Spinner from "react-native-loading-spinner-overlay";
import { UserData, HotelData } from "@data";

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { MemberDetail } from "models/MemberDetail";
import {
  getMemberDetail,
  getBadgesFromMember,
  unFollowMember,
  getFollowings
} from "app/services/membersServices";
import { truncateString } from "app/helpers/StringHelpers";
import { BadgeMemberDetail } from "models/BadgeDetail";
import { parseDate, formatStringDate } from "app/helpers/DateHelpers";
import BadgeListItem from "app/components/Badges/BadgeListItem";
import { followMember } from "../../services/membersServices";
import { isEmpty } from "app/helpers/objectHelper";
import { getSpeaker } from "app/services/speakersServices";
import { EventCard, Card } from "app/components";
import { EventDetail } from "app/models/EventDetail";
import { OtherColor } from "app/config/color";
import { Following } from "app/models/Following";
import * as Utils from "@utils";
interface Profile2NavigationParams {
  memberId: number;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, Profile2NavigationParams>;
  userData: any;
}
const MembersPublicProfile: React.SFC<Props> = ({ navigation }) => {
  const [memberDetail, setMemberDetail] = useState<MemberDetail>(
    {} as MemberDetail
  );
  const memberId = navigation.state.params?.memberId!;
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "badges", title: "Badges" },
      // { key: "profile", title: "Profile" },
      { key: "speaker", title: "Speaker" },
      { key: "followings", title: "Followings" }
    ],
    userData: UserData[0]
  });

  useEffect(() => {
    getMemberDetail(memberId).then(x => {
      setMemberDetail(x);
      setLoading(false);
    });
  }, []);
  const { userData } = state;
  const _handleIndexChange = index => setState({ ...state, index });
  const _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flex: 1, width: 100, alignItems: "center" }}>
          <Text headline semibold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
  const [followLoading, setFollowLoading] = useState(false);
  const follow = () => {
    setFollowLoading(true);
    followMember(memberId)
      .then(x => {
        setMemberDetail({ ...memberDetail, following: true });
        setFollowLoading(false);
      })
      .catch(x => {
        console.log(x);
        setFollowLoading(false);
      });
  };
  const unFollow = () => {
    setFollowLoading(true);

    unFollowMember(memberId).then(x => {
      setMemberDetail({ ...memberDetail, following: false });
      setFollowLoading(false);
    });
  };

  const _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "badges":
        return (
          <BadgesTab
            jumpTo={jumpTo}
            navigation={navigation}
            memberId={memberId}
          />
        );
      case "profile":
        return <ProfileTab jumpTo={jumpTo} navigation={navigation} />;
      case "speaker":
        return (
          <SpeakerTab
            jumpTo={jumpTo}
            navigation={navigation}
            memberId={memberId}
          />
        );
      case "followings":
        return (
          <FollowingTab
            jumpTo={jumpTo}
            navigation={navigation}
            memberId={memberId}
          />
        );
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={BaseColor.primaryColor}
      />
      <Header
        title="Perfil de Miembro"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text title1 semibold>
            {memberDetail.firstName}
          </Text>
          <Text subhead grayColor>
            {memberDetail.workPosition}
          </Text>
          <View style={styles.location}>
            {/* <Icon
              name="map-marker-alt"
              size={10}
              color={BaseColor.primaryColor}
            /> */}
            {/* <Text
              caption1
              primaryColor
              style={{
                marginLeft: 3
              }}
            >
              {userData.address}
            </Text> */}
          </View>
          <View style={styles.contentInfor}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: memberDetail.picture }}
            />
            <View style={styles.contentInforLeft}>
              <ProfilePerformance
                data={[
                  { value: memberDetail.twitter, title: "Twitter" },
                  { value: memberDetail.github, title: "Github" },
                  { value: memberDetail.instagram, title: "Instagram" }
                ]}
                flexDirection="column"
              />
            </View>
          </View>
          {!memberDetail.following ? (
            <Button
              onPress={follow}
              loading={followLoading}
              full
              style={{ marginTop: 28, marginBottom: 28 }}
            >
              Seguir
            </Button>
          ) : (
            <Button
              onPress={unFollow}
              loading={followLoading}
              style={{
                marginTop: 28,
                marginBottom: 28,
                backgroundColor: OtherColor.errorColor
              }}
            >
              Dejar de Seguir
            </Button>
          )}
          <Text headline semibold style={{ marginBottom: 10 }}>
            Sobre mí
          </Text>
          <Text body2 numberOfLines={5}>
            {memberDetail.biography &&
              truncateString(memberDetail.biography, 250)}
          </Text>
        </View>
        <TabView
          lazy
          navigationState={state}
          renderScene={_renderScene}
          renderTabBar={_renderTabBar}
          onIndexChange={_handleIndexChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, Profile2NavigationParams>;
  memberId: any;
}
const BadgesTab: React.SFC<Props> = ({ navigation, memberId }) => {
  const [badges, setBadges] = useState<BadgeMemberDetail[]>(
    new Array<BadgeMemberDetail>()
  );
  useEffect(() => {
    getBadgesFromMember(memberId).then(x => {
      setBadges(x);
    });
  }, []);
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        numColumns={2}
        data={badges}
        keyExtractor={item => item.assignmentDate.toString()}
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
            style={[
              index % 2
                ? {
                    marginLeft: 15,
                    marginBottom: 20
                  }
                : { marginBottom: 20 }
            ]}
            // onPress={() => navigation.navigate("HotelDetail")}
          />
        )}
      />
    </View>
  );
};

const ProfileTab: React.SFC<Props> = ({ navigation }) => {
  const [state, setState] = useState({
    reminders: false
  });

  const toggleSwitch = value => {
    setState({ ...state, reminders: value });
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("ProfileEdit");
        }}
      >
        <Text body1>Edit Profile</Text>
        <Icon
          name="angle-right"
          size={18}
          color={BaseColor.primaryColor}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("ChangePassword");
        }}
      >
        <Text body1>Change Password</Text>
        <Icon
          name="angle-right"
          size={18}
          color={BaseColor.primaryColor}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("ChangeLanguage");
        }}
      >
        <Text body1>Language</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text body1 grayColor>
            English
          </Text>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.primaryColor}
            style={{ marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("Currency");
        }}
      >
        <Text body1>Currency</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text body1 grayColor>
            USD
          </Text>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.primaryColor}
            style={{ marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.profileItem}>
        <Text body1>Reminders</Text>
        <Switch
          name="angle-right"
          size={18}
          onValueChange={toggleSwitch}
          value={state.reminders}
        />
      </View>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("BookingHistory");
        }}
      >
        <Text body1>Booking History</Text>
        <Icon
          name="angle-right"
          size={18}
          color={BaseColor.primaryColor}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          navigation.navigate("Coupons");
        }}
      >
        <Text body1>Coupons</Text>
        <Icon
          name="angle-right"
          size={18}
          color={BaseColor.primaryColor}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};
interface SpeakerTabProps {
  memberId: number;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const SpeakerTab: React.SFC<SpeakerTabProps> = ({ memberId, navigation }) => {
  const [events, setEvents] = useState<EventDetail[]>(new Array<EventDetail>());
  useEffect(() => {
    getSpeaker(memberId).then(events => {
      var a = events.events!;
      setEvents(a);
    });
  }, []);
  return (
    <>
      {!isEmpty(events) && (
        <>
          <Text title3 semibold style={{ padding: 20 }}>
            Eventos en Vivo
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20
              }}
              data={events}
              showsHorizontalScrollIndicator={true}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => (
                <EventCard
                  image={item.imageUrl}
                  title={item.title}
                  time={parseDate(item.date)}
                  onPress={() => navigation.navigate("EventDetail")}
                  style={{ marginLeft: 20, marginBottom: 20 }}
                />
              )}
            />
          </View>
          {/* <View style={styles.line} /> */}
        </>
      )}
    </>
  );
};

interface FollowingTabProps {
  memberId: number;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const FollowingTab: React.SFC<FollowingTabProps> = ({
  memberId,
  navigation
}) => {
  const [followings, setFollowings] = useState<Following[]>(
    new Array<Following>()
  );
  useEffect(() => {
    getFollowings(memberId).then(followings => {
      setFollowings(followings);
    });
  }, []);
  return (
    <>
      {!isEmpty(followings) && (
         <View style={{ padding: 20 }}>
          {followings.map((item, index) => {
            return (
              <View
                style={{
                  height: 200,
                  width: Utils.getWidthDevice() / 2 - 30,
                  marginBottom: 20
                }}
                key={"ourTeam" + index}
              >
                <Card
                  image={item.member.picture}
                  //  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text footnote whiteColor>
                    {item.member.workPosition}
                  </Text>
                  <Text headline whiteColor semibold>
                    {item.member.firstName} + " " + {item.member.lastName}
                  </Text>
                </Card>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};
const ActivityTab: React.SFC = () => {
  return <View style={{ padding: 20 }} />;
};
export default MembersPublicProfile;
