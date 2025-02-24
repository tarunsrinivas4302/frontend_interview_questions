import {useState} from 'react'
import { FaStar } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const StarRatingComponent = ({ length , color }) => {

    const [activeStars, setActiveStars] = useState([]);
    const [rating, setRating] = useState([]);

    const handleMouseOver = (index) => {
        if (index > 0 && index <= length) {
            setActiveStars(Array.from({ length: index }, (_, i) => i + 1));
        }
    };

    const handleMouseLeave = ()=> {
        setActiveStars([]);
    };

    const handleClick = (index) => {
        console.log(`Selected star rating: ${index}`);
        setRating(Array.from({ length: index }, (_, i) => i + 1));
    };
    return (
        <div className="stars__component" onMouseLeave={handleMouseLeave}>
            {Array.from({ length }).map((_, index) => {
                const starIndex = index + 1;
                return (
                    <FaStar
                        key={starIndex}
                        className={`star  ${activeStars.includes(starIndex) || rating.includes(starIndex)
                            ? "active"
                            : ""
                            }  `}
                        color={
                            activeStars.includes(starIndex) || rating.includes(starIndex)
                                ? color
                                : "#abcdef"
                        }
                        size="22px"
                        style={{
                            transform: `${activeStars.at(-1) === starIndex ? "scale(1.2)" : "scale(1)"
                                }`,
                        }}
                        onMouseOver={() => handleMouseOver(starIndex)}
                        onClick={() => handleClick(starIndex)}
                    />
                );
            })}
        </div>
    );
}

export default StarRatingComponent
