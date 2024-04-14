import { useEffect, useState } from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import { BACKEND_URL } from '../config';

type Cart = Array<{
  id: string;
  title: string;
  img: string;
}>;

export default function TabOneScreen() {
  const [cart, setCart] = useState<Cart>() as [Cart, (cart: Cart) => void];

  const fetchCart = async () => {
    const response = await fetch(`${BACKEND_URL}/products`);
    const parsed: Cart = await response.json();
    setCart(parsed);
  }

  const checkout = async () => {
    const response = await fetch(`${BACKEND_URL}/checkout`);
    if (response.status !== 200) {
      throw new Error(response.statusText || 'Unknown error');
    }
  }

  const onCheckoutPress = () => {
    console.log('on press')
    checkout();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const Cart = cart && cart.slice(0, 2).map((item) => (
    <View key={item.id} className='mb-6'>
      <Text className='text-2xl'>{item.title}</Text>
      <Image width={200} height={200}
        source={{
          uri: item.img,
        }}
      />
    </View>
  )) || [
    <View key={'loading-place-holder'}>
      <Text>Loading cart items...</Text>
    </View>
  ];

  return (
    <View className="flex-1 justify-between bg-white">
      <View>
        <Text className='text-4xl m-2'>Example cart</Text>
        <View className='m-2'>
          {Cart}
        </View>
      </View>
      <View className='flex items-center content-center'>
        <Pressable onPress={onCheckoutPress}>
          <Text className='text-1xl mb-5'>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
