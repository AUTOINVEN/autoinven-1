exports.getToday = function () {
    var today = new Date();
    var UTC = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
    var KR_DIFF = 9 * 60 * 60 * 1000;
    today = new Date(UTC + (KR_DIFF));
    var todayStr = dateFormatting(today);
    return todayStr;
}

function addZero(input) {
    if (input >= 10) return input;
    else return `0${input}`;
}

function dateFormatting(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    return [year, month, day].join('-');
}