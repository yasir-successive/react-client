import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({ index: getRandomNumber(banners.length) });
        return;
      }
      const val = getNextRoundRobin(banners.length, index);
      this.setState({
        index: val,
      });
    }, duration);
  }

ComponentWillUnmount = () => {
  clearInterval(this.interval);
}

render() {
  const {
    altText,
    banners,
    defaultBanner,
    duration,
    height,
    random,
    ...rest

  } = this.props;
  const { index } = this.state;
  const source = (banners) ? banners[index] : defaultBanner;
  return (
    <>
      <img src={source} {...rest} alt={altText} height={height} />
    </>
  );
}
}
Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.string,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  altText: 'Default Banner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
export default Slider;
