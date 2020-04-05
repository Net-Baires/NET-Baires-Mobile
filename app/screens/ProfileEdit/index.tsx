import React, { Component, useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Platform
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import ImagePicker from "react-native-image-picker";

import Spinner from "react-native-loading-spinner-overlay";
import { getRequest, putRequest } from "app/services/requestServices";
import { getMe, updateMe } from "app/services/profileServices";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { AuthContext } from "app/Context/AuthContext";
import { MemberDetail } from "models/MemberDetail";
const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type ProfileEditProps = Props;
const ProfileEdit: React.SFC<ProfileEditProps> = ({ navigation }) => {
  const [meDetailToEdit, setMeDetailToEdit] = useState<MemberDetail>(
    {} as MemberDetail
  );
  const [loading, setLoading] = useState(false);
  const [loadingGeneral, setLoadingGeneral] = useState(true);
  const [imageSource, setImageSource] = useState({ uri: "" });
  const { meDetail, updateMeDetail } = useContext(AuthContext);
  const [photo, setPhoto] = useState<any>();
  useEffect(() => {
    getMe().then(x => {
      setMeDetailToEdit(x);
      setLoadingGeneral(false);
    });
  }, []);

  const updateMeData = () => {
    // const data = new FormData();

    // data.append("ImageFile", {
    //   name: photo.fileName,
    //   type: photo.type,
    //   uri:
    //     Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    // });
    updateMe(meDetailToEdit, photo).then(() => {
      updateMeDetail(meDetailToEdit);
      setLoading(false);
      navigation.goBack();
    });
  };
  const options = {
    title: "Elegir foto de perfil",
    customButtons: [{ name: "fb", title: "Elegir foto de Facebook" }],
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner
        visible={loadingGeneral}
        textContent={"Cargando..."}
        textStyle={BaseColor.primaryColor}
      />
      <Header
        title="Edit Profile"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <ScrollView>
        <View style={styles.contain}>
          <View>
            <TouchableHighlight
              onPress={() => {
                ImagePicker.showImagePicker(options, response => {
                  console.log("Response = ", response);

                  if (response.didCancel) {
                    console.log("User cancelled image picker");
                  } else if (response.error) {
                    console.log("ImagePicker Error: ", response.error);
                  } else if (response.customButton) {
                    console.log(
                      "User tapped custom button: ",
                      response.customButton
                    );
                  } else {
                    const source = { uri: response.uri };
                    setPhoto(response);
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    setMeDetailToEdit({
                      ...meDetailToEdit,
                      picture: source.uri
                    });
                  }
                });
              }}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
            >
              <Image
                source={{ uri: meDetailToEdit?.picture }}
                style={styles.thumb}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Email
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            editable={false}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, email: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.email}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Nombre
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, firstName: text })
            }
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.firstName}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Apellido
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, lastName: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.lastName}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Posición Laboral
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, workPosition: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.workPosition}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Twitter
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, twitter: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.twitter}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Instagram
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, instagram: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.instagram}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Linkedin
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, linkedin: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.linkedin}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Github
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, github: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.github}
            selectionColor={BaseColor.primaryColor}
          />

          <View style={styles.contentTitle}>
            <Text headline semibold>
              Biografía
            </Text>
          </View>
          <TextInput
            multiline
            style={[BaseStyle.textInput, { height: 200 }]}
            onChangeText={text =>
              setMeDetailToEdit({ ...meDetailToEdit, biography: text })
            }
            autoCorrect={false}
            placeholder="Input Name"
            placeholderTextColor={BaseColor.grayColor}
            value={meDetailToEdit.biography}
            selectionColor={BaseColor.primaryColor}
          />

          {/* <View style={styles.contentTitle}>
              <Text headline semibold>
                Email
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              placeholder="Input Name"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Address
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ address: text })}
              autoCorrect={false}
              placeholder="Input Address"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.address}
              selectionColor={BaseColor.primaryColor}
            /> */}
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          loading={loading}
          full
          onPress={() => {
            setLoading(true);
            updateMeData();
          }}
        >
          Actualizar
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default ProfileEdit;
