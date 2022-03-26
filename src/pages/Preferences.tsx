import BackButton from "../components/preferences/BackButton";
import "../styles/preferences.scss";

type Props = {
  onReturn: () => void;
};

function Preferences(props: Props) {
  return (
    <>
      <BackButton onClick={props.onReturn} />
    </>
  );
}

export default Preferences;
