import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from "@components";
import styles from "./styles";

import { AuthContext } from "app/Context/AuthContext";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import { AttendeDetailMemberDetail } from "models/AttendeDetail";
import { Platform } from "react-native";
import Share from "react-native-share";
import Configuration from "app/services/config";
import { shareLink } from "app/services/shareService";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  actions: any;
}
const Profile: React.SFC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [memberDetail, setMemberDetail] = useState<AttendeDetailMemberDetail>(
    {} as AttendeDetailMemberDetail
  );
  const { meDetail, logOff } = useContext(AuthContext);
  useEffect(() => {
    setMemberDetail(meDetail);
    setLoading(false);
  }, [meDetail]);
  const onLogOut = () => {
    setLoading(true);
    logOff();
    navigation.navigate("Loading");
  };

  const toggleSwitch = (value) => {
    setReminders(value);
  };
  const shareHandler = () => {
    const url = `${Configuration.site.url}/members/${meDetail.id}/profile`;
    const title = "Visitá mi Perfil en NET-Baires";
    const message = "";
    shareLink(url, title, message);
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={BaseColor.primaryColor}
      />
      <Header
        title="Profile"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          return <Icon name="bell" size={24} color={BaseColor.primaryColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate("Notification");
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <ProfileDetail
            image={memberDetail?.picture}
            textFirst={memberDetail?.firstName}
            point={memberDetail.averageAttendance}
            textSecond={memberDetail?.lastName}
            textThird={`Eventos presente ${memberDetail.eventsAttended}`}
            onPress={() => navigation.navigate("ProfileExanple")}
          />
          <ProfilePerformance
            data={[
              { title: "Registrado", value: memberDetail.eventsRegistered },
              { title: "Asistio", value: memberDetail.eventsAttended },
              { title: "No Asistio", value: memberDetail.eventsNoAttended },
            ]}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate("ProfileEdit");
              }}
            >
              <Text body1>Editar Perfil</Text>
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileItem} onPress={shareHandler}>
              <Text body1>Compartir mi Perfil</Text>
              {/* <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
                style={{ marginLeft: 5 }}
              /> */}
            </TouchableOpacity>
            {/*  <TouchableOpacity
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
             <TouchableOpacity
              style={styles.profileItem}
              onPress={() => navigation.navigate("MyPaymentMethod")}
            >
              <Text body1>My Card</Text>
            </TouchableOpacity>
            <View style={[styles.profileItem, { paddingVertical: 15 }]}>
              <Text body1>Reminders</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={toggleSwitch}
                value={reminders}
              />
            </View> */}
            <View style={styles.profileItem}>
              <Text body1>App Version</Text>
              <Text body1 grayColor>
                {BaseSetting.appVersion}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button full loading={loading} onPress={() => onLogOut()}>
          Desconectarme
        </Button>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
