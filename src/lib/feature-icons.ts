// Maps a free-text feature string to the best matching icon in /public/assets/images/Icon/
// Falls back to a generic building icon if no keyword matches.

interface IconRule {
  keywords: RegExp;
  icon: string;
}

const rules: IconRule[] = [
  { keywords: /bed\s*room|bedroom/i, icon: "/assets/images/Icon/bedroom.svg" },
  { keywords: /bath\s*room|bathroom|en[- ]?suite/i, icon: "/assets/images/Icon/bathroom.svg" },
  { keywords: /kitchen counter/i, icon: "/assets/images/Icon/mdi_kitchen-counter.png" },
  { keywords: /kitchen/i, icon: "/assets/images/Icon/kitchen.svg" },
  { keywords: /dining/i, icon: "/assets/images/Icon/Dining area.svg" },
  { keywords: /living|lounge|sitting/i, icon: "/assets/images/Icon/living room.svg" },
  { keywords: /balcony|terrace/i, icon: "/assets/images/Icon/cbi_rooms-balcony.png" },
  { keywords: /roof/i, icon: "/assets/images/Icon/ph_solar-roof-fill.png" },
  { keywords: /solar/i, icon: "/assets/images/Icon/ic_baseline-solar-power.png" },
  { keywords: /(electric|power|generator|inverter)/i, icon: "/assets/images/Icon/healthicons_electricity.png" },
  { keywords: /(water|plumb|borehole|tap)/i, icon: "/assets/images/Icon/temaki_water-tap-drinkable.png" },
  { keywords: /(security|cctv|surveillance|guard)/i, icon: "/assets/images/Icon/boxicons_cctv-filled.png" },
  { keywords: /(parking|garage|car park)/i, icon: "/assets/images/Icon/material-symbols_parking-sign-sharp.png" },
  { keywords: /(gym|fitness|wellness)/i, icon: "/assets/images/Icon/mdi_gym.png" },
  { keywords: /(school|hospital|shopping|mall|market)/i, icon: "/assets/images/Icon/Buildings.png" },
  { keywords: /(road|expressway|highway|access route)/i, icon: "/assets/images/Icon/healthicons_paved-road.png" },
  { keywords: /(nature|serene|peaceful|family|garden|park|green)/i, icon: "/assets/images/Icon/material-symbols_nature-people-rounded.png" },
  { keywords: /(investment|growth|value|appreciation|roi|return)/i, icon: "/assets/images/Icon/garden_growth-chart-fill-12.png" },
  { keywords: /(distance|proximity|close to|near)/i, icon: "/assets/images/Icon/game-icons_path-distance.png" },
  { keywords: /(office|facility|management|estate)/i, icon: "/assets/images/Icon/fluent-emoji-high-contrast_office-building.png" },
  { keywords: /(map|location|located|address|lekki|ikoyi|lagos|nigeria|area)/i, icon: "/assets/images/Icon/Location.svg" },
];

const defaultIcon = "/assets/images/Icon/Building.svg";

export function iconForFeature(feature: string): string {
  for (const rule of rules) {
    if (rule.keywords.test(feature)) return rule.icon;
  }
  return defaultIcon;
}
