import React from 'react';
import styles from './TodoInput.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//input버튼과 함께있는 컴포넌트
//value: input값
//onChange: input변경이벤트
//onInsert: 추가버튼 클릭이벤트

const TodoInput = ({value, onChange, onInsert}) =>{
    //엔터키가 눌리면 onInsert실행
    const handleKeyPress = (e)=>{
        if(e.key ==='Enter'){
            onInsert();
        };
    };

    return(
        <div className={cx('todo-input')}>
            <input onChange={onChange} value={value} onKeyPress={handleKeyPress}/>
            <div className={cx('add-button')} onClick={onInsert}>추가</div>
        </div>
    );
};


export default TodoInput;