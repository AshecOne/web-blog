import * as React from "react";
import Container from "../components/Container";
import Banner from "../components/Banner";
import Destination from "../components/Destination";

interface IBookingProps {}

const Booking: React.FunctionComponent<IBookingProps> = (props) => {
  return (
    <section id="booking" className="bg-white pb-5 mb-6 pt-3">
      <Container>
        <div className="mt-2 pt-3">
          <Banner />
          <div className="mt-24 mx-4 mb-6">
            <h1 className="text-black m:text-3xl text-2xl font-bold mb-4 mt-4 pt-3">
              Top Destinations
            </h1>
            <p className="text-black text-sm font-bold mb-8">
              Tick one more destination off of your bucket list with one of our
              most popular vacations in 2022
            </p>
          </div>
          <div className="hidden m:flex justify-center flex-wrap pb-5 mb-6 pt-1 mt-2">
            <Destination
              img="https://ashecone.github.io/web-blog/dominican.jpg"
              name="dominican"
              about="Dominican Republic"
            />
            <Destination
              img="https://ashecone.github.io/web-blog/desert.jpg"
              name="desert"
              about="Maecenas Tincidunt"
            />
            <Destination
              img="https://ashecone.github.io/web-blog/tower.webp"
              name="tower"
              about="Dominican Republic"
            />
            <Destination
              img="https://ashecone.github.io/web-blog/road2.jpg"
              name="road2"
              about="Dominican Republic"
            />
            <Destination
              img="https://ashecone.github.io/web-blog/road.jpg"
              name="road"
              about="Dominican Republic"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Booking;
