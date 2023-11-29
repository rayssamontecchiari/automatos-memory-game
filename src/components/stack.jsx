import { useState } from 'react';

const useStack = () => {
  const [stack, setStack] = useState([]);

  const pushToStack = (item) => {
    setStack((prevStack) => [...prevStack, item]);
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      // A pilha está vazia, não podemos fazer pop
      return undefined;
    }

    const poppedItem = stack[stack.length - 1];
    setStack((prevStack) => prevStack.slice(0, -1)); // Remover o último item

    return poppedItem;
  };

  return { stack, setStack, pushToStack, popFromStack };
};

export default useStack;