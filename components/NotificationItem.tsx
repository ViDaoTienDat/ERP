import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Color from '@/constants/theme/Color';
import AppStyle from '@/constants/theme';
import { useSelector } from 'react-redux';

interface NotificationItemProps {
  type: string;
  time: string;
  content: string;
  isRead: boolean;
  onPress?: () => void;
}

export default function NotificationItem({ type, time, content, isRead, onPress }: NotificationItemProps) {
  const imgUrl = useSelector((state: any) => state.userdata.avatar);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: isRead ? 'transparent' : Color.color_primary }]}>
        <Image 
          style={AppStyle.StyleCommon.size_avt_small} 
          source={imgUrl ? { uri: imgUrl } : require('../assets/images/avt.png')} 
        />
        <View style={styles.contentContainer}>
          <View style={styles.messageRow}>
            <Text style={[AppStyle.StyleCommon.textBlack16w500, styles.type]}>[{type}]</Text>
            <Text 
              numberOfLines={1} 
              ellipsizeMode="tail" 
              style={[AppStyle.StyleCommon.textBlack16w400, styles.content]}
            >
              {content}
            </Text>
          </View>
          <Text style={[AppStyle.StyleCommon.textBlack14w400, styles.time]}>{time}</Text>
        </View>
          {!isRead && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Color.color1,
    gap: 10,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    gap: 5,
    width: 'auto',
  },
  messageRow: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  type: {
    color: '#930909',
  },
  content: {
    flexShrink: 1,
  },
  time: {
    color: '#2768E8',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E3564C',
  },
});
