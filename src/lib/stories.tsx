import { useToast } from '@chakra-ui/react'

export const useAction = () => {
  const toast = useToast()

  return (message: string) => () =>
    toast({
      title: 'Action',
      description: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
    })
}
