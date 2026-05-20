import "./Card.scss";
import type { ReactNode } from "react";

interface CardButton {
  name: string;
  func: () => void;
  buttonIcon: ReactNode;
}

interface CardProps {
  cardData?: CardButton[];
  content: ReactNode;
  onContentClick?: () => void;
}

function Card({ cardData, content, onContentClick }: CardProps) {
  const buttons = cardData?.map((b) => (
    <div key={b.name} onClick={b.func} className="card-ation-button">
      {b.buttonIcon}
    </div>
  ));

  return (
    <div className="card">
      <div onClick={onContentClick} className="card-name">
        {content}
      </div>
      {buttons}
    </div>
  );
}

export default Card;
