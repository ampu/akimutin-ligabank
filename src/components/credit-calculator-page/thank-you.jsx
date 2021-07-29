import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import {withPopup} from '../../hocs/with-popup';

import {ReactComponent as PopupCloseButtonIcon} from '../../images/popup-close-button-icon.svg';

import {refType} from '../../types/ref-types';

const ThankYou = ({popupRef, onContainerMouseDown, onClose}) => {
  return (
    <div className="thank-you" onMouseDown={onContainerMouseDown}>
      <FocusTrap>
        <div ref={popupRef} className="thank-you__popup">
          <strong>Спасибо за обращение в&nbsp;наш банк.</strong>
          <p>Наш менеджер скоро свяжется с вами<br/>
            по указанному номеру телефона.</p>

          <button className="thank-you__close-button" type="button" onClick={onClose}>
            <PopupCloseButtonIcon/>
            <span>Закрыть</span>
          </button>
        </div>
      </FocusTrap>
    </div>
  );
};

ThankYou.propTypes = {
  popupRef: refType.isRequired,
  onContainerMouseDown: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ThankYouWithPopup = withPopup(ThankYou);

export {ThankYou, ThankYouWithPopup};
