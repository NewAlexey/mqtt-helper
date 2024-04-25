import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TestingPage } from "src/view/pages/Testing/TestingPage.tsx";

export default function App() {
    return (
        <>
            <TestingPage />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnHover
                draggable={false}
                theme="light"
            />
        </>
    );
}
