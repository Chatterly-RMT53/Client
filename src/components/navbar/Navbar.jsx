import React from 'react'
import Logout from '../button/Logout'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import {Separator} from '../ui/separator'

const Navbar = () => {
    return (
        <>

        <nav className='py-4 w-full '>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center mx-auto '>
                    <div>
                    <Button className="block md:hidden">
                        <HamburgerMenuIcon/>
                    </Button>
                    </div>
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
            <Separator  className="mb-16"/>
        </>


    )
}

export default Navbar