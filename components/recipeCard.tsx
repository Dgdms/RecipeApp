import React from 'react';
import { Image } from '@/components/ui/image';
import { Box } from './ui/box';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import { HStack } from './ui/hstack';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
const RecipeCard = ({ recipe }) => {
  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3">
      <Image
        source={{
          uri: "https://gluestack.github.io/public-blog-video-assets/yoga.png",
        }}
        alt='test'
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        May 15, 2023
      </Text>
      <Heading size="md" className="mb-4">
        The Power of Positive Thinking
      </Heading>
    </Card>
  );
};

export default RecipeCard;
