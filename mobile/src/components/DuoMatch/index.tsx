import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ModalProps,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CheckCircle, X } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopying, setIsCopying] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopying(true);

        await Clipboard.setStringAsync(discord).then(
            () => {
                setIsCopying(false);
                Alert.alert(
                    "Discord copiado!",
                    "Usuário copiado para você colar no discord!"
                );
            },
            () => {
                setIsCopying(false);
                Alert.alert("Falha ao copiar!", "Falha ao copiar usuário!");
            }
        );
    }

    return (
        <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <X size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading
                        title="Let’s play!"
                        subtitle="Agora é só começar a jogar!"
                        style={styles.heading}
                    />
                    <Text style={styles.label}>Adicione no Discord</Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>
                            {isCopying ? (
                                <ActivityIndicator
                                    color={THEME.COLORS.PRIMARY}
                                />
                            ) : (
                                discord
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
