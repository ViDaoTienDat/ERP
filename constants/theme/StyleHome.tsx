import { StyleSheet } from "react-native";
import Color from "./Color";
import dimension from '../theme/Dimension';
const width = dimension.window.width;


const StyleHome = StyleSheet.create({
    textTitleLarge: {
        width: width - 30,
        alignSelf: 'center',
        color: Color.color2,
        fontSize: 22,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    boxInternalNews: {
        borderBottomColor: Color.color1,
        borderBottomWidth: 1,
    },
    boxCategory: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    background:{
        flex: 1,
        
    }
  })
  export default StyleHome;