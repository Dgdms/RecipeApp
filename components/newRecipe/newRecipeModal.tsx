import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '../ui/modal';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '../ui/checkbox';
import { Button, ButtonText } from '../ui/button';
import { CheckIcon } from '../ui/icon';

interface RecipeModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (recipeName: string, recipeDescription: string) => void;

}

const RecipeModal: React.FC<RecipeModalProps> = ({ isVisible, onClose, onSave }) => {
    const [recipeName, setRecipeName] = useState<string>('');
    const [recipeDescription, setRecipeDescription] = useState<string>('');
    const [hasPlaceholderImage, setHasPlaceholderImage] = useState<boolean>(true);



    return (
        <Modal isOpen={isVisible}>
            <ModalBackdrop />
            <ModalContent>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        marginBottom: 10,
                        paddingLeft: 8,
                        borderRadius: 8,
                    }}
                    placeholder="Rezeptname"
                    value={recipeName}
                    onChangeText={setRecipeName}
                />

                <TextInput
                    style={{
                        height: 80,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        marginBottom: 10,
                        paddingLeft: 8,
                        borderRadius: 8,
                    }}
                    placeholder="Rezeptbeschreibung"
                    value={recipeDescription}
                    onChangeText={setRecipeDescription}
                    multiline
                />


                <ModalHeader>
                <Button onPress={() => {onSave(recipeName, recipeDescription), onClose()}} size="sm">
                    <ButtonText>Speichern</ButtonText>
                </Button>
                    <ModalCloseButton>
                        <Button onPress={onClose} variant="outline" size="sm" style={{ marginRight: 10 }}>
                            <ButtonText>Abbrechen</ButtonText>
                        </Button>
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody />
            </ModalContent>
        </Modal>
    );
};

export default RecipeModal;
