import { useEffect, useState } from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import { BACKEND_URL } from '../config';

type Cart = Array<{
  id: string;
  title: string;
  img: string;
  price: number;
}>;

export default function TabOneScreen() {
  const [cart, setCart] = useState<Cart>() as [Cart, (cart: Cart) => void];
  const [cartStatus, setCartStatus] = useState('loading');

  const fetchCart = async () => {
    const response = await fetch(`${BACKEND_URL}/products`);
    const parsed: Cart = await response.json();
    setCart(parsed);
  }

  const checkout = async () => {
    const response = await fetch(`${BACKEND_URL}/checkout`);
    setCartStatus('ready');
    if (response.status !== 200) {
      throw new Error(response.statusText || 'Unknown error');
    }
  }

  const onCheckoutPress = () => {
    setCartStatus('processing');
    checkout();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const Cart = cart && cart.slice(0, 2).map((item) => (
    <View key={item.id} className='mb-6'>
      <Text className='text-2xl'>{item.title}</Text>
      <View className='flex flex-row justify-between'>
        <Image width={200} height={200}
          source={{
            uri: item.img,
          }}
        />
        <View className='flex justify-end'>
          <Text className='text-2xl'>Item: {item.price} EUR</Text>
        </View>
      </View>
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
          <Text className='text-2xl mb-5' disabled={cartStatus==='loading' || cartStatus!=='ready'}>{cartStatus==='ready' || cartStatus==='loading' ? 'Checkout' : 'Processing...'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
