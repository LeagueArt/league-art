/**
 * 편집 가능한 사이트 콘텐츠 스키마 + 기본값(현재 공개 페이지의 실제 카피).
 *
 * ⚠️ 여기 정의된 슬롯만 관리자 편집기(/admin/content)에 노출되고, 각 공개 페이지가
 *    이 키로 문구를 렌더한다. 편집기·서버·공개 페이지가 공유하므로 "server-only" 금지.
 *
 * 값은 목업이 아니라 실제 렌더 중인 문구다. 편집기에서 바꾸면 site_content 테이블에
 * 저장되고 공개 페이지에 반영된다(없으면 아래 기본값으로 폴백).
 */

export type ContentField = { key: string; label: string; multiline?: boolean };
export type ContentSection = { id: string; label: string; fields: ContentField[] };

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "home",
    label: "홈",
    fields: [
      { key: "home.heroEyebrow", label: "히어로 상단문구" },
      { key: "home.heroTitle", label: "히어로 제목", multiline: true },
      { key: "home.heroSubtitle", label: "히어로 부제" },
      { key: "home.introBody", label: "인트로 본문", multiline: true },
    ],
  },
  {
    id: "about",
    label: "소개",
    fields: [
      { key: "about.title", label: "페이지 제목" },
      { key: "about.intro", label: "소개 문단", multiline: true },
      { key: "about.whyHeadline", label: "Why We Exist · 헤드라인", multiline: true },
      { key: "about.whyBody", label: "Why We Exist · 본문 (빈 줄로 문단 구분)", multiline: true },
      { key: "about.whyEmphasis", label: "Why We Exist · 강조 문장" },
      { key: "about.focus1Ko", label: "Focus 1 · 제목" },
      { key: "about.focus1Body", label: "Focus 1 · 설명", multiline: true },
      { key: "about.focus2Ko", label: "Focus 2 · 제목" },
      { key: "about.focus2Body", label: "Focus 2 · 설명", multiline: true },
      { key: "about.focus3Ko", label: "Focus 3 · 제목" },
      { key: "about.focus3Body", label: "Focus 3 · 설명", multiline: true },
      { key: "about.directorHeadline", label: "원장 인사말 · 헤드라인", multiline: true },
      { key: "about.greeting", label: "원장 인사말 · 본문 (빈 줄로 문단 구분)", multiline: true },
    ],
  },
  {
    id: "curriculum",
    label: "커리큘럼",
    fields: [
      { key: "curriculum.introHeadline", label: "인트로 헤드라인" },
    ],
  },
  {
    id: "benefit",
    label: "베네핏",
    fields: [
      { key: "benefit.title", label: "페이지 제목" },
      { key: "benefit.intro", label: "인트로 문단", multiline: true },
    ],
  },
];

/** 코드 기본값 = 현재 공개 페이지 실제 카피(폴백/시드). */
export const CONTENT_DEFAULTS: Record<string, string> = {
  "home.heroEyebrow": "FASHION PORTFOLIO ACADEMY",
  "home.heroTitle": "감각과 완성도가\n만나는 곳",
  "home.heroSubtitle": "감각을, 학교가 읽는 포트폴리오로 —",
  "home.introBody":
    "리그아트는 해외 미대·패션 스쿨 입시를 위한 포트폴리오 전문 스튜디오입니다. 학생의 현재 작업과 목표 학교에 맞춰 가장 현실적인 포트폴리오 방향을 안내합니다.",
  "about.title": "리그아트 소개",
  "about.intro":
    "해외 명문 미술대학 입학부터 포트폴리오 디벨롭, 졸업 프로젝트, 그리고 글로벌 크리에이티브 커리어까지 함께하는 프리미엄 아트 스튜디오입니다.",
  "about.whyHeadline": "해외 미술대학에 합격하는 것은 목표가 아니라 시작입니다.",
  "about.whyBody":
    "하지만 많은 학생들이 입시에 맞춰 포트폴리오를 완성한 뒤, 학교에 입학해서는 새로운 환경과 높은 수준의 프로젝트 앞에서 방향을 잃곤 합니다. 입시를 위해 준비한 작업과 대학, 그리고 실제 디자인·아트 산업(Industry)에서 요구하는 역량 사이에는 생각보다 큰 간극이 존재하기 때문입니다.\n\n리그아트는 바로 그 간극을 줄이기 위해 시작되었습니다.\n\n우리는 학생들이 대학 합격에서 멈추지 않고, 입학 이후에도 포트폴리오를 지속적으로 디벨롭하며, 졸업 프로젝트와 인턴십, 공모전, 그리고 자신의 커리어까지 이어질 수 있도록 함께합니다.",
  "about.whyEmphasis":
    "리그아트는 입시를 위한 포트폴리오가 아닌, 디자이너와 아티스트의 미래를 위한 포트폴리오를 만듭니다.",
  "about.focus1Ko": "포트폴리오 개발",
  "about.focus1Body": "학교별 평가 기준에 맞춘 입시 포트폴리오를 제작하고 보완합니다.",
  "about.focus2Ko": "에세이 · 지원 전략",
  "about.focus2Body": "컨셉 개발과 서사 구조, 학교별 서면 포지셔닝을 코칭합니다.",
  "about.focus3Ko": "대학 기준 피드백",
  "about.focus3Body": "실제 입시 기준에 기반한 지속적 크리틱과 집중 관리를 제공합니다.",
  "about.directorHeadline": "단순한 수업을 넘어,\n결과까지 책임집니다.",
  "about.greeting":
    "리그아트는 Parsons School of Design 석사 출신 원장의 직접 지도 아래, 뉴욕 현지의 미대·패션스쿨 평가 기준을 바탕으로 포트폴리오 방향성을 설계하는 프리미엄 유학미술 포트폴리오 스튜디오입니다. 특히 파슨스 졸업반 포트폴리오 심사 경험과 뉴욕 패션 현장에서의 실무 경험을 기반으로, 학생이 단순히 잘 만든 작품을 넘어서 왜 이 작업을 해야 하는지, 어떤 방식으로 발전시켜야 하는지를 깊이 있게 지도합니다.\n\n해외 미대 포트폴리오는 예쁜 결과물만으로 평가되지 않습니다. 학교는 학생이 어떤 질문을 던지는지, 어떤 리서치를 통해 사고를 확장하는지, 그리고 그 과정을 자신만의 시각 언어로 어떻게 풀어내는지를 봅니다. 리그아트는 이러한 해외 미대의 평가 기준을 바탕으로 학생 개개인의 성향, 관심사, 감정, 경험을 분석하고, 이를 설득력 있는 주제와 포트폴리오 흐름으로 발전시킵니다.\n\n리그아트의 가장 큰 차별점은 1:1 맞춤 과외 방식의 밀도 높은 지도입니다. 정형화된 커리큘럼에 학생을 맞추는 것이 아니라, 학생 한 명 한 명의 감각과 가능성에 맞춰 주제 설정, 리서치, 컨셉 개발, 스케치북, 워크북, 최종 작품 메이킹, 포트폴리오 구성, 에세이 방향성까지 입시 전반의 흐름을 세밀하게 관리합니다.\n\n또한 패션 전공 학생들을 위해 실제 의상 제작 과정에 필요한 메이킹 리소스까지 함께 제공합니다. 리그아트는 CSM 출신이자 Alexander McQueen에서 10년간 실무 경험을 쌓은 선생님의 패턴, 재단, 봉제, 드레이핑, 마네킹 작업, 공업용 미싱 활용 등 전문적인 제작 도움을 받을 수 있는 환경을 갖추고 있습니다.\n\n리그아트의 수업은 작품 수를 채우는 방식이 아닙니다. 학생이 가지고 있는 고유한 감각을 발견하고, 그것을 입학 심사에서 설득력 있게 보일 수 있는 포트폴리오로 정리하는 과정입니다. 학생이 무엇을 좋아하는지, 어떤 질문을 가지고 있는지, 어떤 방식으로 세상을 바라보는지를 함께 찾아가며, 그 시선을 자신만의 시각 언어로 발전시킵니다.\n\n리그아트는 해외 미술대학 입학을 위한 포트폴리오 준비뿐 아니라, 세계 패션 대회 및 공모전 준비까지 함께 지원합니다. 합격을 위한 포트폴리오를 넘어, 유학 이후에도 스스로 작업을 이어갈 수 있는 힘을 만드는 것이 리그아트의 목표입니다. 리그아트는 학생 한 명 한 명의 가능성을 가장 설득력 있는 포트폴리오로 완성합니다.",
  "curriculum.introHeadline": "리그아트는 현실적인 고민을 해결합니다.",
  "benefit.title": "리그아트 베네핏",
  "benefit.intro":
    "리그아트가 학생에게 제공하는 차별화된 가치와, 가장 많이 받는 질문들을 함께 담았습니다.",
};

/** 편집기가 다루는 전체 키 목록 (API 화이트리스트 검증용). */
export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);
