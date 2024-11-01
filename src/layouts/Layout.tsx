import Footer from '../components/Footer';
import Header from '../components/Header';

interface Props {
    children: React.ReactNode; //Any type of data
    noPadding?: boolean;
}
const Layout = ({ children, noPadding }: Props) => {
    return (
        <div className="flex flex-col bg-offwhite">
            <Header />
            <div className={`container mx-auto min-h-screen flex-1 ${noPadding ? '' : 'py-44'}`}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
