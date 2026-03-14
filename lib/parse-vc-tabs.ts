export type VCTab = {
  title: string;
  content: string;
};

export function parseVCTabs(html: string): { tabs: VCTab[]; remaining: string } {
  const tabs: VCTab[] = [];

  const cleaned = html.replace(/<\/?p>/g, "");

  const sectionRegex =
    /\[vc_tta_section\s+title="([^"]+)"[^\]]*\]\[vc_column_text\]([\s\S]*?)\[\/vc_column_text\]\[\/vc_tta_section\]/g;

  let match;
  while ((match = sectionRegex.exec(cleaned)) !== null) {
    tabs.push({
      title: match[1],
      content: match[2].trim(),
    });
  }

  const remaining = cleaned
    .replace(/\[vc_row\]|\[\/vc_row\]/g, "")
    .replace(/\[vc_column\]|\[\/vc_column\]/g, "")
    .replace(/\[vc_tta_tabs[^\]]*\][\s\S]*?\[\/vc_tta_tabs\]/g, "")
    .trim();

  return { tabs, remaining };
}
