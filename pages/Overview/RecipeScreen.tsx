import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Icon, TrashIcon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { deleteRecipe } from '@/services/recipe-service';
import { router } from 'expo-router';

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

type Recipe = {
  name: string;
  ingredients: Ingredient[];
};

export default function RecipeScreen() {
  const route = useRoute();
  const { recipe } = route.params as { recipe: any };
  const [showModal, setShowModal] = React.useState(false)

  let parsedRecipe: Recipe;
  try {
    parsedRecipe = JSON.parse(recipe);
  } catch {
    parsedRecipe = { name: 'Unbekanntes Rezept', ingredients: [] };
  }

  const deleteRecipeHandler = async (
  ) => {
    try {
      await deleteRecipe(parsedRecipe.name);
      router.push({
        pathname: '/tabs/(tabs)/overview',
      });
    } catch (error) {
      console.error('Fehler beim Löschen des Rezepts:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedRecipe.name}</Text>
      <FlatList
        data={parsedRecipe.ingredients}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientAmount}>
              {item.amount} {item.unit}
            </Text>
          </View>
        )}
      />
      <Pressable style={{ alignSelf: "flex-end", marginTop: 16 }} onPress={() => setShowModal(true)}>
        <Text style={{ color: "red" }}>
          Rezept löschen
        </Text>
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-[305px] items-center">
          <ModalHeader>
            <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
              <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
            </Box>
          </ModalHeader>
          <ModalBody className="mt-0 mb-4">
            <Heading size="md" className="text-typography-950 mb-2 text-center">
              Löschen des Rezpetes
            </Heading>
            <Text size="sm" className="text-typography-500 text-center">
              Sind Sie sicher das Sie dieses Rezept löschen wollen ?
            </Text>
          </ModalBody>
          <ModalFooter className="w-full p-4">
            <Button
              variant="outline"
              action="secondary"
              size="sm"
              onPress={() => {
                setShowModal(false)
              }}
              className="flex-grow"
            >
              <ButtonText>Abbrechen</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModal(false),
                  deleteRecipeHandler()
              }}
              size="sm"
              className="flex-grow"
            >
              <ButtonText>Löschen</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  ingredientName: {
    fontSize: 18
  },
  ingredientAmount: {
    fontSize: 18
  }
});
