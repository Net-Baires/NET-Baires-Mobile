import React, { Component, useEffect, useState } from "react";
import { RefreshControl, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  PostItem,
  ProfileAuthor,
  Icon
} from "@components";
import styles from "./styles";
import { EventDetail } from "models/EventDetail";
import { getRequest } from "app/services/requestServices";

// Load sample data
// import { PostData } from "@data";

const Post = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPost] = useState<Array<EventDetail>>(new Array<EventDetail>());

  useEffect(() => {
    setRefreshing(true);
    getRequest<Array<EventDetail>>("/events")
      .then((events)=> {
        setPost(events);
        setRefreshing(false);
      });
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header title="Eventos" />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[BaseColor.primaryColor]}
            tintColor={BaseColor.primaryColor}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={posts}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => (
          <PostItem
            image={item.imageUrl}
            title={item.title}
            description={item.description}
            onPress={() => navigation.navigate("PostDetail", {eventId: item.id})}
          >
            {/* <ProfileAuthor
              name={item.date}
              description={item.description}
              style={{ paddingHorizontal: 20 }}
            /> */}
          </PostItem>
        )}
      />
    </SafeAreaView>
  );
};
export default Post;
