import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import {withPopup} from '../../hocs/with-popup';

import {ReactComponent as PopupCloseButtonIcon} from '../../images/popup-close-button-icon.svg';

const ThankYou = ({onCloseButtonClick}) => {
  return (
    <div className="thank-you">
      <FocusTrap>
        <div className="thank-you__popup">
          <strong>Спасибо за обращение в&nbsp;наш банк.</strong>
          <p>Наш менеджер скоро свяжется с вами<br/>
            по указанному номеру телефона.</p>

          <button className="thank-you__close-button" type="button" onClick={onCloseButtonClick}>
            <PopupCloseButtonIcon/>
            <span>Закрыть</span>
          </button>
        </div>
      </FocusTrap>
    </div>
  );
};

ThankYou.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
};

const ThankYouWithPopup = withPopup(ThankYou);

export {ThankYou, ThankYouWithPopup};
