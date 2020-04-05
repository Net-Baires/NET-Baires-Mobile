import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, ScrollView, Linking } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image } from "@components";
import styles from "./styles";
import { BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import DeepLinking from "react-native-deep-linking";
import { loginWithMeetupToken } from "app/services/loginService";
import { storeData, StoreKeys, getData } from "app/services/storeService";
import { AuthContext } from "app/Context/AuthContext";
import { getMe } from "app/services/profileServices";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationLeafRoute
} from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type WalkthroughProps = Props;
const Walkthrough: React.SFC<WalkthroughProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [slide] = useState([{ key: 1, image: Images.logoNetBaires }]);
  const { login, authenticated } = useContext(AuthContext);
  useEffect(() => {
    if (authenticated) navigation.navigate("Loading");
  }, [authenticated]);
  useEffect(() => {
    DeepLinking.addScheme("netbaires://");
    Linking.addEventListener("url", handleUrl);

    DeepLinking.addRoute("/link?:token", response => {
      var meetupToken = response.token.substring(
        14,
        response.token.indexOf("&")
      );
      loginWithMeetupToken(meetupToken).then(token => {
        login(token.token);
        setLoading(false);
        navigation.navigate("Loading");
      });
    });

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);

  const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };
  const loginMeetup = () => {
    setLoading(true);
    Linking.openURL(
      "https://secure.meetup.com/es-ES/oauth2/authorize?response_type=token&redirect_uri=netbaires://link&client_id=pc0kad3lh1i3ujtp4m8om7d689"
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <ScrollView
        style={styles.contain}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }
      >
        <View style={styles.wrapper}>
          {slide.map(item => {
            return (
              <View style={styles.slide} key={item.key}>
                <Image source={item.image} style={styles.img} />
                <Text body1 style={styles.textSlide}>
                  NET-Baires
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "100%" }}>
          {/* <Button
              full
              style={{
                backgroundColor: BaseColor.navyBlue,
                marginTop: 20
              }}
              onPress={() => {
                this.authentication();
              }}
            >
              Login with Facebook
            </Button> */}
          <Button
            full
            style={{ marginTop: 20 }}
            loading={loading}
            onPress={loginMeetup}
          >
            Conectarse
          </Button>
          {/* <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text body1 grayColor>
                  Haven’t registered yet?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.authentication()}>
                <Text body1 primaryColor>
                  Join Now
                </Text>
              </TouchableOpacity>
            </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
