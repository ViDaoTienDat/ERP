import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppStyle from '@/constants/theme'

export default function ContentProfile( {title, content}: any) {
  return (
    <View style={styles.container}>
      <Text style={AppStyle.StyleCommon.textBlack18}>{title}</Text>
      <Text style={AppStyle.StyleCommon.textBlack15}>{content}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomWidth: 1,
    }
})