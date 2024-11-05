import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'home':
      imageSource = require('../assets/panel/home.png');
      active && iconStyle.push(styles.active);
      break;
    case 'arts':
      imageSource = require('../assets/panel/arts.png');
      active && iconStyle.push(styles.active);
      break;
    case 'legends':
      imageSource = require('../assets/panel/legends.png');
      active && iconStyle.push(styles.active);
      break;
    case 'places':
      imageSource = require('../assets/panel/sights.png');
      active && iconStyle.push(styles.active);
      break;
    case 'close':
      imageSource = require('../assets/common/close.png');
      iconStyle.push(styles.closeIcon);
      break;
    case 'back':
      imageSource = require('../assets/common/go-back.png');
      iconStyle.push(styles.backIcon);
      break;
    case 'folder':
      imageSource = require('../assets/common/folder.png');
      break;
    case 'edit':
      imageSource = require('../assets/common/edit.png');
      break;
    case 'delete':
      imageSource = require('../assets/common/delete.png');
      break;
    case 'plus':
      imageSource = require('../assets/common/plus.png');
      iconStyle.push(styles.backIcon);
      break;
    case 'back-arrow':
      imageSource = require('../assets/common/back-arrow.png');
      break;
    case 'happy':
      imageSource = require('../assets/daily/happy.png');
      break;
    case 'sad':
      imageSource = require('../assets/daily/sad.png');
      break;
    case 'arrow':
      imageSource = require('../assets/arts/arrow.png');
      iconStyle.push(styles.arrowIcon);
      break;
    case 'clock':
      imageSource = require('../assets/quiz/clock.png');
      break;
    case 'life-gone':
      imageSource = require('../assets/quiz/life-gone.png');
      break;
    case 'life':
      imageSource = require('../assets/quiz/life.png');
      break;
    case 'congrats':
      imageSource = require('../assets/quiz/congrats.png');
      break;
    case 'map':
      imageSource = require('../assets/places/map.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  backIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  arrowIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  lifeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#d6d1d0',
  }
});

export default Icons;
