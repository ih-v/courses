import { VideoHTMLAttributes } from "react";
import { ErrorData, Events } from "hls.js";
declare const _default: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<{
    link: string;
    attachCb?: (() => void) | undefined;
    errorCb?: ((event: Events.ERROR, data: ErrorData) => void) | undefined;
} & VideoHTMLAttributes<HTMLVideoElement> & import("react").RefAttributes<HTMLVideoElement>>>;
export default _default;
