import { Box, Flex, Link as ChakraLink, Button, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav className="bg-amber-300 flex items-center">
                <ChakraLink as={RouterLink} to="/" fontWeight="bold" fontSize="lg" color="teal.500">
                    SnackShop
                </ChakraLink>
                <Spacer />
                <div className='flex flex-row gap-4'>
                    <ChakraLink as={RouterLink} to="/login" color="teal.600" _hover={{ textDecoration: 'underline' }}>
                        <Button variant={'outline'} bg={'white'}>Login</Button>
                    </ChakraLink>
                </div>
        </nav>
    )
}