import { Dimensions } from 'react-native';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Reference dimensions for your design (e.g., iPhone X/11 design)
const designWidth = 395;  // Your design's base width
const designHeight = 852; // Your design's base height

// Responsive width function
export const responsiveWidth = (desiredWidth:any) => {
  return (desiredWidth / designWidth) * screenWidth;
};

// Responsive height function
export const responsiveHeight = (desiredHeight:any) => {
  return (desiredHeight / designHeight) * screenHeight;
};
