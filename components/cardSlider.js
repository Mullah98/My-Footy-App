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
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    return (
        <div className="card-slider">
         <Slider {...settings}>
          {fixtures.map((fixture, i) => (
          <div className="matches" key={i}>
          <h4>{fixture.formattedDate}</h4>
          <h4>Venue: {fixture.fixture.venue.name}</h4>  
          <h3>
           <Image src={fixture.teams.home.logo} className="home-log" alt="icon for home team" height={150} width={140} priority={true} />
            {fixture.teams.home.name}<br /> vs <br /> {fixture.teams.away.name}
           <Image src={fixture.teams.away.logo} className="away-logo" alt="icon for away team" height={150} width={140} priority={true} />
           </h3>
          </div>
        ))}
        </Slider>
        </div>
    )

}