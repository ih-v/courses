import { describe, test, expect } from "vitest";

import secondsToTime from "../../utils/secondsToTime";

type TestData = {
  input: number;
  output: string;
};

describe.each([
  { input: 0, output: "00:00:00" },
  { input: 45.72, output: "00:00:45" },
  { input: 132, output: "00:02:12" },
  { input: 45663, output: "12:41:03" },
  { input: 4566399638, output: "1268444:20:38" },
])("secondsToTime utility testing", ({ input, output }: TestData) => {
  test(`input value: ${input} - expect to be: ${output}`, () => {
    const res = secondsToTime(input);
    expect(res).toBe(output);
  });
});
