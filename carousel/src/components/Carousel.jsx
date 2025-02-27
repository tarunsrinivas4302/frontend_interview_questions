
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line react/prop-types
const Carousel = ({ data = [] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => slideNextItem(), 2000)
        return () => clearInterval(timer);
    }, [currentIndex])

    const handleControl = (index) => {
        setCurrentIndex(index > data.length - 1 ? 0 : (index < 0 ? data.length - 1 : index));
    }

    const slideNextItem = () => {
        setCurrentIndex(prev => prev === data.length - 1 ? 0 : prev + 1)
    }

    if (!data) {
        return;
    }

    return (
        <div className="carousel-container">
            {
                data.map((item, index) => (
                    <div key={index} >
                        <CircleChevronLeft className='left' onClick={() => handleControl(currentIndex - 1)} />
                        {currentIndex === index ? <img src={item.image} alt={item.caption} className="carousel-image" /> : ""}
                        <CircleChevronRight className="right" onClick={() => handleControl(currentIndex + 1)} />
                    </div>
                ))
            }
        </div>
    )
}

export default Carousel
