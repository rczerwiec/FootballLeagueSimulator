import './Card.scss';

function Card({ cardData, content, onContentClick }) {

  let buttons;
  if(cardData){
    buttons = cardData.map((b) => {
      return (
        <div key={b.name} onClick={b.func} className="card-ation-button">
          {b.buttonIcon}
        </div>
      );
    });
  }


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
