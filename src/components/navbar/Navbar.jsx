import React from 'react'
import Logout from '../button/Logout'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'


const Navbar = () => {
    return (
        <nav className='py-8 w-full'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center mx-auto '>
                    <Button>
                        <HamburgerMenuIcon/>
                    </Button>
                    <div className='flex space-x-4 items-center'>
                        <Logout />
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                </div>

            </div>

        </nav>
    )
}

export default Navbar