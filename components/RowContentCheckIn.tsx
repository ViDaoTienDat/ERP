import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppStyle from '@/constants/theme'
import Color from '@/constants/theme/Color'

export default function RowContentCheckIn({title, content}: any) {
  return (
    <View style={styles.container}>
      <Text style={[AppStyle.StyleCommon.textBlack16w500, {flex: 1}]}>{title}</Text>
      <Text style={[AppStyle.StyleCommon.textBlack16w400, {flex: 2}]}>{content}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      width: "100%",
      height: "auto",
      borderBottomWidth: 1,
      borderColor: Color.color1,
    }
})