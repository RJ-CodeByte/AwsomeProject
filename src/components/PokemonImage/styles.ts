import { StyleSheet } from "react-native";
import Color from "~/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:5,
    backgroundColor:Color.WHITE,
    borderRadius:10,
    padding:10
},
imgStyle:{
    // height:100,
    width:'100%',
    aspectRatio:8/9
}
})