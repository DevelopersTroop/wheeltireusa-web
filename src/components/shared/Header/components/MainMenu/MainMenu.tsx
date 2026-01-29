import MainMenuProvider from "./context/MainMenuProvider";
import NavBar from "./components/NavBar/NavBar";

const MainMenu = () => {
    return (
        <div className="hidden min-[1160px]:block sticky top-0 w-full z-50 bg-gray-600">
            <MainMenuProvider>
                <header className="w-full  relative container">
                    <div className="relative flex min-h-[70px]">
                        <NavBar />
                    </div>
                </header>
            </MainMenuProvider>
        </div>
    );
};

export default MainMenu;