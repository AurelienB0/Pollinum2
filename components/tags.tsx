import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  tag: string;
  setTag: React.Dispatch<
    React.SetStateAction<
      "Flowering plant" | "Culinary" | "Succulents & Cacti" | "null"
    >
  >;
};
type tagProps = {
  name: "Flowering plant" | "Culinary" | "Succulents & Cacti" | "null";
  tag: string;
  setTag: React.Dispatch<
    React.SetStateAction<
      "Flowering plant" | "Culinary" | "Succulents & Cacti" | "null"
    >
  >;
};

const ToggleTag = ({ name, tag, setTag }: tagProps) => {
  return (
    <Pressable
      onPress={() => {
        tag === name ? setTag("null") : setTag(name);
      }}
    >
      <View
        style={[tag === name ? styles.activated : styles.idle, { padding: 20 }]}
      >
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

const Tags = ({ tag, setTag }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ToggleTag name="Culinary" tag={tag} setTag={setTag} />
      <ToggleTag name="Flowering plant" tag={tag} setTag={setTag} />
      <ToggleTag name="Succulents & Cacti" tag={tag} setTag={setTag} />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  activated: {
    backgroundColor: "#5cc4e1ff",
  },
  idle: {
    backgroundColor: "#bec0c1ff",
  },
});
