import React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function BellIcon() {
  return (
    <Svg
      width={width * 0.04}
      height={height * 0.015}
      viewBox="0 0 14 19"
      fill="none"
    >
      <Path
        d="M5.17188 13.262C5.17183 13.0031 5.01133 12.7713 4.76953 12.679C2.4256 11.7837 0.774414 9.51163 0.774414 6.85767C0.774546 3.42557 3.5659 0.640089 6.98145 0.639893C10.4142 0.639893 13.1883 3.42436 13.1885 6.85767C13.1885 9.51174 11.5374 11.7838 9.19336 12.679C8.95174 12.7714 8.79203 13.0033 8.79199 13.262V16.4729C8.79199 17.4808 7.97865 18.2942 6.98145 18.2942C5.9844 18.294 5.17188 17.4806 5.17188 16.4729V13.262Z"
        fill="#5655B9"
        stroke="white"
        strokeWidth={1.2486}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
