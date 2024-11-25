import Toast from 'react-native-root-toast';
import { COLORS } from '../styles/colors';
const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

export const showToast = (msg: string, p0: string) => {
    Toast.show(capitalizeFirstLetter(msg), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        shadowColor: 'rgba(0,0,0,0.3)',
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: COLORS.light.primary,
        opacity: 0.9,
        textColor: "#fff",
        containerStyle: {
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            top: 20,
            zIndex: 99999999999,
            shadowOpacity: 0.2,
        },
        textStyle: {
            fontSize: 12,
            fontFamily: 'Open-Regular'
        },
    });
}