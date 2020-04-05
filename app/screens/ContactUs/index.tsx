import React, { Component, useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { Images } from "app/config";
import Image from "app/components/Image";

interface ContactUsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ContactUs: React.SFC<ContactUsProps> = ({ navigation }) => {
  // Temp data define
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    success: {
      name: true,
      email: true,
      message: true
    },
    loading: false,
    region: {
      latitude: 10.73902,
      longitude: 106.709938,
      latitudeDelta: 0.009,
      longitudeDelta: 0.004
    }
  });

  /**
   * @description Called when user sumitted form
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onSubmit = () => {
    let { success, name, email, message } = state;
    if (name == "" || email == "" || message == "") {
      setState({
        ...state,
        success: {
          ...success,
          email: email != "" ? true : false,
          name: name != "" ? true : false,
          message: message != "" ? true : false
        }
      });
    } else {
      setState({
        ...state,
        loading: true
      });
      () => {
        setTimeout(() => {
          setState({
            ...state,
            loading: false
          });
          navigation.goBack();
        }, 500);
      };
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title="Contact Us"
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
        <View style={[styles.contain]}>
        <Image resizeMode="stretch" style={{width:"100%", height:180,backgroundColor:"#252C39"}} source={Images.logoNetBairesComplete}></Image>

          <Text headline style={{ marginVertical: 10 }}>
            Detalles del contacto
          </Text>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={text => setState({ ...state, name: text })}
            autoCorrect={false}
            placeholder="Asunto"
            placeholderTextColor={
              state.success.name ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={state.name}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10, height: 120 }]}
            onChangeText={text => setState({ ...state, message: text })}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder="Mensaje"
            placeholderTextColor={
              state.success.message
                ? BaseColor.grayColor
                : BaseColor.primaryColor
            }
            value={state.message}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          loading={state.loading}
          full
          onPress={() => {
            onSubmit();
          }}
        >
          Enviar
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default ContactUs;
