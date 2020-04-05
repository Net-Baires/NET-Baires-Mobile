import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon } from "@components";
import styles from "./styles";
import { BaseColor } from "@config";
interface IncomingProps{
  image:string;
  description:string;
  title:string;
  onPress:()=>any;
  style:[];
  children:any;
}
const PostItem: React.SFC<IncomingProps>  =({style, children, title, description, onPress, image})=>{
    return (
      <View style={style}>
        {children}
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image style={styles.imagePost} source={{ uri:image}} />
          <Icon
            name="bookmark"
            solid
            size={24}
            color={BaseColor.whiteColor}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text headline semibold style={{ marginBottom: 6 }}>
            {title}
          </Text>
          <Text body2>{description}</Text>
        </View>
      </View>
    );
}
export default PostItem;