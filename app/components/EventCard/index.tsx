import React from "react";
import { View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image, Text } from "@components";
import {
  formatStringDate,
  formatDate,
  parseDate,
  formatTime,
  getMonthName
} from "app/helpers/DateHelpers";
import Tag from "../Tag";
import { Button } from "..";
interface EventCardProps {
  image: string;
  title: string;
  time: Date;
  location?: string;
  tag?: string;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}
const EventCard: React.SFC<EventCardProps> = ({
  style,
  title,
  location,
  time,
  image,
  onPress,
  tag
}) => {
  return (
    <TouchableOpacity
      style={[styles.content, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        resizeMode="stretch"
        source={{ uri: image }}
        style={styles.imageBanner}
      />
      <View
        style={{
          padding: 10,
          flexDirection: "row"
        }}
      >
        {tag && (
          <Tag status style={styles.tagGirdStatus}>
            {tag}
          </Tag>
        )}
        <View style={{ alignItems: "center", marginRight: 10 }}>
          <Text body2 primaryColor semibold>
            {getMonthName(time)}
          </Text>
          <Text body1 grayColor semibold>
            {time.getDay()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text body2 semibold numberOfLines={1} style={{ flex: 1 }}>
            {title}
          </Text>
          {time && (
            <Text overline grayColor style={{ marginVertical: 5 }}>
              {formatDate(time)} - {formatTime(time)}
            </Text>
          )}
          <Text overline grayColor>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
