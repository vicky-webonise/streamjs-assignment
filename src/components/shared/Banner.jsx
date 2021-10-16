import PropTypes from "prop-types";

const Banner = ({ title, slogan }) => {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{title}</h1>
        <p className="lead text-muted">{slogan} </p>
      </div>
    </section>
  );
};

Banner.defaultProps = {
  title: "Default title",
  slogan: "Default slogan",
};

Banner.propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string,
};

export default Banner;
