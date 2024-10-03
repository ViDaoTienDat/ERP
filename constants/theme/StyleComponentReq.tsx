import {
    StyleSheet
} from 'react-native';
import Color from './Color';
const StyleComponentReq = StyleSheet.create({
    card: {
        paddingVertical: 10,
        borderBottomColor: Color.color1,
        borderBottomWidth: 2,
    },
    titleCard: {
        width: '90%', alignSelf: 'center',
        fontSize: 20, fontWeight: 'bold',
        color: Color.color2,
    },
    cardItem: {
        width: '90%', alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 0.5, borderBottomColor: Color.color1
    },
    cardLabel: {
        width: '30%',
        fontSize: 15, color: Color.color2
    },
    cardValue: {
        fontSize: 15, color: Color.color2
    },
    infoItem: {
        paddingVertical: 5,
        paddingHorizontal: '5%',
    },
    infoSpec: {
        backgroundColor: Color.color9
    },
    infoLabel: {
        fontSize: 16, color: Color.color2, fontWeight: '500'
    },
    infoValue: {
        fontSize: 14, color: Color.color2
    }

});
export default StyleComponentReq;