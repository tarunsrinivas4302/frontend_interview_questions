const Pills = ({ image, onClick, text }) => {
    return (
      <span onClick={onClick} className="selected-pill">
        <img src={image} alt={text} />
        <span>{text}</span>
        <span>&times;</span>
      </span>
    );
  };
  export default Pills;