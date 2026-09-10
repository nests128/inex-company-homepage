import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { MissionSection } from "@/widgets/mission";
import { TeamSection } from "@/widgets/team";
import { HistorySection } from "@/widgets/history";
import { WorldMap } from "@/shared/ui";

import {
  missionContent,
  teamContent,
  teamMembers,
  historyContent,
  historyYears,
} from "@/entities/company";

// INEX가 온/오프램프·정산으로 잇는 원화(한국)와 주요 디지털자산 허브를 표시.
// 실제 파트너십/서비스 지역 확정 전 대략적 좌표 — 정확한 지리적 클레임이
// 아닌 장식적 "글로벌 연결" 표현이라 TODO(real-data) 불필요.
const missionWorldMapDots = [
  { start: { lat: 37.5665, lng: 126.978 }, end: { lat: 1.3521, lng: 103.8198 } }, // 서울 → 싱가포르
  { start: { lat: 37.5665, lng: 126.978 }, end: { lat: 40.7128, lng: -74.006 } }, // 서울 → 뉴욕
  { start: { lat: 37.5665, lng: 126.978 }, end: { lat: 51.5072, lng: -0.1276 } }, // 서울 → 런던
];

export function CompanyPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <MissionSection
          eyebrow={missionContent.eyebrow}
          title={missionContent.title}
          paragraphs={missionContent.paragraphs}
          imageSrc={missionContent.imageSrc}
          imageAlt={missionContent.imageAlt}
          visual={<WorldMap dots={missionWorldMapDots} />}
        />
        <TeamSection
          eyebrow={teamContent.eyebrow}
          title={teamContent.title}
          subtitle={teamContent.subtitle}
          members={teamMembers}
        />
        <HistorySection
          eyebrow={historyContent.eyebrow}
          title={historyContent.title}
          subtitle={historyContent.subtitle}
          years={historyYears}
        />
      </main>
      <Footer />
    </div>
  );
}
