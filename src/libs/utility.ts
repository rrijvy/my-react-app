import { EnumRenderingDeviceType } from "../core/types";

class UUID {
  /**
   * @function Generate() Generated UUID from Math.random()
   * @param blocks Number of string blocks to generate, default is `4`
   * @returns {string} Generated UUID
   */
  static Generate(blocks = 4): string {
    const arr: number[] = Array(blocks).fill(0);
    return arr
      .map(() => Math.floor(Math.random() * 1000000))
      .map((v) => v.toString(16).toUpperCase())
      .join("-");
  }
}

class BrowserWindowUtil {
  /**
   * @function PixelFromPercent() Convert screen width from percentage to pixel value
   * @param percent Percentage for screen width
   * @returns {string} String representation of pixel value, ex. 200px
   */
  static PixelFromPercent(percent: number): string {
    return `${Math.ceil(window.innerWidth * (percent / 100)).toString()}px`;
  }

  static GetHeightUptoBottom(id: string): string {
    const elem: HTMLElement | null = document.getElementById(id);
    const height = window.innerHeight - (elem?.getBoundingClientRect().top ?? 0);
    return height + "px";
  }

  static IsPlatformIOS(): boolean {
    return (
      ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  /**
   * @function IsCurrentRenderDevice() Check current window device type
   * @param {EnumRenderingDeviceType} device Type of device
   * @returns {boolean} If the given device is the current device
   */
  static IsCurrentRenderDevice(device: EnumRenderingDeviceType): boolean {
    const deviceWidth: number = window.innerWidth;
    switch (device) {
      case EnumRenderingDeviceType.ExtraSmall:
        return deviceWidth < 576;
      case EnumRenderingDeviceType.Small:
        return deviceWidth >= 576 && deviceWidth < 768;
      case EnumRenderingDeviceType.Medium:
        return deviceWidth >= 768 && deviceWidth < 992;
      case EnumRenderingDeviceType.Large:
        return deviceWidth >= 992 && deviceWidth < 1200;
      case EnumRenderingDeviceType.ExtraLarge:
        return deviceWidth >= 1200;
      default:
        return false;
    }
  }

  /**
   * @function GetCurrentRenderDevice() Get the current device type of the window
   * @returns {EnumRenderingDeviceType} Device type
   */
  public static GetCurrentRenderDevice(): EnumRenderingDeviceType {
    if (BrowserWindowUtil.IsCurrentRenderDevice(EnumRenderingDeviceType.ExtraLarge)) {
      return EnumRenderingDeviceType.ExtraLarge;
    } else if (BrowserWindowUtil.IsCurrentRenderDevice(EnumRenderingDeviceType.Large)) {
      return EnumRenderingDeviceType.Large;
    } else if (BrowserWindowUtil.IsCurrentRenderDevice(EnumRenderingDeviceType.Medium)) {
      return EnumRenderingDeviceType.Medium;
    } else if (BrowserWindowUtil.IsCurrentRenderDevice(EnumRenderingDeviceType.Small)) {
      return EnumRenderingDeviceType.Small;
    } else {
      return EnumRenderingDeviceType.ExtraSmall;
    }
  }
}

class StringUtil {
  static Capitalize(str: string): string {
    if (!str) return "";

    if (str.length === 0) return str.toUpperCase();

    return str[0].toUpperCase() + str.slice(1);
  }

  static NormalizeName(str?: string): string {
    return (str ?? "")
      .split(" ")
      .map((c) => StringUtil.Capitalize(c.toLowerCase()))
      .join(" ");
  }
}

class DateTimeUtil {
  /**
   * @function TimeAgo() Calculate the time from the given time to now
   * @param datetime Time to start from
   * @returns {string}
   */
  static TimeAgo(datetime?: string): string {
    if (datetime) {
      const tFrom = new Date().getTime();
      const tTo = new Date(datetime).getTime();
      const tDiff = tFrom - tTo;
      const secondMil = 1,
        minuteMil = 60 * secondMil,
        hourMil = 60 * minuteMil,
        dayMil = 24.9999 * hourMil,
        dayRangeMil = 24 * hourMil,
        weekMil = 7.9999 * 24 * hourMil,
        weekRangeMil = 7 * 24 * hourMil,
        monthMil = 4.5 * 7 * 24 * hourMil,
        monthRangeMil = 30 * 24 * hourMil,
        yearRangeMil = 365 * 24 * hourMil,
        yearMil = 365 * 24 * hourMil;

      const constArr = [
        { limit: secondMil, dividor: secondMil, text: "second" },
        { limit: minuteMil, dividor: minuteMil, text: "minute" },
        { limit: hourMil, dividor: hourMil, text: "hour" },
        { limit: dayRangeMil, dividor: dayMil, text: "day" },
        { limit: weekMil, dividor: weekRangeMil, text: "week" },
        { limit: monthMil, dividor: monthRangeMil, text: "month" },
        { limit: yearMil, dividor: yearRangeMil, text: "year" },
      ];
      const ranges = constArr.filter((i) => tDiff > i.limit);
      if (ranges.length > 0) {
        const range = ranges[ranges.length - 1];
        if (range.limit === secondMil) {
          return "just now";
        }

        let displayDiff: number = range.text === "week" ? Math.round(tDiff / range.dividor) : Math.floor(tDiff / range.dividor);

        return `${displayDiff} ${range.text}${displayDiff > 1 ? "s" : ""} ago`;
      }
      return "just now";
    }
    return "";
  }

  static GetCurrentTimeZone() {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: "long" });
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
      const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
      return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, "");
    } else {
      // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
      return full;
    }
  }
}

class ArrayUtil {}

class Stack<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T) {
    // push element into the items
    this.items.push(element);
  }
  pop() {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }
  peek() {
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    // return true if stack is empty
    return this.items.length == 0;
  }
  printStack() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}

export const Utility = {
  BrowserWindowUtil,
  UUID,
  Stack,
  StringUtil,
  DateTimeUtil,
  ArrayUtil,
};
