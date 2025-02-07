import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type NumberGridModalProps = {
    visible: boolean;
    onClose: () => void;
    pressedValue: (value: number) => void;
};

const NumberGridModal: React.FC<NumberGridModalProps> = ({ visible, onClose, pressedValue }) => {
    // Zahlen von 1 bis 9 (Zahl 10 ist ausgeschlossen)
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true} // Transparent hinter dem Modal
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Schließen-Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Frage */}
                    <Text style={styles.questionText}>Für wie viele Personen?</Text>

                    {/* Grid */}
                    <FlatList
                        data={numbers}
                        numColumns={3} // 3 Spalten
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.numberButton}
                                onPress={() => { pressedValue(item); onClose(); }}
                            >
                                <Text style={styles.numberText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.gridContainer}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmter Hintergrund für besseren Fokus
    },
    modalContent: {
        width: '80%', // Breite des Modals
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        position: 'relative', // Damit das Schließen-Icon oben rechts positioniert werden kann
        shadowColor: '#000', // Schatten für visuelle Tiefe
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Schließen-Button Hintergrund
        padding: 8,
        borderRadius: 50,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: '600',
        color: '#333',
    },
    numberButton: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#41292c', // Grüner Hintergrund für Buttons
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2f2d2e',
        elevation: 3, // Schatten-Effekt für den Button
        transform: [{ scale: 1 }],
    },
    numberText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NumberGridModal;
