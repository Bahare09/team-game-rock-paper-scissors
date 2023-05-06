import Left_Rock from "../../assets/media/left_rock.webp";
import Left_Paper from "../../assets/media/left_paper.webp";
import Left_Scissors from "../../assets/media/left_scissors.webp";

const Hand_Image_1 = ({ option, animationClass }) => {
  return (
    <>
      {option === "Rock" && (
        <img
          className={`left_hand ${animationClass}`}
          src={Left_Rock}
          alt="rock hand"
        />
      )}
      {option === "Paper" && (
        <img
          className={`left_hand ${animationClass}`}
          src={Left_Paper}
          alt="paper hand"
        />
      )}
      {option === "Scissors" && (
        <img
          className={`left_hand ${animationClass}`}
          src={Left_Scissors}
          alt="scissors hand"
        />
      )}
    </>
  );
};

export default Hand_Image_1;
