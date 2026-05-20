import Card from "../../components/Layout/Card";
import { FiTrash } from "react-icons/fi";

function LeagueCard({ league, onClick }) {
  let content = <div>{league.name}</div>;

  const cardData = [{ buttonIcon: <FiTrash />, func: () => {}, name:"Remove"}];

  const handleOnContentClick = () => {
    onClick(league);
  };

  return (
    <Card
      content={content}
      cardData={cardData}
      onContentClick={handleOnContentClick}
    />
  );
}

export default LeagueCard;
