import { prisma } from "./prisma";

export interface SiteSettings {
  logoUrl: string | null;
  brandColor: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export const settingDefaults: SiteSettings = {
  logoUrl: null,
  brandColor: "#1A3763",
  phone: "+234 916 474 2000",
  email: "info@rexosproperties.com",
  whatsapp: "+2349164742000",
  address: "No 8B, Abiodun Ikomi Street, Lekki, Lagos.",
  facebookUrl: "https://facebook.com/share/15jMDmXkG1/",
  instagramUrl: "https://instagram.com/rexos_properties",
  tiktokUrl: "https://tiktok.com/@rexosproperties",
};

export const settingKeys: (keyof SiteSettings)[] = [
  "logoUrl",
  "brandColor",
  "phone",
  "email",
  "whatsapp",
  "address",
  "facebookUrl",
  "instagramUrl",
  "tiktokUrl",
];

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: settingKeys } },
    });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      logoUrl: map.get("logoUrl") || settingDefaults.logoUrl,
      brandColor: map.get("brandColor") || settingDefaults.brandColor,
      phone: map.get("phone") || settingDefaults.phone,
      email: map.get("email") || settingDefaults.email,
      whatsapp: map.get("whatsapp") || settingDefaults.whatsapp,
      address: map.get("address") || settingDefaults.address,
      facebookUrl: map.get("facebookUrl") || settingDefaults.facebookUrl,
      instagramUrl: map.get("instagramUrl") || settingDefaults.instagramUrl,
      tiktokUrl: map.get("tiktokUrl") || settingDefaults.tiktokUrl,
    };
  } catch {
    return settingDefaults;
  }
}
