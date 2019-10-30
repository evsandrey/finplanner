import { Range } from "../src/models/utils/Range";
import { IterableGroup } from "../src/models/IterableGroup/IterableGroup";

let jan19: Date = new Date(2019, 0, 1);
let dec19: Date = new Date(2019, 11, 1);
let jan20: Date = new Date(2020, 0, 1);
let feb19: Date = new Date(2019, 1, 1);
let feb20: Date = new Date(2020, 1, 1);
let feb28_leap: Date = new Date(2020, 1, 28);
let feb13_leap: Date = new Date(2020, 1, 13);
let dec31: Date = new Date(2019, 11, 31);


test('smoke', () => {
    let r1 = new Range(jan19,dec19);
    let r2 = new Range(feb19,feb20);
    let ig = new IterableGroup(); 
    ig.ranges.push(r1);
    ig.ranges.push(r2);
    ig.setBigRange();
    expect(ig.flowRange.from.getDate()).toBe(jan19.getDate());
    expect(ig.flowRange.to.getDate()).toBe(feb20.getDate());
    ig.iterate()
});