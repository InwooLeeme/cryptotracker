import { WiSolarEclipse, WiMoonAltWaxingCrescent3 } from "react-icons/wi";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ThemeFlag, themeState } from "./atoms";

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.6rem;
  border: none;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
  border-radius: 50%;
`;

const ToggleTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const handleClick = () => {
    if (theme === ThemeFlag.light) {
      setTheme(ThemeFlag.dark);
    } else setTheme(ThemeFlag.light);
  };
  return (
    <Btn onClick={handleClick}>
      {theme === ThemeFlag.dark ? (
        <WiSolarEclipse />
      ) : (
        <WiMoonAltWaxingCrescent3 />
      )}
    </Btn>
  );
};

export default ToggleTheme;
