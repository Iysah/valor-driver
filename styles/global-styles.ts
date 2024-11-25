import { StyleSheet } from "react-native";

export const GLOBALSTYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 18,
        marginTop: 15,
        backgroundColor: '#FAFAFA'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0F2D52',
        textAlign: 'center',
        marginVertical: 20,
    },
    column: {
        justifyContent: 'center'
    },
    card: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 24
    },
    textCenter: {
        textAlign: 'center'
    },
    iosShadowB: {
        shadowColor: '#000',
        shadowOffset: { width: -20, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 4,  
    },
    iosShadowT: {
        shadowColor: '#000',
        shadowOffset: { width: -20, height: -5 },
        shadowOpacity: 0.03,
        shadowRadius: 4,  
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 16,
        marginTop: 10
     },
})