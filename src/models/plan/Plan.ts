export default class Plan {
    public id: string; 
    public income: number;
    public outcome: number;
    public incomeGrowth: number;
    public outcomeGrowth: number;
    public investmentRate: number;
    public startCapital: number;
    public startDate: Date;
    public endDate: Date;
    
    constructor(income :number ,outcome: number, incomeGrowth: number, outcomeGrowth: number, investmentRate: number, startCapital: number, startDate: Date, endDate: Date) 
    {
        this.income= income;
        this.outcome= outcome;
        this.incomeGrowth= incomeGrowth;
        this.outcomeGrowth= outcomeGrowth;
        this.investmentRate= investmentRate;
        this.startCapital = startCapital;
        this.startDate= startDate;
        this.startDate= startDate;
    }
    getStartIncome() :number {
        return this.income;
    }
    getIncomeForDate(date: Date) :number {
        let years = this.getYearsFromStart(date);
        return (this.income*((100+this.incomeGrowth)/100)^years);
    }
    getOutcomeForDate(date: Date) :number {
        let years = this.getYearsFromStart(date);
        return (this.outcome*((100+this.incomeGrowth)/100)^years);
    }
    getCapitalForDate(date: Date) :number{
        let years = this.getYearsFromStart(date);
        let capital = this.startCapital;
        let tmpDate = this.startDate;
        for (var i = 0; i < years; i++) {
            tmpDate.setFullYear(tmpDate.getFullYear() + 1);     
            capital += this.getIncomeForDate(tmpDate)*((100+this.investmentRate)/100)
        }
        return capital;
    }
    
    getDataForDate(date: Date) :object {
        return {
            income: this.getIncomeForDate(date),
            outcome: this.getOutcomeForDate(date),
            capital: this.getCapitalForDate(date) 
        }
    }

    getYearsFromStart(date: Date) :number {
        return  date.getFullYear() - this.startDate.getFullYear(); 
    }
    
}