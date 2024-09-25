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
                <span className="information">
                Venue: {fixture.fixture.venue.name}
                </span>
                <span className="information">
                Referee: {fixture.fixture.referee}
                </span>  

            <h3>{fixture.teams.home.name}<br /> vs <br /> {fixture.teams.away.name}</h3>
                <Image src={fixture.teams.home.logo}
                 className="home-logo"
                 alt="home team logo" 
                 height={150} 
                 width={140} 
                 priority={true} />

            {fixture.goals.home !== null && fixture.goals.away !== null ? (
                <div className="scores">
                <span className="goals">{fixture.goals.home}</span> - <span className="goals">{fixture.goals.away}</span>
                </div>
            ) : (
                <h4>{fixture.formattedDate}</h4>
            )}

            {fixture.fixture.status.elapsed >= 90 ? (
                <h3 className="finished">FT</h3>
            ) : fixture.fixture.status.short === 'HT' ? (
                <h3>HT</h3>
            ) : fixture.fixture.status.elapsed !== null ? (
                <h3 className="live">{fixture.fixture.status.elapsed}{"'"}</h3>
            ) : null}
            
                 <Image src={fixture.teams.away.logo} 
                 className="away-logo" 
                 alt="away team logo" 
                 height={150} 
                 width={140} 
                 priority={true} />
            </div>
        ))}
         </Slider>
        </div>
    )

}