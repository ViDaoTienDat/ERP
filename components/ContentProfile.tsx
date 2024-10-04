import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppStyle from '@/constants/theme'
import Color from '@/constants/theme/Color'

export default function ContentProfile( {title, content}: any) {
  return (
    <View style={styles.container}>
      <Text style={AppStyle.StyleCommon.textBlack14w400}>{title}</Text>
      <Text style={AppStyle.StyleCommon.textBlack18}>{content}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderColor: Color.color1,
      padding: 15,
      width: "100%",
      height: "auto",
    }
})