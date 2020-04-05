import React, { Component, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  BaseStyle,
  BaseColor,
  BlueColor,
  PinkColor,
  GreenColor,
  Images
} from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  EventCard,
  EventItem
} from "@components";
import { EventListData } from "@data";
import styles from "./styles";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ProfileDescription } from "app/components";
import { getMemberByQuery } from "app/services/membersServices";
import { toastError } from "../../services/toastServices";
import { MemberDetail } from "../../../models/MemberDetail";
import MembersPublicProfile from "../MembersPublicProfile";
import { isEmpty } from "app/helpers/objectHelper";
interface SearchMembersProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const SearchMembers: React.SFC<SearchMembersProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState<Array<MemberDetail>>(
    new Array<MemberDetail>()
  );
  const searchHandler = () => {
    if (searchText != null && searchText.length >= 3) {
      setLoading(true);
      getMemberByQuery(searchText)
        .then(members => {
          setMembers(members);
          setLoading(false);
        })
        .catch(() => {
          toastError("Servicio no disponible momentáneamente");
          setLoading(false);
        });
    } else {
      toastError("Ingrese una busqueda con mas de 3 carácteres por favor");
    }
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title="Buscar Miembros"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          if (loading) {
            return (
              <ActivityIndicator size="small" color={BaseColor.primaryColor} />
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => setSearchText(text)}
              autoCorrect={false}
              placeholder="Search..."
              placeholderTextColor={BaseColor.grayColor}
              value={searchText}
              selectionColor={BaseColor.primaryColor}
              onSubmitEditing={() => {
                searchHandler();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
              }}
              style={styles.btnClearSearch}
            >
              <Icon name="times" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
        </View>

        {!isEmpty(members) && (
          <View style={{ padding: 20 }}>
            <Text headline semibold style={{ marginBottom: 20 }}>
              Nuestros Miemebros
            </Text>
            {members.map((item, index) => {
              return (
                <ProfileDescription
                  key={"service" + index}
                  image={item.picture}
                  name={item.firstName + " " + item.lastName}
                  subName={item.workPosition}
                  description={item.biography}
                  style={{ marginTop: 10 }}
                  onPress={() => {
                    navigation.navigate("MembersPublicProfile", {
                      memberId: item.id
                    });
                  }}
                />
              );
            })}
          </View>
        )}
        {/* <FlatList
            data={services}
            horizontal={true}
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => {
                    navigation.navigate("Event");
                  }}
                >
                  <View
                    style={[
                      styles.serviceCircleIcon,
                      { backgroundColor: item.color }
                    ]}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  <Text
                    footnote
                    style={{
                      marginTop: 5
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text title3 semibold style={{ padding: 20 }}>
            Up Comming Events
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20
              }}
              horizontal={true}
              data={relate}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate("EventDetail")}
                  style={{ marginLeft: 20 }}
                />
              )}
            />
          </View>
          <Text title3 semibold style={{ padding: 20 }}>
            Recommend For You
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingRight: 20
            }}
            horizontal={true}
            data={recommend}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <EventItem
                grid
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                location={item.location}
                tracking={item.tracking}
                rate={item.rate}
                status={item.status}
                price={item.price}
                priceSale={item.priceSale}
                eventType={item.eventType}
                time={item.time}
                user={item.user}
                numTicket={item.numTicket}
                liked={item.liked}
                style={{ marginLeft: 15, width: 200 }}
                onPress={() => navigation.navigate("EventDetail")}
                onPressTag={() => navigation.navigate("Review")}
              />
            )}
          /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SearchMembers;
