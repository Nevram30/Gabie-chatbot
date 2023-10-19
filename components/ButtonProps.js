import React from 'react';
import { Button } from 'react-native';

const CustomButton = ({ title, onPress, color, style }) => {
  return <Button title={title} onPress={onPress} color={color} style={style}/>;
};

export default CustomButton;
