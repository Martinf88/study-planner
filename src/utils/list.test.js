import { describe, it, expect } from "vitest";
import { splitTodosIntoDays } from "./list";

describe("splitTodosIntoDays", () => {
  it("should split todos into days correctly for må, ti, on, to, fr, lö, sö", () => {
    const todos = [
      { day: "må" },
      { day: "ti" },
      { day: "on" },
      { day: "to" },
      { day: "fr" },
      { day: "lö" },
      { day: "sö" },
    ];

    const expectedOutput = [
      [{ day: "må" }],
      [{ day: "ti" }],
      [{ day: "on" }],
      [{ day: "to" }],
      [{ day: "fr" }],
      [{ day: "lö" }],
      [{ day: "sö" }],
    ];

    expect(splitTodosIntoDays(todos)).toEqual(expectedOutput);
  });

  it("should handle multiple tasks on the same day", () => {
    const todos = [
      { day: "må" },
      { day: "må" },
      { day: "må" },
      { day: "ti" },
      { day: "on" },
      { day: "to" },
      { day: "fr" },
      { day: "lö" },
      { day: "sö" },
      { day: "sö" },
    ];

    const expectedOutput = [
      [{ day: "må" }, { day: "må" }, { day: "må" }],
      [{ day: "ti" }],
      [{ day: "on" }],
      [{ day: "to" }],
      [{ day: "fr" }],
      [{ day: "lö" }],
      [{ day: "sö" }, { day: "sö" }],
    ];
    expect(splitTodosIntoDays(todos)).toEqual(expectedOutput);
  });

  it("should return empty arrays for an empty input array", () => {
    const todos = [];
    const expectedOutput = [[], [], [], [], [], [], []];
    expect(splitTodosIntoDays(todos)).toEqual(expectedOutput);
  });

  it("should handle input with invalid or unexpected data", () => {
    const todos = [
      { day: "må" },
      { day: "ti" },
      { day: "wed" }, //invalid day value
      { day: "to" },
      { day: "fr" },
      { day: "lö" },
      { day: "sö" },
    ];

    const expectedOutput = [
      [{ day: "må" }],
      [{ day: "ti" }],
      [], //invalid day value should result in an empty array
      [{ day: "to" }],
      [{ day: "fr" }],
      [{ day: "lö" }],
      [{ day: "sö" }],
    ];
    expect(splitTodosIntoDays(todos)).toEqual(expectedOutput);
  });
});
