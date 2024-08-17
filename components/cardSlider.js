import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styling/cardSlider.css"

export default function CardSlider({ fixtures }) {

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "flex", background: "gray" }}
                onClick={onClick}
            />
        );
    };
    
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "flex", background: "gray" }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    return (
        <div className="card-slider">
         <Slider {...settings}>
          {fixtures.map((fixture, i) => (
          <div className="cards" key={i}>
            <span className="information">Venue: {fixture.fixture.venue.name}</span>
            <span className="information">Referee: {fixture.fixture.referee}</span>  
            <h3>{fixture.teams.home.name}<br /> vs <br /> {fixture.teams.away.name}</h3>
            <Image src={fixture.teams.home.logo} className="home-log" alt="icon for home team" height={150} width={140} priority={true} />
            {fixture.goals.home !== null && fixture.goals.away !== null ? (
                <div className="scores">
                <span>{fixture.goals.home}</span> - <span>{fixture.goals.away}</span>
                </div>
            ) : (
                <h4>{fixture.formattedDate}</h4>
            )}
            <Image src={fixture.teams.away.logo} className="away-logo" alt="icon for away team" height={150} width={140} priority={true} />
          </div>
        ))}
        </Slider>
        </div>
    )

}