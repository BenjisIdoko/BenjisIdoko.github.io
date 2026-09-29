// Components.d.ts — the complete catalog of the 16 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.Avatar) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Avatar" (node 1:16999)
export interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "circle" | "square";
  style2?: "icon" | "image" | "initials" | "initials small";
  /** Text content; defaults to "M". */
  text1?: string;
}

// figma layer: "Button" (node 1:17)
export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "wide" | "sm";
  state?: "tetiary" | "primary" | "secondary" | "disabled";
  icon?: "both" | "right" | "left" | "none";
  destructive?: boolean;
  text?: string;
  /** Text content; defaults to "Button". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Form Control / Element" (node 1:15533)
export interface FormControlElementProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "checkbox" | "radio";
  on?: boolean;
}

// figma layer: "24/heart" (node 1:338)
export interface Heart24Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Homepage-NEW" (node 1:24834)
export interface HomepageNEWProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Icon" (node 1:4089)
export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "24";
  name?: "0-plus" | "10-plus" | "12-plus" | "13-plus" | "16-plus" | "17-plus" | "18-plus" | "21-plus" | "3-plus" | "500px" | "6-plus" | "abacus" | "accessible-icon-alt" | "adjust" | "adjust-alt" | "adjust-circle" | "adjust-half" | "adobe" | "adobe-alt" | "airplay" | "align" | "align-alt" | "align-center" | "align-center-alt" | "align-center-h" | "align-center-justify" | "align-center-v" | "align-justify" | "align-left" | "align-left-justify" | "align-letter-right" | "align-right" | "align-right-justify" | "amazon" | "ambulance" | "analysis" | "analytics" | "anchor" | "android" | "android-alt" | "android-phone-slash" | "angle-double-down" | "angle-double-left" | "angle-double-right" | "angle-double-up" | "angle-left" | "chevron-down" | "angle-right" | "chevron-up" | "angry" | "ankh" | "annoyed" | "annoyed-alt" | "apple" | "apple-alt" | "apps" | "archive" | "archive-alt" | "archway" | "arrow" | "arrow-break" | "arrow-circle-down" | "arrow-circle-left" | "arrow-circle-right" | "arrow-circle-up" | "arrow-compress-h" | "arrow-down" | "arrow-down-left" | "arrow-down-right" | "arrow-from-right" | "arrow-from-top" | "arrow-growth" | "arrow-left" | "arrow-random" | "arrow-resize-diagonal" | "arrow-right" | "arrow-to-bottom" | "arrow-to-right" | "arrow-up" | "arrow-up-left" | "arrow-up-right" | "arrows-h" | "arrows-h-alt" | "arrows-left-down" | "arrows-maximize" | "arrows-merge" | "arrows-resize" | "arrows-resize-h" | "arrows-resize-v" | "arrows-right-down" | "arrows-shrink-h" | "arrows-shrink-v" | "arrows-up-right" | "arrows-v" | "arrows-v-alt" | "assistive-listening-systems" | "asterisk" | "at" | "atom" | "auto-flash" | "award" | "award-alt" | "baby-carriage" | "backpack" | "backspace" | "backward" | "bag" | "bag-alt" | "bag-slash" | "balance-scale" | "ban" | "band-aid" | "bars" | "baseball-ball" | "basketball" | "basketball-hoop" | "bath" | "battery-bolt" | "battery-empty" | "bed" | "bed-double" | "behance" | "behance-alt" | "bell" | "bell-school" | "bell-slash" | "bill" | "bitcoin" | "bitcoin-alt" | "bitcoin-circle" | "bitcoin-sign" | "black-berry" | "blogger" | "blogger-alt" | "bluetooth-b" | "bold" | "bolt" | "bolt-alt" | "bolt-slash" | "book" | "book-alt" | "book-medical" | "book-open" | "book-reader" | "bookmark" | "bookmark-full" | "books" | "boombox" | "border-alt" | "border-bottom" | "border-clear" | "border-horizontal" | "border-inner" | "border-left" | "border-out" | "border-right" | "border-top" | "border-vertical" | "bowling-ball" | "box" | "brackets-curly" | "brain" | "briefcase" | "briefcase-alt" | "bright" | "brightness" | "brightness-empty" | "brightness-half" | "brightness-low" | "brightness-minus" | "brightness-plus" | "bring-bottom" | "bring-front" | "browser" | "brush-alt" | "bug" | "building" | "bullseye" | "bus" | "bus-alt" | "bus-school" | "calculator" | "calculator-alt" | "calendar-alt" | "calendar-slash" | "calender" | "calling" | "camera" | "camera-change" | "camera-plus" | "camera-slash" | "cancel" | "capsule" | "capture" | "car" | "car-sideview" | "car-slash" | "car-wash" | "card-atm" | "caret-right" | "cell" | "celsius" | "channel" | "channel-add" | "chart" | "chart-bar" | "chart-bar-alt" | "chart-down" | "chart-growth" | "chart-growth-alt" | "chart-line" | "chart-pie" | "chart-pie-alt" | "chat" | "chat-bubble-user" | "chat-info" | "check" | "check-circle" | "check-square" | "circle" | "circle-layer" | "circuit" | "clapper-board" | "clipboard" | "clipboard-alt" | "clipboard-blank" | "clipboard-notes" | "clock" | "clock-eight" | "clock-five" | "clock-nine" | "clock-seven" | "clock-ten" | "clock-three" | "clock-two" | "closed-captioning" | "closed-captioning-slash" | "cloud" | "cloud-block" | "cloud-bookmark" | "cloud-check" | "cloud-computing" | "cloud-data-connection" | "cloud-database-tree" | "cloud-download" | "cloud-drizzle" | "cloud-exclamation" | "cloud-hail" | "cloud-heart" | "cloud-info" | "cloud-lock" | "cloud-meatball" | "cloud-moon" | "cloud-moon-hail" | "cloud-moon-meatball" | "cloud-moon-rain" | "cloud-moon-showers" | "cloud-question" | "cloud-rain" | "cloud-rain-sun" | "cloud-redo" | "cloud-share" | "cloud-shield" | "cloud-showers" | "cloud-showers-alt" | "cloud-showers-heavy" | "cloud-slash" | "cloud-sun" | "cloud-sun-hail" | "cloud-sun-meatball" | "cloud-sun-rain" | "cloud-sun-rain-alt" | "cloud-sun-tear" | "cloud-times" | "cloud-unlock" | "cloud-upload" | "cloud-wifi" | "cloud-wind" | "clouds" | "club" | "code-branch" | "coffee" | "cog" | "coins" | "columns" | "comment" | "comment-add" | "comment-alt" | "comment-alt-block" | "comment-alt-chart-lines" | "comment-alt-check" | "comment-alt-dots" | "comment-alt-download" | "comment-alt-edit" | "comment-alt-exclamation" | "comment-alt-heart" | "comment-alt-image" | "comment-alt-info" | "comment-alt-lines" | "comment-alt-lock" | "comment-alt-medical" | "comment-alt-message" | "comment-alt-notes" | "comment-alt-plus" | "comment-alt-question" | "comment-alt-redo" | "comment-alt-search" | "comment-alt-share" | "comment-alt-shield" | "comment-alt-slash" | "comment-alt-upload" | "comment-alt-verify" | "comment-block" | "comment-chart-line" | "comment-check" | "comment-dots" | "comment-download" | "comment-edit" | "comment-exclamation" | "comment-heart" | "comment-image" | "comment-info" | "comment-info-alt" | "comment-lines" | "comment-lock" | "comment-medical" | "comment-message" | "comment-notes" | "comment-plus" | "comment-question" | "comment-redo" | "comment-search" | "comment-share" | "comment-shield" | "comment-slash" | "comment-upload" | "comment-verify" | "comments" | "comments-alt" | "compact-disc" | "comparison" | "compass" | "compress" | "compress-alt" | "compress-alt-left" | "compress-arrows" | "compress-point" | "compress-v" | "confused" | "constructor" | "copy" | "copy-alt" | "copy-landscape" | "copyright" | "corner-down-left" | "corner-down-right" | "corner-down-right-alt" | "corner-left-down" | "corner-right-down" | "corner-up-left" | "corner-up-left-alt" | "corner-up-right" | "corner-up-right-alt" | "create-dashboard" | "creative-commons-pd" | "credit-card" | "credit-card-search" | "crockery" | "crop-alt" | "crop-alt-rotate-left" | "crop-alt-rotate-right" | "crosshair" | "crosshair-alt" | "crosshairs" | "cube" | "dashboard" | "data-sharing" | "database" | "database-alt" | "desert" | "desktop" | "desktop-alt" | "desktop-alt-slash" | "desktop-cloud-alt" | "desktop-slash" | "dialpad" | "dialpad-alt" | "diamond" | "diary" | "diary-alt" | "dice-five" | "dice-four" | "dice-one" | "dice-six" | "dice-three" | "dice-two" | "direction" | "directions" | "dizzy-meh" | "dna" | "document-info" | "document-layout-center" | "document-layout-left" | "document-layout-right" | "dollar-alt" | "dollar-sign" | "dollar-sign-alt" | "download-alt" | "dribbble" | "drill" | "dropbox" | "dumbbell" | "ear" | "edit" | "edit-alt" | "ellipsis-h" | "ellipsis-v" | "emoji" | "enter" | "envelope" | "envelope-add" | "envelope-alt" | "envelope-block" | "envelope-bookmark" | "envelope-check" | "envelope-download" | "envelope-download-alt" | "envelope-edit" | "envelope-exclamation" | "envelope-heart" | "envelope-info" | "envelope-lock" | "envelope-minus" | "envelope-open" | "envelope-question" | "envelope-receive" | "envelope-redo" | "envelope-search" | "envelope-send" | "envelope-share" | "envelope-shield" | "envelope-star" | "envelope-times" | "envelope-upload" | "envelope-upload-alt" | "envelopes" | "equal-circle" | "euro" | "euro-circle" | "exchange" | "exchange-alt" | "exclamation-octagon" | "exclamation-triangle" | "exclude" | "exit" | "expand-alt" | "expand-arrows" | "expand-arrows-alt" | "expand-from-corner" | "expand-left" | "expand-right" | "export" | "exposure-alt" | "exposure-increase" | "external-link-alt" | "eye" | "eye-slash" | "facebook" | "facebook-f" | "facebook-messenger" | "facebook-messenger-alt" | "fahrenheit" | "fast-mail" | "fast-mail-alt" | "favorite" | "feedback" | "file" | "file-alt" | "file-blank" | "file-block-alt" | "file-bookmark-alt" | "file-check" | "file-check-alt" | "file-contract-dollar" | "file-copy-alt" | "file-download" | "file-download-alt" | "file-edit-alt" | "file-exclamation" | "file-exclamation-alt" | "file-export" | "file-heart" | "file-import" | "file-info-alt" | "file-landscape" | "file-landscape-alt" | "file-lanscape-slash" | "file-lock-alt" | "file-medical" | "file-medical-alt" | "file-minus" | "file-minus-alt" | "file-network" | "file-plus" | "file-plus-alt" | "file-question" | "file-question-alt" | "file-redo-alt" | "file-search-alt" | "file-share-alt" | "file-shield-alt" | "file-slash" | "file-times" | "file-times-alt" | "file-upload" | "file-upload-alt" | "files-landscapes" | "files-landscapes-alt" | "film" | "filter" | "filter-slash" | "fire" | "flask" | "flask-potion" | "flip-h" | "flip-h-alt" | "flip-v" | "flip-v-alt" | "flower" | "focus" | "focus-add" | "focus-target" | "folder" | "folder-check" | "folder-download" | "folder-exclamation" | "folder-heart" | "folder-info" | "folder-lock" | "folder-medical" | "folder-minus" | "folder-network" | "folder-open" | "folder-plus" | "folder-question" | "folder-slash" | "folder-times" | "folder-upload" | "football" | "football-american" | "football-ball" | "forecastcloud-moon-tear" | "forwaded-call" | "forward" | "frown" | "game-structure" | "gift" | "github" | "github-alt" | "glass" | "glass-martini" | "glass-martini-alt" | "glass-martini-alt-slash" | "glass-tea" | "globe" | "gold" | "golf-ball" | "google" | "google-drive" | "google-drive-alt" | "google-hangouts" | "google-hangouts-alt" | "google-play" | "graduation-cap" | "graph-bar" | "grid" | "grids" | "grin" | "grin-tongue-wink" | "grin-tongue-wink-alt" | "grip-horizontal-line" | "hard-hat" | "hdd" | "headphones" | "headphones-alt" | "heart" | "heart-break" | "heart-medical" | "heart-rate" | "heart-sign" | "heartbeat" | "history" | "history-alt" | "home" | "home-alt" | "horizontal-align-center" | "horizontal-align-left" | "horizontal-align-right" | "horizontal-distribution-center" | "horizontal-distribution-left" | "horizontal-distribution-right" | "hourglass" | "html3" | "html3-alt" | "hunting" | "image" | "image-alt-slash" | "image-block" | "image-broken" | "image-check" | "image-download" | "image-edit" | "image-lock" | "image-minus" | "image-plus" | "image-question" | "image-redo" | "image-resize-landscape" | "image-resize-square" | "image-search" | "image-share" | "image-shield" | "image-slash" | "image-times" | "image-upload" | "image-v" | "images" | "import" | "incoming-call" | "info-circle" | "instagram" | "instagram-alt" | "intercom" | "intercom-alt" | "invoice" | "italic" | "jackhammer" | "java-script" | "kayak" | "key-skeleton" | "key-skeleton-alt" | "keyboard" | "keyboard-alt" | "keyboard-hide" | "keyboard-show" | "keyhole-circle" | "keyhole-square" | "keyhole-square-full" | "kid" | "label" | "label-alt" | "lamp" | "laptop" | "laptop-cloud" | "laptop-connection" | "laughing" | "layer-group" | "layer-group-slash" | "layers" | "layers-alt" | "layers-slash" | "left-arrow-from-left" | "left-arrow-to-left" | "left-indent" | "left-indent-alt" | "left-to-right-text-direction" | "life-ring" | "lightbulb" | "lightbulb-alt" | "line" | "line-alt" | "line-spacing" | "link" | "link-add" | "link-alt" | "link-broken" | "link-h" | "linkedin" | "linkedin-alt" | "list-ui-alt" | "list-ul" | "location-arrow" | "location-arrow-alt" | "location-pin-alt" | "location-point" | "lock-access" | "lock-alt" | "lock-open-alt" | "lock-slash" | "luggage-cart" | "mailbox" | "mailbox-alt" | "map" | "map-marker" | "map-marker-alt" | "map-marker-edit" | "map-marker-info" | "map-marker-minus" | "map-marker-plus" | "map-marker-question" | "map-marker-shield" | "map-marker-slash" | "map-pin" | "map-pin-alt" | "mars" | "master-card" | "maximize-left" | "medal" | "medical-drip" | "medical-square" | "medical-square-full" | "medium-m" | "medkit" | "meeting-board" | "megaphone" | "meh" | "meh-alt" | "meh-closed-eye" | "message" | "metro" | "microphone" | "microphone-slash" | "minus" | "minus-circle" | "minus-path" | "minus-square" | "minus-square-full" | "missed-call" | "mobile-android" | "mobile-android-alt" | "mobile-vibrate" | "modem" | "money-bill" | "money-bill-slash" | "money-bill-stack" | "money-insert" | "money-stack" | "money-withdraw" | "money-withdrawal" | "moneybag-alt" | "monitor" | "monitor-heart-rate" | "moon" | "moon-eclipse" | "moonset" | "mountains" | "mountains-sun" | "mouse" | "mouse-alt" | "mouse-alt-2" | "multiply" | "music" | "music-note" | "music-tune-slash" | "n-a" | "navigator" | "nerd" | "newspaper" | "ninja" | "no-entry" | "notebooks" | "notes" | "object-group" | "object-ungroup" | "octagon" | "opera" | "opera-alt" | "outgoing-call" | "package" | "padlock" | "paint-tool" | "palette" | "panel-add" | "panorama-h" | "panorama-h-alt" | "panorama-v" | "paperclip" | "paragraph" | "parcel" | "parking-circle" | "parking-square" | "pathfinder" | "pathfinder-unite" | "pause" | "pause-circle" | "paypal" | "pen" | "pentagon" | "percentage" | "phone" | "phone-alt" | "phone-pause" | "phone-slash" | "phone-times" | "phone-volume" | "picture" | "pizza-slice" | "plane" | "plane-arrival" | "plane-departure" | "plane-fly" | "play" | "play-circle" | "plug" | "plus" | "plus-circle" | "plus-square" | "podium" | "polygon" | "post-stamp" | "postcard" | "pound" | "pound-circle" | "power" | "prescription-bottle" | "presentation" | "presentation-check" | "presentation-edit" | "presentation-line" | "presentation-lines-alt" | "presentation-minus" | "presentation-play" | "presentation-plus" | "presentation-times" | "previous" | "pricetag-alt" | "print" | "print-slash" | "process" | "processor" | "pump" | "puzzle-piece" | "qrcode-scan" | "question-circle" | "rainbow" | "raindrops" | "raindrops-alt" | "react" | "receipt" | "receipt-alt" | "record-audio" | "reddit-alien-alt" | "redo" | "refresh" | "registered" | "repeat" | "restaurant" | "right-indent-alt" | "right-to-left-text-direction" | "robot" | "rocket" | "rope-way" | "rotate-360" | "rss" | "rss-alt" | "rss-interface" | "ruler" | "ruler-combined" | "rupee-sign" | "sad" | "sad-cry" | "sad-crying" | "sad-dizzy" | "sad-squint" | "save" | "scaling-left" | "scaling-right" | "scenery" | "schedule" | "screw" | "scroll" | "scroll-h" | "search" | "search-alt" | "search-minus" | "search-plus" | "selfie" | "server" | "server-alt" | "server-connection" | "server-network" | "server-network-alt" | "servers" | "servicemark" | "setting" | "share-alt" | "shield" | "shield-check" | "shield-exclamation" | "shield-question" | "shield-slash" | "ship" | "shop" | "shopping-bag" | "shopping-basket" | "shopping-cart" | "shopping-cart-alt" | "shovel" | "shrink" | "shuffle" | "shutter" | "shutter-alt" | "sick" | "sigma" | "sign-alt" | "sign-in-alt" | "sign-left" | "sign-out-alt" | "sign-right" | "signal" | "signal-alt" | "signal-alt-3" | "signin" | "silence" | "silent-squint" | "sim-card" | "sitemap" | "skip-forward" | "skip-forward-alt" | "skip-forward-circle" | "skype" | "skype-alt" | "slack" | "slack-alt" | "sliders-v" | "sliders-v-alt" | "smile" | "smile-beam" | "smile-dizzy" | "smile-squint-wink" | "smile-squint-wink-alt" | "smile-wink" | "smile-wink-alt" | "snapchat-alt" | "snapchat-ghost" | "snapchat-square" | "snow-flake" | "snowflake" | "snowflake-alt" | "sort" | "sort-amount-down" | "sort-amount-up" | "sorting" | "space-key" | "spade" | "sperms" | "spin" | "square" | "square-full" | "square-shape" | "squint" | "star" | "star-half-alt" | "step-backward" | "step-backward-alt" | "step-backward-circle" | "step-forward" | "stop-circle" | "stopwatch" | "stopwatch-slash" | "store" | "store-alt" | "streering" | "stretcher" | "subject" | "subway" | "subway-alt" | "suitcase" | "suitcase-alt" | "sun" | "sunset" | "surprise" | "swatchbook" | "swiggy" | "swimmer" | "sync" | "sync-exclamation" | "sync-slash" | "syringe" | "table" | "table-tennis" | "tablet" | "tablets" | "tachometer-fast" | "tachometer-fast-alt" | "tag" | "tag-alt" | "tape" | "taxi" | "tear" | "telegram" | "telegram-alt" | "telescope" | "temperature" | "temperature-empty" | "temperature-half" | "temperature-minus" | "temperature-plus" | "temperature-quarter" | "temperature-three-quarter" | "tennis-ball" | "text" | "text-fields" | "text-size" | "text-strike-through" | "th" | "th-large" | "th-slash" | "thermometer" | "thumbs-down" | "thumbs-up" | "thunderstorm" | "thunderstorm-moon" | "thunderstorm-sun" | "ticket" | "times" | "times-circle" | "times-square" | "toggle-off" | "toggle-on" | "top-arrow-from-top" | "top-arrow-to-top" | "tornado" | "trademark" | "trademark-circle" | "traffic-barrier" | "traffic-light" | "transaction" | "trash" | "trash-alt" | "trees" | "triangle" | "trophy" | "trowel" | "truck" | "truck-loading" | "tumblr" | "tumblr-alt" | "tumblr-square" | "tv-retro" | "tv-retro-slash" | "twitter" | "twitter-alt" | "umbrella" | "unamused" | "underline" | "university" | "unlock" | "unlock-alt" | "upgrade" | "upload" | "upload-alt" | "usd-circle" | "usd-square" | "user" | "user-check" | "user-circle" | "user-exclamation" | "user-location" | "user-minus" | "user-plus" | "user-square" | "user-times" | "users-alt" | "utensils" | "utensils-alt" | "vector-square" | "vector-square-alt" | "venus" | "vertical-align-bottom" | "vertical-align-center" | "vertical-align-top" | "vertical-distribute-bottom" | "vertical-distribution-center" | "vertical-distribution-top" | "video" | "video-slash" | "visual-studio" | "vk" | "vk-alt" | "voicemail" | "voicemail-rectangle" | "volleyball" | "volume" | "volume-down" | "volume-mute" | "volume-off" | "volume-up" | "vuejs" | "vuejs-alt" | "wall" | "wallet" | "watch" | "watch-alt" | "water" | "water-drop-slash" | "water-glass" | "web-grid" | "web-grid-alt" | "web-section" | "web-section-alt" | "webcam" | "weight" | "whatsapp" | "whatsapp-alt" | "wheel-barrow" | "wheelchair" | "wheelchair-alt" | "wifi" | "wifi-router" | "wifi-slash" | "wind" | "wind-moon" | "wind-sun" | "window" | "window-grid" | "window-maximize" | "window-section" | "windsock" | "windy" | "wrap-text" | "wrench" | "x" | "x-add" | "yen" | "yen-circle" | "yin-yang" | "youtube" | "paste" | "bank" | "call" | "tv" | "plug/alt" | "wifi/alt" | "address" | "filter/2" | "more-horizontal" | "listnew" | "gridnew" | "refresh alt" | "loan" | "badge/?" | "id" | "click" | "notification";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Input" (node 1:10148)
export interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  rightSide?: boolean;
  type?: "master";
  state?: "focused" | "empty" | "filled" | "typing";
  label?: string;
  textMaster?: string;
  helperText?: boolean;
  textTyp?: string;
  text?: string;
  /** Text content; defaults to "Add-on". */
  text1?: string;
  /** Text content; defaults to "Helper text". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "master/menu selection" (node 1:12619)
export interface MasterMenuSelectionProps {
  className?: string;
  style?: React.CSSProperties;
  menu?: "settings" | "home" | "pay bills" | "transaction" | "services";
  state?: "active" | "inactive";
  /** Text content; defaults to "Home". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Media / Payments" (node 1:8701)
export interface MediaPaymentsProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  paymentMethod?: "amex" | "affirm" | "alipay" | "amazon" | "applepay" | "bancontact" | "bitcoin" | "bitcoincash" | "bitpay" | "citadele" | "dinersclub" | "discover" | "elo" | "etherium" | "forbrugsforeningen" | "googlepay" | "ideal" | "interac" | "jcb" | "klarna" | "lightcoin" | "maestro" | "mastercard" | "paypal" | "payoneer" | "paysafe" | "qiwi" | "sepa" | "shop pay" | "skrill" | "sofort" | "stripe" | "unionpay" | "verifone" | "visa" | "wechat" | "webmoney" | "yandex" | "giropay";
}

// figma layer: "24/0-plus" (node 1:6443)
export interface Plus240Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Receipt" (node 1:24243)
export interface ReceiptProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Send money-filled" (node 1:23953)
export interface SendMoneyFilledProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Status bar-iPhone" (node 1:353)
export interface StatusBarIPhoneProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "black" | "white";
  /** Text content; defaults to "10:16". */
  text1?: string;
}

// figma layer: "style/bottomnav" (node 1:12612)
export interface StyleBottomnavProps {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "variant/bottomnav" (node 1:12601)
export interface VariantBottomnavProps {
  className?: string;
  style?: React.CSSProperties;
  selection?: "settings" | "home" | "loan" | "transaction" | "support";
}

// figma layer: "View all tiers- individual" (node 1:24537)
export interface ViewAllTiersIndividualProps {
  className?: string;
  style?: React.CSSProperties;
}

declare const Avatar: React.FC<AvatarProps>;
declare const Button: React.FC<ButtonProps>;
declare const FormControlElement: React.FC<FormControlElementProps>;
declare const Heart24: React.FC<Heart24Props>;
declare const HomepageNEW: React.FC<HomepageNEWProps>;
declare const Icon: React.FC<IconProps>;
declare const Input: React.FC<InputProps>;
declare const MasterMenuSelection: React.FC<MasterMenuSelectionProps>;
declare const MediaPayments: React.FC<MediaPaymentsProps>;
declare const Plus240: React.FC<Plus240Props>;
declare const Receipt: React.FC<ReceiptProps>;
declare const SendMoneyFilled: React.FC<SendMoneyFilledProps>;
declare const StatusBarIPhone: React.FC<StatusBarIPhoneProps>;
declare const StyleBottomnav: React.FC<StyleBottomnavProps>;
declare const VariantBottomnav: React.FC<VariantBottomnavProps>;
declare const ViewAllTiersIndividual: React.FC<ViewAllTiersIndividualProps>;
declare global {
  interface Window {
    Avatar: React.FC<AvatarProps>;
    Button: React.FC<ButtonProps>;
    FormControlElement: React.FC<FormControlElementProps>;
    Heart24: React.FC<Heart24Props>;
    HomepageNEW: React.FC<HomepageNEWProps>;
    Icon: React.FC<IconProps>;
    Input: React.FC<InputProps>;
    MasterMenuSelection: React.FC<MasterMenuSelectionProps>;
    MediaPayments: React.FC<MediaPaymentsProps>;
    Plus240: React.FC<Plus240Props>;
    Receipt: React.FC<ReceiptProps>;
    SendMoneyFilled: React.FC<SendMoneyFilledProps>;
    StatusBarIPhone: React.FC<StatusBarIPhoneProps>;
    StyleBottomnav: React.FC<StyleBottomnavProps>;
    VariantBottomnav: React.FC<VariantBottomnavProps>;
    ViewAllTiersIndividual: React.FC<ViewAllTiersIndividualProps>;
  }
}
