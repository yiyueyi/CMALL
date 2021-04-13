import moment from 'moment';

const getTodayFirstMoment = () => {
	let ret = moment().utcOffset(8);
	ret.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
	return ret.local();
};

const getFirstMoment = (moment) => {
	let ret = moment.utcOffset(8);
	ret.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
	return ret.local();
};

const getTodayLastMoment = () => {
	let ret = moment().utcOffset(8);
	ret.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
	return ret.local();
};

const getLastMoment = (moment) => {
	let ret = moment.utcOffset(8);
	ret.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
	return ret.local();
};

const now = () => {
	return moment();
};

const dateFormat = (value, short = false) => {
	if (value) {
		if (value instanceof moment) {
			return value.format(short ? 'MM-DD' : 'YYYY-MM-DD');
		} else {
			return moment(value).format(short ? 'MM-DD' : 'YYYY-MM-DD');
		}
	}
	return value;
};

const timeFormat = (value, short = false) => {
	if (value) {
		if (value instanceof moment) {
			return value.format(short ? 'MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss');
		} else {
			return moment(value).format(short ? 'MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss');
		}
	}
	return value;
};

const minuteFormat = (value, short = false) => {
	if (value) {
		if (value instanceof moment) {
			return value.format(short ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm');
		} else {
			return moment(value).format(short ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm');
		}
	}
	return value;
};

const unixFormat = (value) => {
	if (value) {
		value = moment.unix(value) / 1000;
	}
	return value;
};

const mdHmFormat = value => {
	if (value) {
		return moment(value).format('MM-DD HH:mm');
	}
	return value;
};

export default {
	getTodayFirstMoment,
	getFirstMoment,
	getTodayLastMoment,
	getLastMoment,
	now,
	dateFormat,
	timeFormat,
	minuteFormat,
	unixFormat,
	mdHmFormat
};
