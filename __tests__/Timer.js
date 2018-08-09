import React from 'react'
import Enzyme , { shallow, mount } from 'enzyme';
import Timer from "../src/js/components/Timer";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {dispatch} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {
    const mockStore = configureStore();
    const initialState = {
        time: 0,
        gameOn: false,
    };

    const newState = {
        time: 60,
        gameOn: true,
    };

    const wrapper = mount(<Provider store={mockStore(initialState)} ><Timer/></Provider>);

    it('timer set to 0 on initial state', () => {
        expect(wrapper.find('.game-timer').text()).toBe('0');
    });

    it('should set 1 second time interval', () => {
        jest.useFakeTimers();
        const mounted = shallow(<Timer store={mockStore(newState)}/>).shallow();
        const setTimer = mounted.instance().setTimer;

        setTimer();

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });

    it('should call clearInterval()', () => {
        const mounted = shallow(<Timer store={mockStore(newState)}/>).shallow();
        const clearTimer = mounted.instance().clearTimer;

        jest.useFakeTimers();
        clearTimer();
        expect(clearInterval).toHaveBeenCalledWith(expect.any(Number));
    });
});