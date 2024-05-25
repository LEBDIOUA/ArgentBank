import PropTypes from 'prop-types';

function FeatureItems({ imgLink, title, para }) {
    return (
        <div className="feature-item">
            <img src={imgLink} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{para}</p>
        </div>
    )
}

FeatureItems.propTypes = {
    imgLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    para: PropTypes.string.isRequired,
};

export default FeatureItems;