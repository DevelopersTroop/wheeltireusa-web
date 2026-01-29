import { useContext } from 'react';
import { MainMenuContext } from './MainMenuProvider';

const useMainMenu = () => {
    return useContext(MainMenuContext);
};

export default useMainMenu;
