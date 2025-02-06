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
                    <TouchableOpacity style={styles.closeButton} onPress={onClose} >
                        <Icon name="close" size={30} color="#000" />
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
                                onPress={() => {pressedValue(item), onClose}} // Schließt das Modal, wenn eine Zahl gedrückt wird
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dimmter, halbtransparenter Hintergrund  },
    },
    modalContent: {
        width: '80%', // Breite des Modals
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center', // Zentriert den Inhalt
        position: 'relative', // Damit das Schließen-Icon oben rechts positioniert werden kann
    },
    closeButton: {
        paddingLeft: 5,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 15,
        fontWeight: 'bold',
    },
    numberButton: {
        width: 70,
        height: 70,
        margin: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    numberText: {
        fontSize: 24,
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NumberGridModal;
