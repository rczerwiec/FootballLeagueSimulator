import Card from "../../components/Layout/Card";
import { FiTrash } from "react-icons/fi";

function LeagueCard({ league, onClick }) {
  const inSeason = Boolean(league.seasonId);
  const content = (
    <div className="flex items-center gap-2">
      <div>{league.name}</div>
      {inSeason ? (
        <span className="text-xs bg-emerald-700 text-white px-2 py-0.5 rounded">
          sezon · poziom {league.tier ?? "?"}
        </span>
      ) : (
        <span className="text-xs bg-slate-500 text-white px-2 py-0.5 rounded">
          poza sezonem
        </span>
      )}
      {league.complete && (
        <span className="text-xs bg-blue-700 text-white px-2 py-0.5 rounded">
          ukończona
        </span>
      )}
    </div>
  );

  const cardData = [{ buttonIcon: <FiTrash />, func: () => {}, name: "Remove" }];

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
