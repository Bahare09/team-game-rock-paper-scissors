import Right_Rock from "../../assets/media/right_rock.webp";
import Right_Paper from "../../assets/media/right_paper.webp";
import Right_Scissors from "../../assets/media/right_scissors.webp";

const HandImage2 = ({ option, animationClass }) => {
  return (
    <>
      {option === "Rock" && (
        <img
          className={`right_hand ${animationClass}`}
          src={Right_Rock}
          alt="rock hand"
        />
      )}
      {option === "Paper" && (
        <img
          className={`right_hand ${animationClass}`}
          src={Right_Paper}
          alt="paper hand"
        />
      )}
      {option === "Scissors" && (
        <img
          className={`right_hand ${animationClass}`}
          src={Right_Scissors}
          alt="scissors hand"
        />
      )}
    </>
  );
};

export default HandImage2;
