import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import { useScrollToTop } from '../hooks/ScrollToTop';

import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode; //Any type of data
    noPadding?: boolean;
}

const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const Layout = ({ children, noPadding }: Props) => {
    useScrollToTop();
    return (
        <div className="flex flex-col bg-offwhite">
            <Header />
            <motion.div
                className={`mx-0 min-h-screen flex-1 ${noPadding ? '' : 'py-44'}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
            <Footer />
        </div>
    );
};

export default Layout;
