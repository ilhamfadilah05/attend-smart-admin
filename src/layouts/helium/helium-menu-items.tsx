import { routes } from "@/config/routes";
import { DUMMY_ID } from "@/config/constants";
import {
  PiCurrencyCircleDollarFill,
  PiShoppingCart,
  PiHeadset,
  PiPackage,
  PiChartBar,
  PiCurrencyDollar,
  PiSquaresFour,
  PiGridFour,
  PiFeather,
  PiChartLineUp,
  PiMapPinLine,
  PiUserGear,
  PiBellSimpleRinging,
  PiUser,
  PiEnvelopeSimpleOpen,
  PiSteps,
  PiCreditCard,
  PiTable,
  PiBrowser,
  PiHourglassSimple,
  PiUserCircle,
  PiShootingStar,
  PiRocketLaunch,
  PiFolderLock,
  PiBinoculars,
  PiHammer,
  PiNoteBlank,
  PiUserPlus,
  PiShieldCheck,
  PiLockKey,
  PiChatCenteredDots,
  PiCalendarPlus,
  PiHouseLine,
  PiAirplaneTilt,
  PiPokerChip,
  PiFolder,
  PiListNumbers,
  PiCaretCircleUpDown,
  PiBriefcase,
  PiSecurityCamera,
  PiLock,
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Overview",
  },
  // label end
  {
    name: "Dashboard",
    href: "/",
    icon: <PiRocketLaunch />,
  },

  // label start
  {
    name: "Campaign",
  },
  // label end
  {
    name: "Campaign",
    href: "#",
    icon: <PiShoppingCart />,
    dropdownItems: [
      {
        name: "Campaign",
        href: "#",
        badge: "",
      },
      {
        name: "Kategori",
        href: "#",
      },
      {
        name: "News",
        href: "#",
      },
    ],
  },

  {
    name: "Master Data",
  },
  // label end
  {
    name: "Role",
    href: "#",
    icon: <PiLock />,
  },
  {
    name: "User",
    href: "#",
    icon: <PiUser />,
  },
];
