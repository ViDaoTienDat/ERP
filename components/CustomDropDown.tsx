import Color from '@/constants/theme/Color';
import React, { useEffect, useState } from 'react';import {
    StyleSheet,
    View,
  } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
type Data = {
    data: { label: string; value: string; }[];
    firstValue: string;
    onChange: Function;
}
  function CustomDropdown({data, firstValue, onChange}: Data): React.JSX.Element {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setvalue] = useState<string | null>(null);

    useEffect(() => {
      if (data.length > 0) {
        setvalue(firstValue);
      }
    }, [data]);
    
      return (
      <View style={selfstyle.container}>
        <Dropdown
          style={[selfstyle.dropdown]}
          placeholderStyle={selfstyle.dropdownTextStyle}
          selectedTextStyle={selfstyle.dropdownTextStyle}
          inputSearchStyle={selfstyle.inputSearchStyle}
          iconStyle={selfstyle.iconStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Địa điểm' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={async (item: { value: React.SetStateAction<string | null>; }) => {
            setvalue(item.value);
            setIsFocus(false);
            onChange(item.value);
          }}
        />
      </View>
    );
  }
  
  const selfstyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderColor: Color.color4,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownTextStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: Color.color2
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 14,
      },
      dropdown: {
        width: '90%',
      }
  })
  export default CustomDropdown;