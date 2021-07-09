// /* eslinst-disable */
import { useMemoOne } from "use-memo-one";
import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

const {
	Value,
	cond,
	event,
	eq,
	block,
	set,
	Clock,
	clockRunning,
	spring,
	startClock,
	stopClock,
	debug,
	timing,
	neq,
} = Animated;

export const useValues = (
	values,
	deps
) => useMemoOne(() => values.map((v) => new Value(v)), deps);

export const onScroll = (contentOffset) => {
	return event([
		{
			nativeEvent: {
				contentOffset,
			},
		},
	]);
};

export const withTimingTransition = (
	value,
	timingConfig,
	gestureState = new Value(State.UNDETERMINED)
) => {
	const clock = new Clock();
	const state = {
		finished: new Value(0),
		frameTime: new Value(0),
		position: new Value(0),
		time: new Value(0),
	};
	const config = {
		toValue: new Value(0),
		duration: 100,
		easing: Easing.linear,
		...timingConfig,
	};
	
	return block([
		startClock(clock),
		cond(neq(config.toValue, value), [
			set(state.frameTime, 0),
			set(state.time, 0),
			set(state.finished, 0),
			set(config.toValue, value),
		]),
		cond(
			eq(gestureState, State.ACTIVE),
			[set(state.position, value)],
			timing(clock, state, config)
		),
		state.position,
	]);
};

export const runSpring = (clock, value, dest) => {
	const state = {
		finished: new Value(0),
		velocity: new Value(0),
		position: new Value(0),
		time: new Value(0),
	};

	const config = {
		duration: 200,
		toValue: new Value(0),
		damping: 20,
		mass: 1,
		stiffness: 100,
		overshootClamping: false,
		restSpeedThreshold: 0.1,
		restDisplacementThreshold: 0.1,
		easing: Easing.linear,
	};

	return block([
		cond(clockRunning(clock), 0, [
			set(state.finished, 0),
			set(state.time, 0),
			set(state.position, value),
			set(state.velocity, 0),
			set(config.toValue, dest),
			startClock(clock),
		]),
		spring(clock, state, config),
		cond(state.finished, debug("stop clock", stopClock(clock))),
		state.position,
	]);
};

export const withTransition = (
	value,
	timingConfig,
	gestureState = new Value(State.UNDETERMINED)
) => {
	const clock = new Clock();
	const state = {
		finished: new Value(0),
		frameTime: new Value(0),
		position: new Value(0),
		time: new Value(0),
	};
	const config = {
		toValue: new Value(0),
		duration: 250,
		easing: Easing.linear,
		...timingConfig,
	};
	
	return block([
		startClock(clock),
		cond(neq(config.toValue, value), [
			set(state.frameTime, 0),
			set(state.time, 0),
			set(state.finished, 0),
			set(config.toValue, value),
		]),
		cond(
			eq(gestureState, State.ACTIVE),
			[set(state.position, value)],
			timing(clock, state, config)
		),
		state.position,
	]);
};

export const withSpringTransition = (
	value,
	springConfig,
	velocity = 0,
	gestureState = new Value(State.UNDETERMINED)
) => {
	const clock = new Clock();
	const state = {
		finished: new Value(0),
		velocity: new Value(0),
		position: new Value(0),
		time: new Value(0),
	};
	const config = {
		toValue: new Value(0),
		damping: 15,
		mass: 1,
		stiffness: 150,
		overshootClamping: false,
		restSpeedThreshold: 1,
		restDisplacementThreshold: 1,
		...springConfig,
	};
	
	return block([
		startClock(clock),
		set(config.toValue, value),
		cond(
			eq(gestureState, State.ACTIVE),
			[set(state.velocity, velocity), set(state.position, value)],
			spring(clock, state, config)
		),
		state.position,
	]);
};
