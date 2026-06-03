// Admin section permission definitions.
// "owner" role bypasses all checks. "staff" can only access sections
// listed in their `permissions` array.

export interface AdminSection {
  key: string;
  label: string;
  href: string;
}

export const adminSections: AdminSection[] = [
  { key: "properties", label: "Properties", href: "/rexos-staff/properties" },
  { key: "blog", label: "Blog Posts", href: "/rexos-staff/blog" },
  { key: "pages", label: "Page Content", href: "/rexos-staff/pages" },
  { key: "team", label: "Team", href: "/rexos-staff/team" },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/rexos-staff/testimonials",
  },
  { key: "enquiries", label: "Enquiries", href: "/rexos-staff/enquiries" },
  { key: "settings", label: "Site Settings", href: "/rexos-staff/settings" },
];

export const permissionKeys = adminSections.map((s) => s.key);

/** Returns the section key for a given pathname, or null for the dashboard root. */
export function sectionForPath(pathname: string): string | null {
  const match = pathname.match(/^\/rexos-staff\/([^/]+)/);
  if (!match) return null;
  return match[1];
}

/** Whether a user (role + permissions) may access a given section key. */
export function canAccessSection(
  role: string,
  permissions: string[],
  sectionKey: string | null,
): boolean {
  if (role === "owner") return true;
  // dashboard root + login are always allowed for any signed-in user
  if (sectionKey === null || sectionKey === "login") return true;
  // user management is owner-only
  if (sectionKey === "users") return false;
  return permissions.includes(sectionKey);
}
