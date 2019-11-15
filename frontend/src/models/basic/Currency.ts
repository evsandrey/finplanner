export namespace Currencies {
  const currenciesAviable = ["USD", "RUB"];
  export function getAll(): Currency[] {
    let currencies: Currency[] = [];
    currenciesAviable.forEach(code => {
      currencies.push(new Currency(code));
    });
    return currencies;
  }
  export function getDefault(): Currency {
    return new Currency("USD");
  }
}

export class Currency {
  code: string;
  constructor(code: string) {
    this.code = code;
  }
}
