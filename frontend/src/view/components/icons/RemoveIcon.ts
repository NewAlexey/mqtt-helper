import { CommonIcon } from "src/view/components/icons/CommonIcon.ts";

import "./style.scss";

const icon =
    '<?xml version="1.0" encoding="iso-8859-1"?>\n' +
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px"\n' +
    '     y="0px"\n' +
    '     viewBox="0 0 443 443" style="enable-background:new 0 0 443 443;" xml:space="preserve">\n' +
    "<g>\n" +
    '\t<path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"/>\n' +
    '    <path d="M295.142,214.31l5.66-86.31H62.769l19.016,290h114.172c-14.861-21.067-23.602-46.746-23.602-74.43\n' +
    '\t\tC172.355,274.43,226.849,217.779,295.142,214.31z"/>\n' +
    '    <path d="M301.785,244.141c-54.826,0-99.43,44.604-99.43,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43\n' +
    "\t\tS356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963\n" +
    '\t\tl-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"/>\n' +
    "</g>\n" +
    "</svg>\n";

export class RemoveIcon extends CommonIcon {
    constructor() {
        super(icon);
    }
}