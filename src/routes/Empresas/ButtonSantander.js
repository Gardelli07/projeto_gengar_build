import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import CORES from "../../util/cores";

export default function ButtonSantander({ onPress, source }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.wrapper}
    >
      <View style={styles.border}>
        <View style={styles.inner}>
          <Image source={source} style={styles.icon} resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: -15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  border: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: CORES.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },

  inner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#ec0000",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 36,
    height: 36,
  },
});
