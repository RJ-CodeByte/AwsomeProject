import { View, Text } from 'react-native'
import React from 'react'

const temp = () => {
  return (
    <Pressable
    {...restProps}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
      },
      styles.wrapperCustom,
      btnStyle,
    ]}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Text style={[styles.text, titleStyle]}>{title}</Text>
      {showIcon && (
        <>
          <TouchableOpacity style={styles.IconStyle}>
            <Image
              source={Assets.RightArrow}
              resizeMode="contain"
              style={[styles.arrowImgStyle]}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  </Pressable>
  )
}

export default temp