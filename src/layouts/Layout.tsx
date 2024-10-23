import Footer from "../components/Footer";
import Header from "../components/Header"

interface Props {
    children: React.ReactNode;//Any type of data
}
const Layout = ({children}:Props) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <div className="container mx-auto flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;
