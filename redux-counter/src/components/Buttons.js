import React from 'react';
import PropsTypes from 'prop-types';

import './Buttons.css';

const Buttons =({onCreate,onRemove})=>{
    return(
        <div className="Buttons">
            <div className="btn add" onClick={onCreate}>생성</div>
            <div className="btn remove" onClick={onRemove}>제거</div>
        </div>
    );
}

Buttons.propsTypes={
    onCreate : PropsTypes.func,
    onRemove : PropsTypes.func
};

Buttons.defaultProps={
    onCreate:()=>console.warn('onCreate not define'),
    onRemove:()=>console.warn('onRemove not define')
}

export default Buttons;