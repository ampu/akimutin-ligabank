import React from 'react';
import {Map, Placemark, YMaps, ZoomControl, GeolocationControl} from 'react-yandex-maps';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import officePin from '../../images/office-pin.svg';

import officesMapDesktop from '../../images/offices-map--desktop.jpg';
import officesMapTablet from '../../images/offices-map--tablet.jpg';
import officesMapMobile from '../../images/offices-map--mobile.jpg';

import retinaOfficesMapDesktop from '../../images/offices-map--desktop@2x.jpg';
import retinaOfficesMapTablet from '../../images/offices-map--tablet@2x.jpg';
import retinaOfficesMapMobile from '../../images/offices-map--mobile@2x.jpg';

const PinLocation = {
  MOSCOW: [55.755819, 37.617644],
  SARATOV: [51.533562, 46.034266],
  KAZAN: [55.796127, 49.106414],
  TYUMEN: [57.152985, 65.541227],
  OMSK: [54.989347, 73.368221],
};

const PinDescription = {
  MOSCOW: `Офис Лига Банка в Москве`,
  SARATOV: `Офис Лига Банка в Саратове`,
  KAZAN: `Офис Лига Банка в Казани`,
  TYUMEN: `Офис Лига Банка в Тюмени`,
  OMSK: `Офис Лига Банка в Омске`,
};

const MAP_PROPS = {
  state: {
    center: [57.3, 60.99],
    zoom: 4.9,
  },
  options: {
    avoidFractionalZoom: false,
  },
  style: {
    width: `100%`,
  },
  className: `offices__map-container`
};

const ZOOM_PROPS = {
  options: {
    size: `small`,
    position: {
      right: 15,
      top: 210,
    },
  },
};

const GEO_PROPS = {
  options: {
    position: {
      right: 15,
      top: 285,
    },
  },
};

const PLACEMARKS_PROPS = Object.keys(PinLocation).map((cityKey) => (
  {
    cityKey: cityKey.toLowerCase(),
    geometry: PinLocation[cityKey],
    modules: [`geoObject.addon.balloon`, `geoObject.addon.hint`],
    properties: {
      hintContent: PinDescription[cityKey],
      balloonContent: PinDescription[cityKey],
    },
    options: {
      iconLayout: `default#image`,
      iconImageHref: officePin,
      iconImageSize: [37, 42],
      iconImageOffset: [-18.5, -42],
    },
  }
));

const Offices = () => {
  return (
    <section className="offices" id={LocalPath.CONTACTS}>
      <header className="offices__header">
        <h2>Отделения Лига Банка</h2>
      </header>
      <div className="offices__map">
        <div className="offices__image-container">
          <picture>
            <source media={MediaQuery.MOBILE} srcSet={`${retinaOfficesMapMobile} 2x, ${officesMapMobile} 1x`}/>
            <source media={MediaQuery.TABLET} srcSet={`${retinaOfficesMapTablet} 2x, ${officesMapTablet} 1x`}/>
            <img
              src={officesMapDesktop}
              srcSet={`${retinaOfficesMapDesktop} 2x, ${officesMapDesktop} 1x`}
              alt="Карта отделений Лига Банка."
            />
          </picture>
        </div>

        <YMaps>
          <Map {...MAP_PROPS}>
            <ZoomControl {...ZOOM_PROPS}/>
            <GeolocationControl {...GEO_PROPS}/>
            {PLACEMARKS_PROPS.map((placemarkProps) => (
              <Placemark key={placemarkProps.cityKey} {...placemarkProps}/>
            ))}
          </Map>
        </YMaps>
      </div>
    </section>
  );
};

export {Offices};
