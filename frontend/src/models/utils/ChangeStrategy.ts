export enum Change {
  percentage = "percents",
  static = "static"
}

export interface ChangeSpec {
  name: string;
}

export function getChangeStrategySpec(changeStrategy: Change): ChangeSpec {
  switch (changeStrategy) {
    case Change.percentage:
      return { name: "percents" };
    case Change.static:
      return { name: "dollars" };
  }
}
