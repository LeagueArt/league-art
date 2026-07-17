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
      { key: "home.heroTitle", label: "히어로 제목 A(국문)", multiline: true },
      { key: "home.heroSubtitle", label: "히어로 부제 A(국문)" },
      { key: "home.heroTitleEn", label: "히어로 제목 B(영문)", multiline: true },
      { key: "home.heroSubtitleEn", label: "히어로 부제 B(영문)" },
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
      { key: "curriculum.introBody", label: "인트로 본문", multiline: true },
      { key: "curriculum.course1Ko", label: "과정1 · 국문명" },
      { key: "curriculum.course1En", label: "과정1 · 영문명" },
      { key: "curriculum.course1Desc", label: "과정1 · 설명", multiline: true },
      { key: "curriculum.course1Lessons", label: "과정1 · 수업내용 (한 줄에 하나)", multiline: true },
      { key: "curriculum.course2Ko", label: "과정2 · 국문명" },
      { key: "curriculum.course2En", label: "과정2 · 영문명" },
      { key: "curriculum.course2Desc", label: "과정2 · 설명", multiline: true },
      { key: "curriculum.course2Lessons", label: "과정2 · 수업내용 (한 줄에 하나)", multiline: true },
      { key: "curriculum.course3Ko", label: "과정3 · 국문명" },
      { key: "curriculum.course3En", label: "과정3 · 영문명" },
      { key: "curriculum.course3Desc", label: "과정3 · 설명", multiline: true },
      { key: "curriculum.course3Lessons", label: "과정3 · 수업내용 (한 줄에 하나)", multiline: true },
      { key: "curriculum.course4Ko", label: "과정4 · 국문명" },
      { key: "curriculum.course4En", label: "과정4 · 영문명" },
      { key: "curriculum.course4Desc", label: "과정4 · 설명", multiline: true },
      { key: "curriculum.course4Lessons", label: "과정4 · 수업내용 (한 줄에 하나)", multiline: true },
      { key: "curriculum.onlineDesc", label: "온라인 클래스 · 설명", multiline: true },
      { key: "curriculum.onlineRecommend", label: "온라인 · 추천 대상 (한 줄에 하나)", multiline: true },
      { key: "curriculum.onlineProcess", label: "온라인 · 진행 방식 (한 줄에 하나, '제목 | 설명' 형식)", multiline: true },
      { key: "curriculum.closingHeadline", label: "마무리 · 헤드라인" },
      { key: "curriculum.closingBody", label: "마무리 · 본문", multiline: true },
    ],
  },
  {
    id: "benefit",
    label: "베네핏",
    fields: [
      { key: "benefit.title", label: "페이지 제목" },
      { key: "benefit.intro", label: "인트로 문단", multiline: true },
      { key: "benefit.b1Title", label: "베네핏1 · 제목" },
      { key: "benefit.b1Body", label: "베네핏1 · 본문", multiline: true },
      { key: "benefit.b2Title", label: "베네핏2 · 제목" },
      { key: "benefit.b2Body", label: "베네핏2 · 본문", multiline: true },
      { key: "benefit.b3Title", label: "베네핏3 · 제목" },
      { key: "benefit.b3Body", label: "베네핏3 · 본문", multiline: true },
      { key: "benefit.b4Title", label: "베네핏4 · 제목" },
      { key: "benefit.b4Body", label: "베네핏4 · 본문", multiline: true },
      { key: "benefit.b5Title", label: "베네핏5 · 제목" },
      { key: "benefit.b5Body", label: "베네핏5 · 본문", multiline: true },
      { key: "benefit.b6Title", label: "베네핏6 · 제목" },
      { key: "benefit.b6Body", label: "베네핏6 · 본문", multiline: true },
      { key: "benefit.programBody", label: "상담/프로그램 · 본문", multiline: true },
      { key: "benefit.faq1Q", label: "FAQ1 · 질문" },
      { key: "benefit.faq1A", label: "FAQ1 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq2Q", label: "FAQ2 · 질문" },
      { key: "benefit.faq2A", label: "FAQ2 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq3Q", label: "FAQ3 · 질문" },
      { key: "benefit.faq3A", label: "FAQ3 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq4Q", label: "FAQ4 · 질문" },
      { key: "benefit.faq4A", label: "FAQ4 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq5Q", label: "FAQ5 · 질문" },
      { key: "benefit.faq5A", label: "FAQ5 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq6Q", label: "FAQ6 · 질문" },
      { key: "benefit.faq6A", label: "FAQ6 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq7Q", label: "FAQ7 · 질문" },
      { key: "benefit.faq7A", label: "FAQ7 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq8Q", label: "FAQ8 · 질문" },
      { key: "benefit.faq8A", label: "FAQ8 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq9Q", label: "FAQ9 · 질문" },
      { key: "benefit.faq9A", label: "FAQ9 · 답변 (빈 줄로 문단 구분)", multiline: true },
      { key: "benefit.faq10Q", label: "FAQ10 · 질문" },
      { key: "benefit.faq10A", label: "FAQ10 · 답변 (빈 줄로 문단 구분)", multiline: true },
    ],
  },
];

/** 코드 기본값 = 현재 공개 페이지 실제 카피(폴백/시드). */
export const CONTENT_DEFAULTS: Record<string, string> = {
  "home.heroEyebrow": "FASHION PORTFOLIO ACADEMY",
  "home.heroTitle": "감각과 완성도가\n만나는 곳",
  "home.heroSubtitle": "감각을, 학교가 읽는 포트폴리오로 —",
  "home.heroTitleEn": "Activate Your\nPotential",
  "home.heroSubtitleEn": "Where craft meets admission —",
  "home.introBody":
    "리그아트는 강남 서초동에 위치한 해외 미대·패션 스쿨 입시 포트폴리오 전문 스튜디오입니다. 파슨스·CSM 출신 지도진이 강남 패션유학 준비생의 포트폴리오와 의상 메이킹을 1:4로 밀착 지도하며, 목표 학교에 맞춘 가장 현실적인 방향을 안내합니다.",
  "about.title": "리그아트 소개",
  "about.intro":
    "강남 서초동에 위치한 리그아트는 해외 명문 미술대학 입학부터 포트폴리오 디벨롭, 졸업 프로젝트, 그리고 글로벌 크리에이티브 커리어까지 함께하는 프리미엄 패션유학 스튜디오입니다.",
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
  "curriculum.introBody":
    "해외 미대 입시를 준비하는 학생들이 가장 많이 막히는 지점은 단순히 “작품을 어떻게 만들까”가 아닙니다. 어떤 학교에 지원해야 하는지, 포트폴리오를 어떤 방향으로 구성해야 하는지, 패션 작업은 어디까지 직접 제작해야 하는지, 졸업작품은 어떻게 완성도 있게 마무리해야 하는지까지 모두 연결되어 있습니다. 리그아트는 해외 패션 포트폴리오, 해외대 지원, 국내 공모전, 해외·국내 졸업제작까지 학생의 단계와 목표에 맞춰 현실적인 해결책을 제안합니다. 파슨스 수석 졸업 출신 원장의 직접 지도와 뉴욕 현지 패션·아트 씬 경험을 바탕으로, 단순히 보기 좋은 포트폴리오가 아니라 학교와 심사자 및 패션 브랜드들이 납득할 수 있는 작업의 방향, 리서치, 컨셉, 제작 완성도를 함께 설계합니다.",
  "curriculum.course1Ko": "해외 패션 포트폴리오",
  "curriculum.course1En": "Fashion Portfolio Preparation",
  "curriculum.course1Desc":
    "해외 패션스쿨은 결과물만 보지 않습니다. 학생이 어떤 주제를 발견했는지, 그 주제를 어떻게 리서치했는지, 그리고 그것이 디자인과 제작 과정으로 어떻게 발전했는지를 봅니다. 리그아트의 해외 패션 포트폴리오 과정은 학생의 개인적인 감각과 관심사를 바탕으로, 학교별 평가 기준에 맞는 포트폴리오 방향을 설계합니다.",
  "curriculum.course1Lessons":
    "개인 주제 및 컨셉 개발\n패션 리서치 방향 설정\n무드보드 / 컬러 / 소재 / 실루엣 구성\n디자인 드로잉 및 패션 일러스트레이션\n디자인 디벨롭먼트 과정 정리\n패브릭 / 텍스처 / 샘플링 실험\n스케치북 및 프로세스북 구성\n최종 포트폴리오 레이아웃 디렉팅\n학교별 포트폴리오 요구사항 분석\n아티스트 스테이트먼트 준비",
  "curriculum.course2Ko": "해외대 지원반",
  "curriculum.course2En": "Art & Design University Application",
  "curriculum.course2Desc":
    "해외 미대 입시는 포트폴리오 하나만으로 끝나지 않습니다. 학교 선정, 전공 선택, 에세이, 서류, 장학금 전략까지 모두 함께 준비되어야 합니다. 리그아트 해외대 지원반은 학생의 현재 작업 수준과 목표 학교를 기준으로, 지원 전체 과정을 체계적으로 관리합니다.",
  "curriculum.course2Lessons":
    "목표 학교 및 전공 상담\n학교별 포트폴리오 요구사항 분석\n지원 일정 및 제출 전략 설계\nCommon App / SlideRoom 준비 방향\nArtist Statement / Personal Essay 방향 설정\n포트폴리오 작품 순서 및 구성 디렉팅\n장학금 가능성을 고려한 작품 완성도 체크\n인터뷰 대비 및 학교별 예상 질문 준비\n최종 제출 전 포트폴리오 리뷰",
  "curriculum.course3Ko": "공모전반",
  "curriculum.course3En": "Competition Portfolio Class",
  "curriculum.course3Desc":
    "공모전은 단순히 상을 받기 위한 과정이 아니라, 학생의 포트폴리오에 강한 포인트를 만들어주는 중요한 기회가 될 수 있습니다. 리그아트 국내 공모전반은 학생의 관심 분야와 작업 성향에 맞는 공모전을 선정하고, 주제 해석부터 최종 제출물 완성까지 함께 지도합니다.",
  "curriculum.course3Lessons":
    "학생별 적합한 공모전 선정\n공모전 주제 분석 및 방향 설정\n아이디어 리서치 및 컨셉 개발\n스케치 / 실험 / 디자인 디벨롭먼트\n최종 작품 제작 디렉팅\n작품 설명문 및 제출 자료 구성\n포트폴리오에 활용 가능한 과정 정리\n수상 이후 포트폴리오 반영 전략",
  "curriculum.course4Ko": "해외 / 국내 졸업제작반",
  "curriculum.course4En": "Graduation Collection & Final Project",
  "curriculum.course4Desc":
    "졸업작품은 단순히 옷을 완성하는 과정이 아닙니다. 학생의 전공적 정체성, 리서치 능력, 디자인 방향, 제작 완성도가 모두 드러나는 가장 중요한 결과물입니다. 리그아트는 해외·국내 패션 전공 학생들의 졸업작품을 위해 컨셉 기획부터 디자인 디벨롭먼트, 패턴실·봉제·가봉 리소스 연결까지 현실적인 제작 과정을 지원합니다. 특히 패션 작업의 경우, 아이디어는 좋지만 실제 제작 과정에서 막히는 학생들이 많습니다. 리그아트는 학생이 혼자 해결하기 어려운 패턴, 샘플 제작, 봉제, 가봉 과정까지 전문 리소스와 연결하여 졸업작품 수준의 완성도를 목표로 합니다.",
  "curriculum.course4Lessons":
    "졸업작품 컨셉 및 컬렉션 방향 설정\n리서치북 / 프로세스북 구성\n디자인 디벨롭먼트 및 룩 구성\n소재 선정 및 패브릭 실험\n실루엣·디테일·마감 방향 디렉팅\n패턴실 / 봉제 / 가봉 리소스 연결\n샘플 제작 과정 피드백\n최종 룩 스타일링 및 촬영 방향 제안\n졸업 포트폴리오 / 룩북 구성\n발표 및 크리틱 대비",
  "curriculum.onlineDesc":
    "리그아트 온라인 클래스는 해외 미대 입시를 준비하는 학생, 지방에 거주하는 학생, 이미 해외 학교에 재학 중인 학생, 졸업작품 제작 과정에서 방향성이 필요한 학생들을 위해 운영됩니다. 온라인 수업이라고 해서 단순한 피드백으로 끝나지 않습니다. 학생의 작업을 함께 보며 주제 설정, 리서치 방향, 디자인 디벨롭먼트, 포트폴리오 구성, 학교별 제출 전략까지 단계별로 지도합니다.",
  "curriculum.onlineRecommend":
    "해외 미대 / 패션스쿨 입시를 준비하는 학생\n지방 또는 해외에 거주해 오프라인 수업이 어려운 학생\nParsons, FIT, CSM, LCF, RISD, SCAD 등 해외 학교 지원을 준비하는 학생\n이미 해외 미대에 재학 중이지만 작업 방향성이 필요한 학생\n졸업작품, 컬렉션, 룩북, 포트폴리오 완성도가 필요한 학생\n학교 수업만으로는 포트폴리오 정리가 어려운 학생",
  "curriculum.onlineProcess":
    "상담 및 작업 진단 | 학생의 현재 작업 상태, 목표 학교, 지원 일정, 제작 상황을 확인합니다.\n자료 공유 | 스케치, 리서치 이미지, 무드보드, 작업 사진, 포트폴리오 PDF 등을 온라인으로 공유합니다.\n실시간 피드백 | 화상 수업을 통해 작업 방향, 수정 포인트, 다음 단계 과제를 구체적으로 안내합니다.\n과제 및 디벨롭먼트 | 수업 후 학생은 정해진 방향에 따라 작업을 발전시키고, 다음 수업에서 다시 피드백을 받습니다.\n최종 포트폴리오 정리 | 작품 순서, 페이지 구성, 설명문, 제출 파일까지 최종적으로 정리합니다.",
  "curriculum.closingHeadline": "리그아트는 입시 이후까지 생각합니다.",
  "curriculum.closingBody":
    "해외 미대 입시는 합격으로 끝나지 않습니다. 입학 이후 학교 수업을 따라가고, 졸업 포트폴리오를 만들고, 나아가 자신의 커리어 방향을 설계하는 과정까지 이어집니다. 리그아트는 단기적인 합격만을 위한 포트폴리오가 아니라, 학생이 실제로 학교에 들어가서도 성장할 수 있는 감각과 사고방식을 함께 길러갑니다. 리그아트는 현실적인 고민을 해결합니다. 포트폴리오의 방향, 학교 지원 전략, 공모전 준비, 졸업작품 제작까지. 학생의 다음 단계를 함께 설계합니다.",
  "benefit.title": "리그아트 베네핏",
  "benefit.intro":
    "리그아트가 학생에게 제공하는 차별화된 가치와, 가장 많이 받는 질문들을 함께 담았습니다.",
  "benefit.b1Title": "소수정예 1:4 밀착 지도",
  "benefit.b1Body": "한 클래스 최대 4명. 학생별 작업 방향·포트폴리오를 전적으로 책임집니다.",
  "benefit.b2Title": "Parsons·CSM 출신 지도진",
  "benefit.b2Body": "원장·강사진과 글로벌 브랜드 현직 크리에이티브 디렉터의 크리틱.",
  "benefit.b3Title": "원서 통합 컨설팅",
  "benefit.b3Body": "지원과 관련한 전 과정을 총괄 관리합니다.",
  "benefit.b4Title": "포트폴리오 + 에세이 통합",
  "benefit.b4Body": "작업과 서류를 하나의 흐름으로 완성합니다.",
  "benefit.b5Title": "합격까지 토탈 케어",
  "benefit.b5Body": "공모전·장학금·진로 연계까지 지원합니다.",
  "benefit.b6Title": "실전 기준 피드백",
  "benefit.b6Body": "실제 입시 평가 기준에 기반한 다회 피드백.",
  "benefit.programBody":
    "프로그램 구성과 수업료는 학생의 목표와 준비 기간에 따라 달라집니다. 무료 상담에서 개인별 커리큘럼과 함께 안내해 드립니다.",
  "benefit.faq1Q": "수업은 어디에서 진행되나요?",
  "benefit.faq1A":
    "수업은 서울 강남구 서초동에 위치한 리그아트유학 스튜디오에서 진행됩니다. 해외 거주 중이거나 방문이 어려운 경우, 온라인 상담 및 온라인 수업 가능 여부를 별도로 안내해드립니다.",
  "benefit.faq2Q": "미국뿐 아니라 영국, 캐나다 미대도 지원할 수 있나요?",
  "benefit.faq2A":
    "네, 가능합니다. 미국, 영국, 캐나다 등 국가별·학교별로 요구하는 포트폴리오 방향, 원서 구성, 에세이 기준이 다르기 때문에 리그아트에서는 각 학교의 지원 요건에 맞춰 맞춤형 전략을 설계합니다.",
  "benefit.faq3Q": "원서 통합 컨설팅은 무엇인가요?",
  "benefit.faq3A":
    "원서 통합 컨설팅은 학교 선정부터 포트폴리오 방향, 에세이, 서류, 제출 일정까지 지원 과정 전반을 함께 관리하는 서비스입니다. 학생의 목표 전공과 학교에 맞춰 필요한 준비 사항을 정리하고, 전체 지원 흐름이 흔들리지 않도록 체계적으로 안내합니다. 자세한 내용은 상담 시 학생의 현재 상황과 목표 학교를 기준으로 안내해드립니다.",
  "benefit.faq4Q": "리그아트는 다른 미술학원과 무엇이 다른가요?",
  "benefit.faq4A":
    "리그아트는 단순히 작품을 많이 만드는 수업이 아니라, 해외 미대에서 평가되는 포트폴리오의 방향성을 함께 설계하는 스튜디오입니다. 가장 큰 차이는 현역성입니다. 리그아트는 파슨스 수석 졸업 출신 원장이 직접 지도하며, 현재도 뉴욕 현지의 패션·아트 씬과 연결된 실무 경험, 파슨스 뉴욕 졸업 패션쇼 및 포트폴리오 심사 경험을 바탕으로 학생을 지도합니다. 해외 미대 입시는 매년 트렌드와 평가 기준이 달라집니다. 그래서 과거의 합격 사례나 오래된 방식만으로는 학생에게 현실적인 도움을 주기 어렵습니다. 리그아트는 지금 현장에서 요구되는 감각, 포트폴리오 구성 방식, 리서치 방향, 전공별 완성도 기준을 반영해 학생 개개인의 작업을 발전시킵니다.\n\n또한 리그아트는 입시에서 끝나는 수업이 아니라, 입학 이후 학교생활과 졸업 포트폴리오, 나아가 커리어 방향까지 함께 바라봅니다. 뉴욕 현지 네트워크와 실무 리소스를 바탕으로 학생에게 필요한 경우 교수진, 현업 디자이너, 패션·아트 분야 전문가와의 연결 가능성까지 함께 고민합니다.\n\n패션 전공 학생의 경우, 메이킹 과정 또한 보다 전문적으로 지원합니다. CSM 학사·석사 출신이자 Alexander McQueen 10년 경력의 현 대기업 크리에이티브 디렉터 및 전문 패턴·메이킹 리소스와의 연결을 통해, 단순한 입시용 작품을 넘어 졸업작품 수준의 제작 방향까지 함께 설계할 수 있습니다.\n\n리그아트는 학생이 학교에 합격하는 것에서 멈추지 않고, 해외 미대에서 실제로 성장하고, 이후 커리어까지 이어갈 수 있도록 보다 현실적인 방향을 제안합니다.",
  "benefit.faq5Q": "준비 기간은 얼마나 필요한가요?",
  "benefit.faq5A":
    "학생의 현재 실력, 목표 학교, 지원 전공에 따라 다르지만 일반적으로 12개월에서 24개월 정도의 준비 기간을 권장합니다.",
  "benefit.faq6Q": "미술을 전혀 못해도 괜찮나요?",
  "benefit.faq6A":
    "네, 가능합니다. 기초 드로잉부터 리서치, 아이디어 전개, 실험 과정, 포트폴리오 완성까지 단계별로 지도합니다. 해외 미대 포트폴리오에서 중요한 것은 단순한 기술력만이 아닙니다. 학생이 어떤 시선으로 세상을 바라보는지, 어떤 질문을 가지고 작업을 발전시키는지, 그리고 그 가능성을 어떻게 시각적으로 보여주는지가 중요합니다. 리그아트는 학생 안에 있는 잠재력을 발견하고, 그것을 포트폴리오로 설득력 있게 표현할 수 있도록 돕습니다.",
  "benefit.faq7Q": "장학금도 받을 수 있나요?",
  "benefit.faq7A":
    "네. 학교별 장학금 가능성과 전략을 함께 고려해 준비합니다. 장학금은 단순히 성적만으로 결정되는 것이 아니라, 포트폴리오의 완성도, 학생의 개성, 전공 적합성, 에세이와 원서 전체의 설득력 등 여러 요소가 함께 작용합니다. 리그아트는 지원 학교별 특성을 고려해 장학금 가능성을 높일 수 있는 방향으로 포트폴리오와 원서 전략을 함께 설계합니다.",
  "benefit.faq8Q": "포트폴리오는 몇 작품 정도 준비해야 하나요?",
  "benefit.faq8A":
    "학교와 전공에 따라 다르지만, 일반적으로 완성도 있는 작품과 과정 기록을 함께 준비해야 합니다.\n\n해외 미대에서는 결과물뿐 아니라 아이디어가 어떻게 시작되고 발전했는지, 어떤 실험과 리서치를 거쳤는지를 중요하게 평가합니다. 리그아트에서는 단순히 작품 개수를 채우는 것이 아니라, 학생의 개성과 전공 적합성이 잘 드러나는 포트폴리오 구성을 함께 설계합니다.",
  "benefit.faq9Q": "에세이와 자기소개서도 함께 준비할 수 있나요?",
  "benefit.faq9A":
    "네, 가능합니다. 해외 미대 지원에서는 포트폴리오만큼 에세이와 자기소개서도 중요합니다. 학생의 작업 방향, 지원 동기, 전공에 대한 이해도, 학교와의 적합성이 글 안에서 설득력 있게 드러나야 하기 때문입니다. 리그아트에서는 포트폴리오와 에세이가 따로 보이지 않도록, 학생의 전체 지원 스토리가 하나의 방향으로 연결될 수 있게 지도합니다.",
  "benefit.faq10Q": "수업은 소수정예로 진행되나요?",
  "benefit.faq10A":
    "네. 리그아트는 학생 개개인의 작업 방향을 깊이 있게 봐야 하는 포트폴리오 수업 특성상 소수정예 방식으로 운영됩니다. 학생마다 목표 학교, 전공, 현재 실력, 작업 성향이 모두 다르기 때문에 개별 피드백과 맞춤형 방향 설정을 중요하게 생각합니다.",
};

/** 편집기가 다루는 전체 키 목록 (API 화이트리스트 검증용). */
export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);
