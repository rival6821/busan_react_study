import CounterList from '../components/CounterList';
import * as actions from '../actions';
import {connect} from 'react-redux';
import getRandomColor from '../lib/getRandomColor';


const mapStateToProps = (state)=>({counters:state.counters});

//dispatch를 파라미터로 받아 액션을 디스패치하는 함수들을 객체안에 넣어서 반환
const mapDispatchToProps = (dispatch)=>({
    onIncrement:(index)=>dispatch(actions.increment(index)),
    onDecrement:(index)=>dispatch(actions.decrement(index)),
    onSetColor:(index)=>{
        const color = getRandomColor();
        dispatch(actions.setColor({index,color}));
    }
});

const CounterListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterList);

export default CounterListContainer;