import { describe, test, expect } from "vitest";

import serializateLaunchDate from "../../utils/serializateLaunchDate";

type TestData = {
  input: { launchDate: string };
  output: { launchDate: Date };
};

describe.each([
  {
    input: { launchDate: "2023-03-06T16:25:24.000Z" },
    output: { launchDate: new Date("2023-03-06T16:25:24.000Z") },
  },
  {
    input: { launchDate: "2023-03-06T16:50:06.000Z" },
    output: { launchDate: new Date("2023-03-06T16:50:06.000Z") },
  },
])("serializateLaunchDate utility testing", ({ input, output }: TestData) => {
  test(`input value: ${input.launchDate} - expect to be: ${output.launchDate}`, () => {
    const res = serializateLaunchDate(input);
    expect(res).toEqual(output);
  });
});
