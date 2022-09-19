import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.COLORS.OVERLAY,
    },
    content: {
        width: 311,
        backgroundColor: THEME.COLORS.SHAPE,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 40,
    },
    closeIcon: {
        position: "absolute",
        top: 16,
        right: 16,
    },
    heading: {
        alignItems: "center",
        marginTop: 24,
    },
    label: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginTop: 24,
    },
    discordButton: {
        width: 231,
        height: 48,
        backgroundColor: THEME.COLORS.BACKGROUND_900,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        paddingVertical: 11,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    discord: {
        color: THEME.COLORS.CAPTION_200,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    },
});
