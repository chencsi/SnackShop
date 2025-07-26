import { Link as RouterLink } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 w-[calc(100%-1rem)] z-50 p-5 mx-2 mt-2 flex bg-white rounded-lg shadow-lg text-stone-700">
            <RouterLink
            to="/"
            className="font-extrabold text-2xl drop-shadow-2xl"
            >
            Snack Shop
            </RouterLink>
            {}
        </nav>
    )
}
