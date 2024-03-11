import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="bg-gray-800 text-white p-4">
        <Link to="/" className="text-lg font-bold mr-4">Home</Link>
        <Link to="/about" className="text-lg font-bold">About</Link>
      </div>
    )
}

export default Navbar