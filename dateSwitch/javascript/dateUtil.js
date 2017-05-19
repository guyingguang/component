/**
 * Created by guyg on 2017/5/17.
 */
var dateUtil = {};

/**
 * 获取当前时间或当月
 * @param type 日期切换类型 （day、month）
 */
dateUtil.getDate = function (type) {

    var _date = new Date(), dateVal = "";
    var _year = _date.getFullYear(), _month = _date.getMonth() + 1, _day = _date.getDate();

    dateVal=dateUtil.combinationDate(_year,_month,_day,type);

    return dateVal;
}


/**
 * 组合最终要得到的日期
 * @param year
 * @param month
 * @param day
 * @param type
 * @returns {string}
 */
dateUtil.combinationDate=function(year,month,day,type){

    var finalDate="";
    if (month<=9) {month = "0" + month}

    if (day<=9) {day = "0" + day}

    if (type == "day") {
        finalDate = year + "-" + month + "-" + day;
    } else if (type == "month") {
        finalDate = year + "-" + month;
    }
    return finalDate;
}


/**
 * 切换时间或月份
 * @param type 日期切换类型 （prev、next）
 */
dateUtil.switchDate = function (type, date) {

    var _date = new Date(date), dateVal = "";
    var _year = _date.getFullYear(), _month = _date.getMonth() + 1, _day = _date.getDate();
    //date.length<7 标识 date类型为月
    if (date.length <= 7) {
        if (type == "prev") {
            _month = _month - 1;
            if (_month == "0") {_year = _year - 1;_month = 12;}
        } else if (type == "next") {
            _month = _month + 1;
            if (_month == "13") {_year = _year + 1;_month = 1;}
        }
        dateVal=dateUtil.combinationDate(_year,_month,_day,"month");
    }
    else {
        if (type == "prev") {
            _day = _day - 1;
            if (_day == '0')
            {
                _month = _month - 1;
            }

            if (_month == "0")
            {
                _year = _year - 1;
                _month = 12;
            }
            _day = dateUtil.searchMonth(_year, _month, type);

        }
        else if (type == "next")
        {
            _day = _day + 1;

            if (_day == "31" && dateUtil.existMonth(_month)) {_month = _month + 1;_day = "1";}
            else if (_day == "32") {_month = _month + 1;_day = "1";}

            if (_month == "2" && _day == "29") {
                if (dateUtil.isLunarYear(_year)) {_day = "29";}
                else {_day = "1";_month = _month + 1;}
            }
            else if (_month == "2" && _day >= 30) {_month = _month + 1;_day = "1";}


            if (_month == "13") {_year = _year + 1;_day = "1";_month = 1;}
        }

        dateVal=dateUtil.combinationDate(_year,_month,_day,"day");
    }
    return dateVal;
}

/**
 * 查询该月的天数
 * @param year
 * @param month
 * @param type
 * @returns {string}
 */
dateUtil.searchMonth = function (year, month, type) {
    var day = "";
    if (type == "prev")
    {
        if (month == "2")
        {
            if (dateUtil.isLunarYear(year)) {day = "29";}
            else {day = "28";}
        }
        else
        {
            if (dateUtil.existMonth(month)) {day = "30";}
            else {day = "31";}
        }
    }
    else if (type == "next")
    {
        if (dateUtil.existMonth(month)) {day = "1";}
        else {day = "31";}
    }
    return day;
}

/**
 * 判断天数为30天的月份
 * @param month
 * @returns {boolean}
 */
dateUtil.existMonth = function (month) {
    var monthArray = ["4", "6", "9", "11"];
    var flag = false;
    for (var i = 0; i < monthArray.length; i++) {
        if (month == monthArray[i]) {
            flag = true;
            break;
        } else {
            flag = false;
        }
    }
    return flag;
}

/**
 * 判断闰月
 * @param year
 * @returns {boolean}
 */
dateUtil.isLunarYear=function(year){
    return ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0))==true?true:false;
}
