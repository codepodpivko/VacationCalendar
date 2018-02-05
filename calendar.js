(function () {
    //На вход приходить JSON - [[Employee, Id, type, dateFrom, dateTill], ...]

    var calendarArray = [];

    var Calendar = {

        CHARTDIV: "#calendar",
        GET_JSON_URL: "/Accounting/Vacations/GetModels",
        DAYS_IN_YEAR: 365,

        init: function () {
            $.post(Calendar.GET_JSON_URL, function (data) {
                data = JSON.parse(data);
                data.forEach(element => {
                    calendarArray = Calendar.addEmployeeVacation(element);
                });

                chart = $(Calendar.CHARTDIV);

                Calendar.drawChart(chart);

            });
        },

        addEmployeeVacation: function (vacation) {
            arrIndex = Calendar.checkEmployee(vacation.Id);
            if (arrIndex == -1) {
                calendarArray.push({ Employee: vacation.Employee, Id: vacation.Id, calendar: Calendar.buildVacationsArray(vacation) });
            }
            else {
                calendarArray[arrIndex].calendar = Calendar.addVacation(calendarArray[arrIndex].calendar, vacation)
            }
            return calendarArray;
        },

        checkEmployee: function (id) {
            if (calendarArray.length != 0) {
                for (let index = 0; index <= calendarArray.length - 1; index++) {
                    if (calendarArray[index].Id == id) {
                        return index;
                    }
                }
            }
            return -1;
        },

        buildVacationsArray: function (vacation) {
            vacationsArray = [];

            for (let index = 0; index < 364; index++) {
                vacationsArray[index] = "none";

            }

            for (let index = vacation.DateFrom; index <= vacation.DateTill; index++) {
                vacationsArray[index] = vacation.Type;
            }

            return vacationsArray;
        },

        addVacation: function (array, vacation) {

            for (let index = vacation.DateFrom; index <= vacation.DateTill; index++) {
                vacation[index] = vacation.Type;
            }

            return array;
        },

        drawChart: function ($chart) {
            calendarArray.forEach(element => {
                var emplRow = "";
                emplRow += '<div><span>' + element.Employee + '</span>';
                element.calendar.forEach(day => {
                    emplRow += '<span class="type-' + day + '">' + '</span>';
                });
                emplRow += '</div>';
                $chart.append(emplRow);
            });
        }
    }

    $(document).ready(Calendar.init());
})();



