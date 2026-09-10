// Real partner data, ported from the reference project
// (company-homepage/lib/data/partners.ts). Not a placeholder — no
// TODO(real-data) needed here.
export interface Partner {
  name: string
  logoSrc: string
  href?: string
}

const CDN_BASE = "/cdn/image/partners"

export const partners: Partner[] = [
  {
    // CDN에 NFD 유니코드 형태로 저장되어 있어 percent-encoding 그대로 유지 필요
    name: "인터리젠",
    logoSrc: `${CDN_BASE}/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%90%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A6%E1%86%AB.svg`,
  },
  { name: "Able", logoSrc: `${CDN_BASE}/Able.svg` },
  { name: "chainalysis", logoSrc: `${CDN_BASE}/chainalysis.svg` },
  { name: "Avalanche", logoSrc: `${CDN_BASE}/avalanche.svg` },
  { name: "AWS", logoSrc: `${CDN_BASE}/aws.svg` },
  { name: "BKL", logoSrc: `${CDN_BASE}/bkl.svg` },
  { name: "Code", logoSrc: `${CDN_BASE}/code.svg` },
  { name: "Fireblocks", logoSrc: `${CDN_BASE}/fireblocks.svg` },
  { name: "GTONE", logoSrc: `${CDN_BASE}/GTONE.svg` },
  { name: "KPN", logoSrc: `${CDN_BASE}/kpn.svg` },
  { name: "CLOVA eKYC", logoSrc: `${CDN_BASE}/naver_cloud.svg` },
  { name: "TokenPost", logoSrc: `${CDN_BASE}/Tokenpost.svg` },
  { name: "Xangle", logoSrc: `${CDN_BASE}/Xangle.svg` },
]
