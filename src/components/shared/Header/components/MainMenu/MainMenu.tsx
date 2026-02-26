import MainMenuProvider from "./context/MainMenuProvider";
import NavBar from "./components/NavBar/NavBar";

const MainMenu = () => {
    return (
        <MainMenuProvider>
            <NavBar />
        </MainMenuProvider>
    );
};

export default MainMenu;