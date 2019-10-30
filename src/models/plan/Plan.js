"use strict";
exports.__esModule = true;
var Plan = /** @class */ (function () {
    function Plan(income, outcome, incomeGrowth, outcomeGrowth, investmentRate, startCapital, startDate) {
        this.income = income;
        this.outcome = outcome;
        this.incomeGrowth = incomeGrowth;
        this.outcomeGrowth = outcomeGrowth;
        this.investmentRate = investmentRate;
        this.startCapital = startCapital;
        this.startDate = startDate;
    }
    Plan.prototype.getStartIncome = function () {
        return this.income;
    };
    Plan.prototype.getIncomeForDate = function (date) {
        var years = this.getYearsFromStart(date);
        return (this.income * ((100 + this.incomeGrowth) / 100) ^ years);
    };
    Plan.prototype.getOutcomeForDate = function (date) {
        var years = this.getYearsFromStart(date);
        return (this.outcome * ((100 + this.incomeGrowth) / 100) ^ years);
    };
    Plan.prototype.getCapitalForDate = function (date) {
        var years = this.getYearsFromStart(date);
        var capital = this.startCapital;
        var tmpDate = this.startDate;
        for (var i = 0; i < years; i++) {
            tmpDate.setFullYear(tmpDate.getFullYear() + 1);
            capital += this.getIncomeForDate(tmpDate) * ((100 + this.investmentRate) / 100);
        }
        return capital;
    };
    Plan.prototype.getDataForDate = function (date) {
        return {
            income: this.getIncomeForDate(date),
            outcome: this.getOutcomeForDate(date),
            capital: this.getCapitalForDate(date)
        };
    };
    Plan.prototype.getYearsFromStart = function (date) {
        return date.getFullYear() - this.startDate.getFullYear();
    };
    return Plan;
}());
exports["default"] = Plan;
