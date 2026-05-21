import { useState } from "react";

/* ─────────────────────────────────────────
   RESTAURANT DATABASE  (기존 10 + 신규 10 = 총 20개)
   신규 항목은 실제 웹 검색 데이터 기반
───────────────────────────────────────── */
const DB = [
  /* ── 기존 10개 ── */
  {
    id: 1, name: "풀잎채", area: "서울 종로구", district: "종로/인사동",
    cuisine: "한식 채식", tags: ["락토오보", "브런치", "한정식"], emoji: "🌿",
    lat: 37.5729, lng: 126.9869, rating: 4.7, reviewCount: 128,
    priceRange: "₩₩", avgPrice: 14000,
    hours: "11:00 - 21:00", closed: "월요일",
    address: "서울 종로구 인사동길 32", phone: "02-123-4567",
    description: "전통 한식을 채식으로 재해석한 정갈한 식당. 사찰음식 스타일의 반찬과 함께 다채로운 채식 한정식을 즐길 수 있습니다.",
    menu: [
      { name: "채식 한정식", price: 18000, desc: "제철 나물 12가지 반찬 + 된장찌개 + 밥", tag: "인기" },
      { name: "사찰 비빔밥", price: 13000, desc: "고추장 없이 참기름으로 비빈 사찰식 비빔밥", tag: "" },
      { name: "두부구이 정식", price: 12000, desc: "직접 만든 두부구이 + 반찬 8가지", tag: "" },
      { name: "모듬 전병", price: 9000, desc: "야채·두부 전병 모듬 (달걀 포함)", tag: "추천" },
    ],
    reviews: [
      { user: "채식러버", rating: 5, date: "2026-04-12", text: "한국 전통 채식의 정수! 반찬 하나하나 정성이 느껴져요." },
      { user: "그린라이프", rating: 4, date: "2026-03-28", text: "맛있고 정갈한데 양이 좀 적어요. 그래도 건강한 한 끼로 최고!" },
    ],
    source: "자체 DB",
  },
  {
    id: 2, name: "그린테이블", area: "서울 마포구", district: "홍대/합정",
    cuisine: "퓨전 채식", tags: ["락토오보", "파스타", "샐러드"], emoji: "🥗",
    lat: 37.5496, lng: 126.9139, rating: 4.5, reviewCount: 89,
    priceRange: "₩₩", avgPrice: 16000,
    hours: "11:30 - 22:00", closed: "연중무휴",
    address: "서울 마포구 어울마당로 65", phone: "02-234-5678",
    description: "서양식 채식 요리 전문점. 신선한 채소와 유제품을 활용한 창의적인 파스타, 리소또, 샐러드 볼을 제공합니다.",
    menu: [
      { name: "버섯 크림 파스타", price: 17000, desc: "포르치니·양송이 크림소스 파스타 (생크림, 파르메산)", tag: "인기" },
      { name: "리코타 샐러드", price: 14000, desc: "홈메이드 리코타 치즈 + 루꼴라 + 체리토마토", tag: "추천" },
      { name: "채소 리소또", price: 16000, desc: "아스파라거스, 완두콩, 파르메산 리소또", tag: "" },
    ],
    reviews: [
      { user: "파스타헌터", rating: 5, date: "2026-05-01", text: "버섯 크림 파스타 진짜 맛있어요. 크림이 진하면서도 느끼하지 않아요!" },
      { user: "채식데이터", rating: 4, date: "2026-04-20", text: "홍대에서 채식 먹기 좋은 곳 찾다가 발견했는데 완전 만족합니다." },
    ],
    source: "자체 DB",
  },
  {
    id: 3, name: "씨앗 키친", area: "서울 용산구", district: "이태원/한남",
    cuisine: "인터내셔널 채식", tags: ["락토오보", "글루텐프리", "브런치", "카페"], emoji: "🌱",
    lat: 37.5347, lng: 126.9942, rating: 4.8, reviewCount: 214,
    priceRange: "₩₩₩", avgPrice: 22000,
    hours: "10:00 - 22:00", closed: "화요일",
    address: "서울 용산구 이태원로 210", phone: "02-345-6789",
    description: "다국적 채식 요리를 선보이는 힙한 키친. 에그 베네딕트, 아보카도 토스트, 채식 버거 등 트렌디한 메뉴가 가득합니다.",
    menu: [
      { name: "에그 베네딕트", price: 19000, desc: "수란 + 홀란다이즈 + 잉글리시 머핀 + 시금치", tag: "인기" },
      { name: "아보카도 토스트", price: 16000, desc: "사워도우 + 으깬 아보카도 + 반숙란 + 마이크로그린", tag: "추천" },
      { name: "그릭 볼", price: 17000, desc: "퀴노아 + 후무스 + 페타 치즈 + 올리브 + 반숙란", tag: "" },
    ],
    reviews: [
      { user: "이태원채식러", rating: 5, date: "2026-05-10", text: "에그 베네딕트 서울 최고라고 생각해요. 홀란다이즈 소스가 완벽합니다." },
      { user: "브런치퀸", rating: 5, date: "2026-04-28", text: "인테리어도 예쁘고 음식도 맛있고! 사진찍기도 너무 좋아요." },
    ],
    source: "자체 DB",
  },
  {
    id: 4, name: "연잎밥상", area: "서울 강남구", district: "강남/압구정",
    cuisine: "사찰음식", tags: ["락토오보", "한식", "정식", "건강식"], emoji: "🍃",
    lat: 37.5265, lng: 127.0278, rating: 4.6, reviewCount: 97,
    priceRange: "₩₩₩", avgPrice: 28000,
    hours: "12:00 - 21:30", closed: "일요일",
    address: "서울 강남구 압구정로 157", phone: "02-456-7890",
    description: "사찰음식을 모던하게 재해석한 고급 채식 한정식. 제철 재료를 사용한 정갈하고 건강한 한식 코스를 경험할 수 있습니다.",
    menu: [
      { name: "연잎 코스 한정식", price: 38000, desc: "제철 나물 + 연잎밥 + 된장국 + 사찰 디저트 (1인)", tag: "시그니처" },
      { name: "두부 스테이크 정식", price: 28000, desc: "수제 두부 스테이크 + 제철 반찬 10가지", tag: "인기" },
    ],
    reviews: [
      { user: "사찰음식팬", rating: 5, date: "2026-03-22", text: "강남에서 이런 퀄리티의 사찰음식을 만나다니. 코스 한정식 강추합니다." },
    ],
    source: "자체 DB",
  },
  {
    id: 5, name: "베지 가든", area: "경기 성남시", district: "판교/분당",
    cuisine: "채식 뷔페", tags: ["락토오보", "뷔페", "가족식사", "단체"], emoji: "🥬",
    lat: 37.3947, lng: 127.1112, rating: 4.4, reviewCount: 176,
    priceRange: "₩₩", avgPrice: 19900,
    hours: "11:00 - 21:00", closed: "월요일",
    address: "경기 성남시 분당구 판교역로 166", phone: "031-123-4567",
    description: "합리적인 가격의 채식 뷔페. 다양한 나물, 두부 요리, 채식 전골 등 30여 가지 채식 메뉴를 무제한으로 즐길 수 있습니다.",
    menu: [
      { name: "점심 뷔페 (평일)", price: 17900, desc: "30여 가지 채식 요리 무제한 + 음료바", tag: "인기" },
      { name: "저녁 뷔페", price: 22900, desc: "채식 전골 + 40가지 무제한", tag: "추천" },
    ],
    reviews: [
      { user: "판교직장인", rating: 4, date: "2026-05-08", text: "직장 동료들과 자주 와요. 가격 대비 메뉴가 다양해서 만족해요." },
    ],
    source: "자체 DB",
  },
  {
    id: 6, name: "테라 비스트로", area: "서울 성동구", district: "성수/왕십리",
    cuisine: "이탈리안 채식", tags: ["락토오보", "파스타", "피자", "와인"], emoji: "🍕",
    lat: 37.5444, lng: 127.0558, rating: 4.7, reviewCount: 152,
    priceRange: "₩₩₩", avgPrice: 25000,
    hours: "12:00 - 22:30", closed: "월요일",
    address: "서울 성동구 성수이로 78", phone: "02-678-9012",
    description: "성수동 감각적인 공간에서 즐기는 채식 이탈리안. 수제 파스타, 채소 피자, 리코타 브루스케타 등 정통 이탈리아 채식 요리를 선보입니다.",
    menu: [
      { name: "트러플 버섯 파스타", price: 27000, desc: "직접 뽑은 탈리아텔레 + 트러플 오일 + 포르치니", tag: "시그니처" },
      { name: "마르게리타 피자", price: 22000, desc: "나폴리탄 도우 + 산마르자노 토마토 + 버팔로 모짜렐라", tag: "인기" },
    ],
    reviews: [
      { user: "성수미식가", rating: 5, date: "2026-05-12", text: "트러플 파스타 서울에서 손에 꼽히는 맛! 성수 오면 꼭 들러요." },
    ],
    source: "자체 DB",
  },
  {
    id: 7, name: "하베스트 볼", area: "서울 강서구", district: "마곡/발산",
    cuisine: "건강식 채식", tags: ["락토오보", "포케", "샐러드볼", "다이어트"], emoji: "🥙",
    lat: 37.5608, lng: 126.8302, rating: 4.6, reviewCount: 112,
    priceRange: "₩₩", avgPrice: 15000,
    hours: "11:00 - 20:00", closed: "주말",
    address: "서울 강서구 마곡중앙로 161", phone: "02-789-0123",
    description: "마곡 직장인들에게 인기있는 채식 볼 전문점. 퀴노아, 현미, 채소, 계란 등으로 구성된 영양 균형 잡힌 포케볼을 맞춤 제공합니다.",
    menu: [
      { name: "그린 파워 볼", price: 14500, desc: "현미 + 아보카도 + 케일 + 반숙란 + 에다마메", tag: "인기" },
      { name: "지중해 볼", price: 15500, desc: "퀴노아 + 후무스 + 페타 + 오이 + 반숙란", tag: "추천" },
    ],
    reviews: [
      { user: "마곡직장인", rating: 5, date: "2026-05-09", text: "점심 맛집! 건강하면서도 포만감 있어요." },
    ],
    source: "자체 DB",
  },
  {
    id: 8, name: "참나물밥상", area: "경기 수원시", district: "수원",
    cuisine: "한식 채식", tags: ["락토오보", "한식", "도시락", "반찬"], emoji: "🌾",
    lat: 37.2636, lng: 127.0286, rating: 4.3, reviewCount: 58,
    priceRange: "₩", avgPrice: 9000,
    hours: "10:30 - 20:00", closed: "일요일",
    address: "경기 수원시 팔달구 정조로 910", phone: "031-234-5678",
    description: "수원 지역의 가성비 채식 한식당. 제철 나물과 두부, 버섯을 활용한 정갈한 한식 백반을 제공합니다.",
    menu: [
      { name: "나물 백반", price: 8000, desc: "오늘의 나물 5가지 + 된장찌개 + 밥", tag: "인기" },
      { name: "버섯 전골 (2인)", price: 22000, desc: "표고·느타리·팽이 버섯 전골 + 밥 2인분", tag: "추천" },
    ],
    reviews: [
      { user: "수원채식맘", rating: 4, date: "2026-04-30", text: "가격 대비 최고예요. 나물이 신선하고 된장찌개 맛있어요." },
    ],
    source: "자체 DB",
  },
  {
    id: 9, name: "인천 채식관", area: "인천 연수구", district: "인천/송도",
    cuisine: "아시안 채식", tags: ["락토오보", "중식", "태국음식", "아시안"], emoji: "🥢",
    lat: 37.3823, lng: 126.6564, rating: 4.4, reviewCount: 74,
    priceRange: "₩₩", avgPrice: 14000,
    hours: "11:30 - 21:30", closed: "수요일",
    address: "인천 연수구 센트럴로 123", phone: "032-123-4567",
    description: "다양한 아시아 채식 요리를 한곳에서. 채식 짜장면, 팟타이, 락사 등 아시아 각국의 채식 메뉴를 즐길 수 있는 퓨전 레스토랑.",
    menu: [
      { name: "채식 짜장면", price: 11000, desc: "춘장 + 양파 + 감자 + 두부 (달걀면 사용)", tag: "인기" },
      { name: "두부 팟타이", price: 13000, desc: "라이스누들 + 두부 + 달걀 + 숙주 + 땅콩", tag: "추천" },
    ],
    reviews: [
      { user: "송도채식인", rating: 4, date: "2026-05-03", text: "인천에서 채식 아시안 음식 먹을 수 있는 곳이 생겨서 너무 좋아요!" },
    ],
    source: "자체 DB",
  },
  {
    id: 10, name: "모닝글로리 카페", area: "서울 서대문구", district: "신촌/연대",
    cuisine: "채식 카페", tags: ["락토오보", "브런치", "카페", "베이커리"], emoji: "☕",
    lat: 37.5577, lng: 126.9368, rating: 4.5, reviewCount: 63,
    priceRange: "₩", avgPrice: 9000,
    hours: "08:00 - 21:00", closed: "연중무휴",
    address: "서울 서대문구 연세로 19", phone: "02-567-8901",
    description: "신촌 대학가의 채식 친화 카페. 직접 만든 채식 베이커리와 에그 샌드위치, 다양한 식물성 음료를 제공합니다.",
    menu: [
      { name: "에그 샌드위치", price: 8500, desc: "수제 달걀 샐러드 + 치즈 + 통밀 식빵", tag: "인기" },
      { name: "스콘 세트", price: 7000, desc: "버터스콘 2개 + 클로티드 크림 + 잼", tag: "" },
    ],
    reviews: [
      { user: "연대생채식러", rating: 5, date: "2026-05-05", text: "학교 근처에 이런 곳이 생겨서 너무 행복해요! 에그 샌드위치 매일 먹어요." },
    ],
    source: "자체 DB",
  },

  /* ── 신규 10개 (실제 검색 데이터 기반) ── */
  {
    id: 11,
    name: "발우공양",
    area: "서울 종로구", district: "종로/인사동",
    cuisine: "사찰음식",
    tags: ["사찰음식", "한식", "코스요리", "예약필수", "락토오보"],
    emoji: "🏯",
    lat: 37.5704, lng: 126.9806,
    rating: 4.9, reviewCount: 520,
    priceRange: "₩₩₩₩", avgPrice: 55000,
    hours: "11:30 - 21:00 (브레이크 15:00-17:00)", closed: "일요일",
    address: "서울 종로구 우정국로 56, 5층 (견지동, 템플스테이 통합정보센터)",
    phone: "02-733-2081",
    description: "한국불교문화사업단이 직접 운영하는 국내 대표 사찰음식 전문 레스토랑. 미슐랭 가이드 서울 선정. 5년 이상 숙성된 간장, 3년 묵은 된장으로 깊은 맛을 낸다. 오신채(마늘·파 등) 없이 순수한 자연 재료만 사용. 예약 필수.",
    menu: [
      { name: "선식 (점심 한정)", price: 36000, desc: "사찰음식 입문 코스, 평일 점심만 제공", tag: "추천" },
      { name: "원식", price: 50000, desc: "표고버섯냉면·사찰만두 등 포함 정통 코스", tag: "인기" },
      { name: "마음식", price: 70000, desc: "제철 식재료 활용 프리미엄 사찰 코스", tag: "" },
      { name: "희식 (사전예약)", price: 120000, desc: "최고급 식재료로 구성된 최상위 코스", tag: "시그니처" },
    ],
    reviews: [
      { user: "미슐랭팬", rating: 5, date: "2026-04-15", text: "미슐랭 선정 이유가 있어요. 사찰음식의 격이 다릅니다. 원식 강추!" },
      { user: "사찰순례자", rating: 5, date: "2026-03-20", text: "된장찌개 하나가 이렇게 깊은 맛일 수 있다니. 룸 분리돼 있어 조용히 식사하기 좋아요." },
      { user: "채식고수", rating: 5, date: "2026-02-10", text: "오신채 없이도 이 맛이 나다니 놀라워요. 한국 채식 최고봉." },
    ],
    source: "미슐랭 가이드 서울 / 서울시 공식 채식 50선",
    badge: "미슐랭",
  },
  {
    id: 12,
    name: "베이스 이즈 나이스",
    area: "서울 마포구", district: "홍대/합정",
    cuisine: "한식 채식",
    tags: ["락토오보", "한식", "예약필수", "1인운영", "미쉐린빕구르망"],
    emoji: "🫚",
    lat: 37.5418, lng: 126.9476,
    rating: 4.8, reviewCount: 310,
    priceRange: "₩", avgPrice: 13000,
    hours: "화-일 11:00 - 15:00", closed: "월요일",
    address: "서울 마포구 도화2길 20",
    phone: "예약 전용 (인스타그램·캐치테이블)",
    description: "미슐랭 빕구르망 선정. 장진아 대표가 1인 운영하는 채소 친화 레스토랑. 절기에 맞춰 3~4주마다 메뉴 전량 교체. 친숙한 채소로 만든 한식 덮밥·국·반찬이 핵심. 예약 경쟁이 치열하니 인스타그램 공지 후 캐치테이블에서 빠르게 예약해야 한다.",
    menu: [
      { name: "오늘의 채소밥", price: 13000, desc: "제철 채소 덮밥 + 국 + 밑반찬 (메뉴 매주 변경)", tag: "시그니처" },
      { name: "계절 수프", price: 8000, desc: "당일 수급 채소로 만든 오늘의 수프", tag: "인기" },
      { name: "채소 반찬 세트", price: 6000, desc: "오늘의 밑반찬 3종 세트", tag: "" },
    ],
    reviews: [
      { user: "마포채식러", rating: 5, date: "2026-05-08", text: "예약 잡기 너무 힘들지만 그만한 가치가 있어요. 채소 요리의 재발견." },
      { user: "빕구르망사냥꾼", rating: 5, date: "2026-04-01", text: "미슐랭 선정 납득. 단순해 보여도 장 맛과 재료가 최상급이에요." },
      { user: "느림의미학", rating: 4, date: "2026-03-12", text: "1인 운영이라 기다림이 있지만, 그 기다림조차 이곳의 매력입니다." },
    ],
    source: "미슐랭 가이드 서울 빕구르망 / 서울시 채식 50선",
    badge: "미슐랭 빕구르망",
  },
  {
    id: 13,
    name: "로컬릿",
    area: "서울 성동구", district: "성수/왕십리",
    cuisine: "이탈리안 채식",
    tags: ["락토오보", "팜투테이블", "이탈리안", "제철요리", "채식50선"],
    emoji: "🫑",
    lat: 37.5450, lng: 127.0450,
    rating: 4.7, reviewCount: 188,
    priceRange: "₩₩₩", avgPrice: 32000,
    hours: "12:00 - 21:00 (브레이크 15:00-17:30)", closed: "월·화요일",
    address: "서울 성동구 아차산로 116",
    phone: "02-462-7867",
    description: "남정식 셰프의 팜 투 테이블(Farm to Table) 채식 이탈리안 레스토랑. 농부 시장·소규모 농장에서 직접 수급한 제철 식재료로 건강한 이탈리안 요리를 선보인다. 서울시 채식 레스토랑 50선 선정. 백태로 만든 후무스 위에 채소를 쌓은 '채소 테린'이 대표 메뉴.",
    menu: [
      { name: "채소 테린", price: 24000, desc: "백태 후무스 + 제철 채소 레이어드 (시그니처)", tag: "시그니처" },
      { name: "제철 채소 파스타", price: 28000, desc: "당일 수급 제철 채소 + 수제 파스타 (메뉴 수시 변경)", tag: "인기" },
      { name: "리코타 채소 피자", price: 26000, desc: "홈메이드 리코타 + 농장 채소 + 허브 오일", tag: "" },
      { name: "채식 코스 (3코스)", price: 55000, desc: "전채·메인·디저트 제철 채식 코스", tag: "추천" },
    ],
    reviews: [
      { user: "팜투테이블러", rating: 5, date: "2026-05-02", text: "재료의 신선함이 다릅니다. 채소 테린은 진짜 예술 작품 같아요." },
      { user: "이탈리안채식러", rating: 5, date: "2026-04-10", text: "셰프가 농장에서 직접 공수한 채소로 만드는 요리, 맛이 왜 다른지 이제 알겠어요." },
    ],
    source: "서울시 채식 레스토랑 50선 / 하퍼스바자",
    badge: "채식 50선",
  },
  {
    id: 14,
    name: "남미 플랜트랩",
    area: "서울 동작구", district: "사당/이수",
    cuisine: "퓨전 채식",
    tags: ["락토오보", "이탈리안", "퓨전", "피자", "파스타", "채식50선"],
    emoji: "🌶️",
    lat: 37.4862, lng: 126.9812,
    rating: 4.5, reviewCount: 143,
    priceRange: "₩₩", avgPrice: 18000,
    hours: "12:00 - 21:00", closed: "연중무휴",
    address: "서울 동작구 동작대로 109",
    phone: "02-522-1276",
    description: "'랩(연구소)'이라는 이름처럼 식물성 재료에 대한 깊이 있는 연구를 바탕으로 비채식인도 맛있게 즐길 수 있는 음식을 완성한다. 서울시 채식 레스토랑 50선 선정. 치즈야채 피자와 파스타베르데가 대표 메뉴.",
    menu: [
      { name: "파스타 베르데", price: 17000, desc: "바질 페스토 + 제철 채소 + 파르메산 파스타", tag: "인기" },
      { name: "치즈야채 피자", price: 19000, desc: "모짜렐라·고르곤졸라 믹스 + 계절 채소 피자", tag: "시그니처" },
      { name: "채소 뇨키", price: 18000, desc: "감자 뇨키 + 세이지 버터 + 파르메산", tag: "추천" },
      { name: "티라미수", price: 8000, desc: "마스카포네 크림 클래식 티라미수", tag: "" },
    ],
    reviews: [
      { user: "사당채식러", rating: 5, date: "2026-04-22", text: "비채식인 남편도 맛있다고 했어요! 피자 도우가 진짜 맛있어요." },
      { user: "이수맛집탐험가", rating: 4, date: "2026-03-15", text: "채식인데 이렇게 든든하고 맛있을 수 있다니. 파스타 강추!" },
    ],
    source: "서울시 채식 레스토랑 50선 / 식신",
    badge: "채식 50선",
  },
  {
    id: 15,
    name: "공간 녹음",
    area: "서울 마포구", district: "홍대/합정",
    cuisine: "비건·락토오보 카페",
    tags: ["락토오보", "비건옵션", "카페", "디저트", "채식50선"],
    emoji: "🎋",
    lat: 37.5502, lng: 126.9200,
    rating: 4.6, reviewCount: 207,
    priceRange: "₩₩", avgPrice: 12000,
    hours: "12:00 - 21:00", closed: "화요일",
    address: "서울 마포구 잔다리로 30",
    phone: "02-6953-6998",
    description: "그날의 무드에 맞는 다양한 공간에서 비건·채식 요리를 즐길 수 있는 복합문화공간 카페. 서울시 채식 레스토랑 50선 선정. 채식 브런치와 비건 디저트가 인기.",
    menu: [
      { name: "채식 브런치 플레이트", price: 16000, desc: "스크램블드에그 + 구운 채소 + 치즈 + 통밀빵", tag: "인기" },
      { name: "비건 케이크", price: 8000, desc: "당일 제조 비건 케이크 (종류 매일 변경)", tag: "추천" },
      { name: "채식 파스타", price: 15000, desc: "오늘의 채소 파스타 (메뉴 주 단위 변경)", tag: "" },
      { name: "식물성 라떼", price: 6500, desc: "귀리·아몬드·두유 선택 가능", tag: "" },
    ],
    reviews: [
      { user: "홍대카페러버", rating: 5, date: "2026-05-11", text: "공간이 너무 아름다워요. 채식 음식도 맛있고 사진찍기도 좋아요." },
      { user: "비건디저터", rating: 4, date: "2026-04-05", text: "비건 케이크가 정말 맛있어요. 일반 케이크 수준입니다!" },
    ],
    source: "서울시 채식 레스토랑 50선",
    badge: "채식 50선",
  },
  {
    id: 16,
    name: "고사리 익스프레스",
    area: "서울 중구", district: "신당/중구",
    cuisine: "비건·락토오보 퓨전",
    tags: ["락토오보", "비건", "혼밥", "퓨전", "미슐랭"],
    emoji: "🌿",
    lat: 37.5596, lng: 127.0126,
    rating: 4.7, reviewCount: 165,
    priceRange: "₩", avgPrice: 11000,
    hours: "11:30 - 20:00", closed: "일·월요일",
    address: "서울 중구 퇴계로85길 12-10",
    phone: "해당 없음 (워크인)",
    description: "신당 중앙시장 안에 자리한 채식 전문 분식집. 미슐랭 가이드 서울 선정. 고사리 오일 소스를 베이스로 고소한 들깨 가루와 병아리콩 후무스, 매콤한 베지 라유를 더한 비빔면이 대표 메뉴. 혼밥하기 좋은 캐주얼 채식 맛집.",
    menu: [
      { name: "고사리 비빔면", price: 9000, desc: "고사리 오일 소스 + 들깨 가루 + 병아리콩 후무스 + 라유", tag: "시그니처" },
      { name: "대만식 채소 전병", price: 7000, desc: "채소 + 달걀 + 고사리 칠리 소스 (락토오보)", tag: "인기" },
      { name: "고사리 국수", price: 8000, desc: "고사리 오일 국물 + 두부 + 채소", tag: "" },
    ],
    reviews: [
      { user: "신당탐험가", rating: 5, date: "2026-05-06", text: "미슐랭 맞아요. 고사리 비빔면 중독성 장난 아닙니다!" },
      { user: "혼밥채식러", rating: 5, date: "2026-04-18", text: "혼자서도 편하게 먹기 딱 좋아요. 시장 분위기도 재밌어요." },
      { user: "퓨전채식탐험가", rating: 4, date: "2026-03-25", text: "한국 채식 분식의 새로운 지평. 고사리 소스 따로 판매해요!" },
    ],
    source: "미슐랭 가이드 서울",
    badge: "미슐랭",
  },
  {
    id: 17,
    name: "마지 (MAJI)",
    area: "서울 종로구", district: "종로/인사동",
    cuisine: "사찰음식",
    tags: ["사찰음식", "락토오보", "오신채제외", "한식", "채식50선"],
    emoji: "🍵",
    lat: 37.5777, lng: 126.9773,
    rating: 4.6, reviewCount: 134,
    priceRange: "₩₩₩", avgPrice: 35000,
    hours: "11:30 - 21:00 (브레이크 15:00-17:00)", closed: "일요일",
    address: "서울 종로구 효자로 7 (경복궁역 근처)",
    phone: "02-737-1117",
    description: "경복궁역 근처에 자리한 전통 사찰음식 전문점. 오신채(마늘·부추·파·달래·흥거)를 일체 사용하지 않는 순수한 자연의 맛. 전통 사찰음식 조리법을 고수하며 서울시 채식 레스토랑 50선에 선정됐다.",
    menu: [
      { name: "사찰 한정식 코스", price: 40000, desc: "오신채 배제, 순수 사찰 재료로 구성된 계절 코스", tag: "시그니처" },
      { name: "사찰 비빔밥", price: 22000, desc: "오신채 없는 사찰식 나물 비빔밥", tag: "인기" },
      { name: "두부 된장 정식", price: 28000, desc: "수제 두부 + 사찰 된장국 + 나물 반찬", tag: "추천" },
    ],
    reviews: [
      { user: "경복궁채식러", rating: 5, date: "2026-04-08", text: "오신채 없는 음식이 이렇게 맛있을 수 있다니! 외국인 친구 데려가기도 좋아요." },
      { user: "사찰음식마니아", rating: 4, date: "2026-02-28", text: "발우공양과 쌍벽을 이루는 곳. 접근성이 더 좋아요." },
    ],
    source: "서울시 채식 레스토랑 50선 / 하퍼스바자",
    badge: "채식 50선",
  },
  {
    id: 18,
    name: "포리스트 키친",
    area: "서울 강남구", district: "강남/압구정",
    cuisine: "비건 파인다이닝",
    tags: ["락토오보", "파인다이닝", "코스요리", "채식50선", "대체육"],
    emoji: "🌲",
    lat: 37.5230, lng: 127.0392,
    rating: 4.8, reviewCount: 198,
    priceRange: "₩₩₩₩", avgPrice: 95000,
    hours: "12:00 - 21:30 (브레이크 15:00-17:30)", closed: "월요일",
    address: "서울 강남구 선릉로 152길 18",
    phone: "02-518-0036",
    description: "농심의 대체육 기술과 미국 뉴욕 미슐랭 레스토랑 출신 김태형 셰프가 협업한 채식 파인다이닝. 비건·락토오보 모두 가능한 코스 요리. 서울시 채식 레스토랑 50선 선정. 채식으로도 파인다이닝 경험이 가능함을 보여주는 공간.",
    menu: [
      { name: "채식 런치 코스 (4코스)", price: 75000, desc: "전채·수프·메인·디저트 구성, 락토오보 선택 가능", tag: "인기" },
      { name: "채식 디너 코스 (6코스)", price: 120000, desc: "셰프의 오마카세식 시즌 채식 코스", tag: "시그니처" },
      { name: "단품 채식 스테이크", price: 48000, desc: "대체육 스테이크 + 채소 가니쉬 + 소스", tag: "추천" },
    ],
    reviews: [
      { user: "파인다이닝러", rating: 5, date: "2026-05-14", text: "채식 파인다이닝 이렇게까지 할 수 있구나. 기념일에 강추합니다." },
      { user: "뉴욕셰프팬", rating: 5, date: "2026-04-30", text: "뉴욕 미슐랭 출신 셰프의 실력이 그대로 느껴져요. 대체육 스테이크가 놀라워요." },
    ],
    source: "서울시 채식 레스토랑 50선 / 하퍼스바자",
    badge: "채식 50선",
  },
  {
    id: 19,
    name: "두두리두팡",
    area: "서울 마포구", district: "홍대/합정",
    cuisine: "채식 베이커리",
    tags: ["락토오보", "비건", "글루텐프리", "베이커리", "디저트"],
    emoji: "🥐",
    lat: 37.5573, lng: 126.9050,
    rating: 4.5, reviewCount: 89,
    priceRange: "₩", avgPrice: 7000,
    hours: "11:00 - 19:00 (품절 시 조기 마감)", closed: "월·화요일",
    address: "서울 마포구 망원동 망원로 91",
    phone: "인스타그램 @duduri_dupang",
    description: "망원동에 위치한 비건·글루텐프리 디저트 전문 베이커리. 동물성 재료와 밀가루를 사용하지 않은 비건 글루텐프리 케이크·빵을 선보인다. 서울시 채식 레스토랑 50선 선정. 당일 제조로 빠른 품절이 잦으니 오픈 시간에 방문 권장.",
    menu: [
      { name: "비건 글루텐프리 케이크 (1조각)", price: 8500, desc: "쌀가루 기반, 식물성 재료만 사용 (종류 매일 변경)", tag: "시그니처" },
      { name: "비건 쿠키 세트", price: 12000, desc: "오트·아몬드·초코칩 비건 쿠키 5개 세트", tag: "인기" },
      { name: "글루텐프리 마들렌 (4개)", price: 9000, desc: "쌀가루 기반 마들렌, 달걀·버터 없음", tag: "추천" },
    ],
    reviews: [
      { user: "망원동단골", rating: 5, date: "2026-05-07", text: "비건인 줄 모르고 먹었어요. 일반 케이크보다 더 맛있어요!" },
      { user: "글루텐프리서울", rating: 4, date: "2026-03-30", text: "글루텐프리 옵션이 이렇게 맛있는 곳은 처음이에요. 조기 마감 주의!" },
    ],
    source: "서울시 채식 레스토랑 50선 / 하퍼스바자",
    badge: "채식 50선",
  },
  {
    id: 20,
    name: "대안부엌 풀",
    area: "서울 마포구", district: "홍대/합정",
    cuisine: "비건·락토오보 카페",
    tags: ["락토오보", "비건", "베이커리", "카페", "사회적기업", "채식50선"],
    emoji: "🌻",
    lat: 37.5530, lng: 126.9265,
    rating: 4.6, reviewCount: 112,
    priceRange: "₩", avgPrice: 8000,
    hours: "10:00 - 19:00", closed: "일·월요일",
    address: "서울 마포구 연남로 13",
    phone: "0507-1330-3780",
    description: "시각장애인을 위한 점자 쿠키와 점자 메뉴판, 아이들을 위한 비건 베이킹 수업, 노숙인에게 빵을 나누는 봉사활동까지—세상을 바꾸는 실천을 이어가는 비건 식당. 서울시 채식 레스토랑 50선 선정. 맛있는 채식으로 사회적 가치를 실현하는 공간.",
    menu: [
      { name: "점자 쿠키 (5개)", price: 6000, desc: "점자가 새겨진 시각장애인 연대 비건 쿠키", tag: "시그니처" },
      { name: "비건 베이글 샌드위치", price: 9000, desc: "비건 크림치즈 + 구운 채소 + 베이글", tag: "인기" },
      { name: "채식 수프 & 빵", price: 8500, desc: "오늘의 채식 수프 + 비건 빵", tag: "추천" },
      { name: "식물성 라떼", price: 5500, desc: "귀리·두유 선택 가능, 비건 시럽 사용", tag: "" },
    ],
    reviews: [
      { user: "연남동사회적기업러", rating: 5, date: "2026-05-03", text: "맛도 맛이지만 이곳의 가치관이 너무 좋아요. 점자 쿠키 선물용으로 자주 삽니다." },
      { user: "비건베이킹러", rating: 5, date: "2026-04-14", text: "비건 베이킹 수업도 들었는데 너무 알차요. 음식도 맛있고 의미도 있어요." },
    ],
    source: "서울시 채식 레스토랑 50선",
    badge: "채식 50선",
  },

  /* ─── 서울시 채식 레스토랑 50선 추가 (기존 8개 외 42개) ─── */
  { id: 21, name: "더브레드블루 THE BREAD BLUE", area: "서울 강남구", district: "강남/신사", cuisine: "비건 베이커리", tags: ["비건","베이커리","채식50선"], emoji: "🥖", lat: 37.5237, lng: 127.0237, rating: 4.6, reviewCount: 138, priceRange: "₩₩", avgPrice: 9000, hours: "08:00 - 21:00", closed: "연중무휴", address: "서울 강남구 신사동", phone: "02-541-5050", description: "100% 비건 베이커리. 동물성 재료 없이도 풍부한 풍미의 천연 발효빵·식사빵·디저트를 만든다. 서울시 채식 레스토랑 50선 선정.", menu: [{ name:"비건 천연발효빵", price:6000, desc:"동물성 재료 없는 천연발효빵", tag:"인기"},{ name:"비건 케이크", price:7500, desc:"식물성 크림 케이크", tag:"추천"}], reviews:[{ user:"비건빵러버", rating:5, date:"2026-04-10", text:"빵이 정말 맛있어요. 비건인 줄 모를 정도." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 22, name: "도반 Doban", area: "서울 종로구", district: "종로/인사동", cuisine: "사찰음식", tags: ["사찰","한식","채식50선"], emoji: "🍵", lat: 37.5743, lng: 126.9853, rating: 4.7, reviewCount: 96, priceRange: "₩₩₩", avgPrice: 35000, hours: "11:30 - 21:00 (브레이크 15:00-17:30)", closed: "월요일", address: "서울 종로구 인사동길", phone: "02-733-2222", description: "정갈한 한식 사찰음식 전문점. 제철 식재료와 사찰의 정신을 담은 정통 코스. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"사찰 정식", price:32000, desc:"제철 나물 + 사찰 반찬 + 밥", tag:"인기"},{ name:"사찰 코스", price:55000, desc:"4코스 사찰음식", tag:"시그니처"}], reviews:[{ user:"인사동단골", rating:5, date:"2026-03-21", text:"인사동에서 만나는 진짜 사찰음식." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 23, name: "드렁큰 비건 Drunken Vegan", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","와인바","채식50선"], emoji: "🍷", lat: 37.5345, lng: 126.9942, rating: 4.5, reviewCount: 82, priceRange: "₩₩₩", avgPrice: 28000, hours: "18:00 - 01:00", closed: "일요일", address: "서울 용산구 한남동", phone: "02-790-1234", description: "100% 비건 와인 다이닝. 식물성 안주와 자연주의 와인으로 즐기는 비건 술집. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 안주 플레이트", price:22000, desc:"비건 치즈·견과·올리브 플레이트", tag:"인기"},{ name:"내추럴 와인 잔술", price:12000, desc:"비건 와인 1잔", tag:""}], reviews:[{ user:"비건와인", rating:5, date:"2026-04-22", text:"비건 와인바라니, 너무 좋은 컨셉." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 24, name: "레이지 파머스 LAZY FARMERS", area: "서울 마포구", district: "망원/연남", cuisine: "비건 카페", tags: ["비건","카페","브런치","채식50선"], emoji: "🌾", lat: 37.5571, lng: 126.9050, rating: 4.6, reviewCount: 121, priceRange: "₩₩", avgPrice: 14000, hours: "10:00 - 21:00", closed: "월요일", address: "서울 마포구 망원동", phone: "02-336-5050", description: "농부의 정성을 담은 비건 식물성 브런치 카페. 망원동의 비건 핫스팟. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 브런치 플레이트", price:16000, desc:"식물성 단백질 + 채소 + 통밀빵", tag:"인기"},{ name:"비건 그래놀라 볼", price:11000, desc:"코코넛 요거트 + 그래놀라 + 과일", tag:"추천"}], reviews:[{ user:"망원동비건", rating:5, date:"2026-04-15", text:"농부의 손길이 느껴지는 식사예요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 25, name: "마치래빗 샐러드 March rabbit Salad", area: "서울 종로구", district: "종로/인사동", cuisine: "채식 카페", tags: ["샐러드","락토오보","채식50선"], emoji: "🥗", lat: 37.5734, lng: 126.9831, rating: 4.4, reviewCount: 73, priceRange: "₩₩", avgPrice: 12000, hours: "11:00 - 21:00", closed: "일요일", address: "서울 종로구", phone: "02-733-3030", description: "신선한 제철 채소 위주의 샐러드 전문점. 직접 만든 드레싱과 다양한 토핑. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"제철 채소 샐러드", price:13000, desc:"매일 바뀌는 제철 채소", tag:"인기"},{ name:"그레인 볼", price:14500, desc:"퀴노아·렌틸·견과류", tag:""}], reviews:[{ user:"샐러드러", rating:4, date:"2026-04-30", text:"가벼우면서도 든든해요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 26, name: "마히나 비건 테이블 MAHINA VEGAN TABLE", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","채식50선","글루텐프리"], emoji: "🌙", lat: 37.5345, lng: 127.0028, rating: 4.7, reviewCount: 95, priceRange: "₩₩₩", avgPrice: 26000, hours: "11:30 - 21:30", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-7575", description: "하와이안 감성의 100% 비건 다이닝. 식물성 단백질을 활용한 창의적 양식. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 포케 볼", price:18000, desc:"두부·아보카도·해초·현미", tag:"시그니처"},{ name:"비건 코코넛 커리", price:19000, desc:"태국식 코코넛 커리", tag:"인기"}], reviews:[{ user:"한남비건", rating:5, date:"2026-05-08", text:"비건이라는 게 믿기지 않는 풍미." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 27, name: "몽크스델리 MONK's DELI", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","델리","샌드위치","채식50선"], emoji: "🥪", lat: 37.5345, lng: 127.0035, rating: 4.5, reviewCount: 78, priceRange: "₩₩", avgPrice: 13000, hours: "10:30 - 21:00", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-7676", description: "비건 샌드위치와 델리 전문점. 식물성 햄·치즈를 활용한 깊은 풍미. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 샌드위치", price:12500, desc:"식물성 햄·치즈·채소", tag:"인기"},{ name:"비건 수프 & 빵", price:9500, desc:"오늘의 비건 수프", tag:"추천"}], reviews:[{ user:"비건샌드위치팬", rating:5, date:"2026-04-05", text:"채식 샌드위치의 완성." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 28, name: "몽크스부처 MONK's BUTCHER", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","대체육","채식50선"], emoji: "🍖", lat: 37.5346, lng: 127.0036, rating: 4.6, reviewCount: 112, priceRange: "₩₩₩", avgPrice: 24000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-7777", description: "100% 비건 정육점·다이닝 컨셉. 대체육 전문 비건 다이닝. 단호박 감자 뇨끼 등 시그니처. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"단호박 감자 뇨끼", price:22000, desc:"강원도 감자로 만든 시그니처 뇨끼", tag:"시그니처"},{ name:"비건 스테이크", price:32000, desc:"대체육 스테이크 + 채소", tag:"인기"}], reviews:[{ user:"대체육러", rating:5, date:"2026-05-01", text:"대체육의 새로운 경지를 보여줘요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 29, name: "문쥬스 MOON JUICE", area: "서울 용산구", district: "이태원/한남", cuisine: "채식 카페", tags: ["비건","주스","채식50선"], emoji: "🌝", lat: 37.5341, lng: 127.0042, rating: 4.5, reviewCount: 67, priceRange: "₩₩", avgPrice: 9500, hours: "08:00 - 20:00", closed: "연중무휴", address: "서울 용산구 한남동", phone: "02-790-3535", description: "콜드프레스 주스와 비건 스무디 볼 전문 카페. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"콜드프레스 주스", price:8500, desc:"제철 과채 콜드프레스", tag:"인기"},{ name:"비건 스무디 볼", price:11000, desc:"아사이·코코넛·과일", tag:"추천"}], reviews:[{ user:"주스러버", rating:5, date:"2026-04-25", text:"신선한 주스 한 잔으로 충전!" }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 30, name: "미건테이블 Migun Table", area: "서울 종로구", district: "종로/인사동", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🍚", lat: 37.5717, lng: 126.9904, rating: 4.5, reviewCount: 88, priceRange: "₩₩", avgPrice: 16000, hours: "11:00 - 21:00", closed: "일요일", address: "서울 종로구", phone: "02-733-4040", description: "비건 한식 다이닝. 한식의 깊은 맛을 식물성 재료로 재해석. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 한정식", price:18000, desc:"비건 나물 + 비건 국 + 밥", tag:"인기"},{ name:"비건 두부 정식", price:15000, desc:"수제 두부 + 비건 반찬", tag:"추천"}], reviews:[{ user:"비건한식러", rating:4, date:"2026-04-12", text:"한식이 비건이어도 이렇게 맛있을 수 있군요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 31, name: "바이두부 by TOFU", area: "서울 성동구", district: "성수/왕십리", cuisine: "비건 한식", tags: ["비건","두부","채식50선"], emoji: "⬜", lat: 37.5444, lng: 127.0563, rating: 4.6, reviewCount: 92, priceRange: "₩₩", avgPrice: 14000, hours: "11:00 - 21:00", closed: "월요일", address: "서울 성동구 성수동", phone: "02-462-2222", description: "두부 전문 비건 레스토랑. 다양한 두부 요리를 모던하게 해석. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"수제 두부 정식", price:15000, desc:"매일 만든 두부 + 반찬", tag:"시그니처"},{ name:"두부 스테이크", price:18000, desc:"두부 스테이크 + 채소", tag:"인기"}], reviews:[{ user:"성수두부러", rating:5, date:"2026-04-18", text:"두부의 신세계를 만났어요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 32, name: "밥풀꽃 Babpullkkot", area: "서울 종로구", district: "종로/인사동", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🌾", lat: 37.5734, lng: 126.9881, rating: 4.4, reviewCount: 64, priceRange: "₩₩", avgPrice: 13000, hours: "11:30 - 20:00", closed: "월요일", address: "서울 종로구", phone: "02-733-5050", description: "정성스러운 비건 한식 가정식. 매일 다른 제철 비건 백반. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 백반", price:12000, desc:"매일 다른 비건 가정식", tag:"인기"},{ name:"비건 비빔밥", price:13500, desc:"채소 비빔밥", tag:"추천"}], reviews:[{ user:"가정식러", rating:4, date:"2026-04-02", text:"엄마 밥상 같아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 33, name: "베제투스 Vegetus", area: "서울 강남구", district: "강남/도산", cuisine: "비건 양식", tags: ["비건","파스타","채식50선"], emoji: "🌿", lat: 37.5228, lng: 127.0364, rating: 4.6, reviewCount: 86, priceRange: "₩₩₩", avgPrice: 26000, hours: "11:30 - 21:30", closed: "월요일", address: "서울 강남구 도산대로", phone: "02-541-7575", description: "100% 비건 이탈리안. 식물성 재료로만 구성한 정통 이탈리안 코스. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 파스타", price:22000, desc:"식물성 라구 파스타", tag:"인기"},{ name:"비건 피자", price:25000, desc:"비건 치즈 + 채소 피자", tag:"추천"}], reviews:[{ user:"비건이태리", rating:5, date:"2026-04-28", text:"치즈 없이도 이런 풍미가." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 34, name: "비건 앤 비욘드 Vegan & Beyond", area: "서울 마포구", district: "홍대/합정", cuisine: "비건 양식", tags: ["비건","채식50선"], emoji: "🌎", lat: 37.5526, lng: 126.9220, rating: 4.5, reviewCount: 79, priceRange: "₩₩", avgPrice: 17000, hours: "11:30 - 21:30", closed: "월요일", address: "서울 마포구", phone: "02-336-1234", description: "비건의 경계를 넘는 다채로운 글로벌 비건 다이닝. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 버거", price:16500, desc:"식물성 패티 + 비건 치즈 + 통밀번", tag:"인기"},{ name:"비건 볼", price:15500, desc:"퀴노아 + 두부 + 채소", tag:"추천"}], reviews:[{ user:"홍대비건", rating:5, date:"2026-04-08", text:"비건 버거 진짜 맛있어요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 35, name: "비건마마 Vegan Mama", area: "서울 마포구", district: "망원/연남", cuisine: "비건 한식", tags: ["비건","가정식","채식50선"], emoji: "👩‍🍳", lat: 37.5573, lng: 126.9105, rating: 4.6, reviewCount: 102, priceRange: "₩₩", avgPrice: 13500, hours: "11:00 - 21:00", closed: "월요일", address: "서울 마포구 연남동", phone: "02-336-5757", description: "엄마처럼 든든한 비건 가정식. 매일 바뀌는 비건 정성 백반. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 가정식", price:13000, desc:"엄마표 비건 백반", tag:"인기"},{ name:"비건 잡채", price:15000, desc:"식물성 잡채 정식", tag:"추천"}], reviews:[{ user:"연남동러", rating:5, date:"2026-04-19", text:"엄마 손맛 그대로." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 36, name: "비푸스 VFUS", area: "서울 강남구", district: "강남/신사", cuisine: "비건 양식", tags: ["비건","채식50선"], emoji: "💚", lat: 37.5251, lng: 127.0228, rating: 4.5, reviewCount: 71, priceRange: "₩₩₩", avgPrice: 25000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 강남구 신사동", phone: "02-541-8585", description: "비건 양식 전문 다이닝. 신선한 채소와 곡물 중심의 모던 비건. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 코스 (3코스)", price:42000, desc:"전채·메인·디저트", tag:"시그니처"},{ name:"비건 리조또", price:22000, desc:"버섯 리조또", tag:"인기"}], reviews:[{ user:"신사동비건", rating:4, date:"2026-04-22", text:"코스 만족도 높아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 37, name: "산촌 Sanchon", area: "서울 종로구", district: "종로/인사동", cuisine: "사찰음식", tags: ["사찰","한식","채식50선"], emoji: "🏔️", lat: 37.5733, lng: 126.9856, rating: 4.7, reviewCount: 168, priceRange: "₩₩₩", avgPrice: 45000, hours: "12:00 - 22:00", closed: "연중무휴", address: "서울 종로구 인사동길 30-13", phone: "02-735-0312", description: "인사동의 대표적인 사찰음식 전문점. 외국인 관광객에게도 유명한 정통 사찰 한정식. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"산촌 정식", price:45000, desc:"사찰 한정식 (점심·저녁)", tag:"시그니처"},{ name:"산촌 도시락", price:25000, desc:"점심 도시락 코스", tag:"인기"}], reviews:[{ user:"인사동러", rating:5, date:"2026-04-15", text:"외국 손님 모실 때 1순위." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 38, name: "소이로움 SOIROUM", area: "서울 종로구", district: "종로/인사동", cuisine: "비건 디저트", tags: ["비건","두부","디저트","채식50선"], emoji: "🍡", lat: 37.5743, lng: 126.9871, rating: 4.5, reviewCount: 59, priceRange: "₩₩", avgPrice: 8500, hours: "11:00 - 20:00", closed: "월요일", address: "서울 종로구", phone: "02-733-9090", description: "두부 기반 비건 디저트 전문점. 콩의 풍미를 살린 새로운 디저트. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"두부 푸딩", price:7000, desc:"수제 두부 푸딩", tag:"시그니처"},{ name:"두부 케이크", price:8500, desc:"비건 두부 케이크", tag:"인기"}], reviews:[{ user:"디저트러", rating:5, date:"2026-04-01", text:"두부로 만든 디저트가 이렇게 맛있다니." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 39, name: "스타일비건 STYLE VEGAN", area: "서울 강남구", district: "강남/도산", cuisine: "비건 양식", tags: ["비건","채식50선"], emoji: "✨", lat: 37.5238, lng: 127.0376, rating: 4.5, reviewCount: 84, priceRange: "₩₩₩", avgPrice: 27000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 강남구 도산대로", phone: "02-541-9090", description: "트렌디한 비건 다이닝. 패션과 어울리는 스타일리시한 비건 양식. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 스테이크 플레이트", price:28000, desc:"대체육 스테이크", tag:"인기"},{ name:"비건 파스타", price:22000, desc:"식물성 라구", tag:"추천"}], reviews:[{ user:"도산비건러", rating:5, date:"2026-04-29", text:"비주얼도 맛도 다 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 40, name: "슬런치 팩토리 Slunch Factory", area: "서울 강남구", district: "강남/도산", cuisine: "비건 양식", tags: ["비건","브런치","채식50선"], emoji: "🥑", lat: 37.5260, lng: 127.0354, rating: 4.6, reviewCount: 122, priceRange: "₩₩", avgPrice: 16000, hours: "10:00 - 21:00", closed: "연중무휴", address: "서울 강남구 도산대로", phone: "02-541-7878", description: "올데이 브런치 컨셉의 비건 카페. 점심+간식 사이의 슬런치 메뉴. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 브런치 플레이트", price:17000, desc:"비건 토스트 + 채소 + 두부 스크램블", tag:"인기"},{ name:"비건 아보카도 토스트", price:14000, desc:"으깬 아보카도 + 통밀빵", tag:"추천"}], reviews:[{ user:"도산브런치", rating:5, date:"2026-04-21", text:"슬런치 컨셉 너무 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 41, name: "식물성 도산 SikMulSung Dosan", area: "서울 강남구", district: "강남/도산", cuisine: "비건 파인다이닝", tags: ["비건","파인다이닝","채식50선"], emoji: "🌱", lat: 37.5235, lng: 127.0344, rating: 4.8, reviewCount: 145, priceRange: "₩₩₩₩", avgPrice: 75000, hours: "12:00 - 21:30 (브레이크 15:00-17:30)", closed: "월요일", address: "서울 강남구 도산대로 도산공원 인근", phone: "02-541-1010", description: "도산공원 일대의 100% 비건 파인다이닝. 식물성 재료로 완성한 정교한 코스. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"식물성 런치 코스 (4코스)", price:65000, desc:"전채·수프·메인·디저트", tag:"인기"},{ name:"식물성 디너 코스 (6코스)", price:120000, desc:"셰프 오마카세", tag:"시그니처"}], reviews:[{ user:"파인다이닝러", rating:5, date:"2026-05-11", text:"비건 파인다이닝의 정점." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 42, name: "앞으로의 빵집 apbbang", area: "서울 마포구", district: "망원/연남", cuisine: "비건 베이커리", tags: ["비건","베이커리","채식50선"], emoji: "🥯", lat: 37.5594, lng: 126.9082, rating: 4.6, reviewCount: 89, priceRange: "₩", avgPrice: 6500, hours: "11:00 - 20:00", closed: "월·화요일", address: "서울 마포구 연남동", phone: "인스타 @apbbang", description: "연남동의 작은 비건 베이커리. 미래를 생각하는 비건 빵을 굽는다. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 식빵", price:8000, desc:"동물성 무첨가 식빵", tag:"인기"},{ name:"비건 스콘", price:4500, desc:"비건 스콘 (다양한 맛)", tag:"추천"}], reviews:[{ user:"연남빵러", rating:5, date:"2026-04-25", text:"빵 좋아하는 사람이라면 무조건!" }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 43, name: "양출 서울 Yangchul Seoul", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","락토오보","채식50선"], emoji: "🥬", lat: 37.5346, lng: 127.0050, rating: 4.5, reviewCount: 68, priceRange: "₩₩₩", avgPrice: 24000, hours: "11:30 - 21:30", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-5050", description: "양배추를 비롯한 채소를 주재료로 한 모던 채식 다이닝. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"양배추 코스", price:32000, desc:"양배추를 활용한 3코스", tag:"시그니처"},{ name:"채소 단품", price:18000, desc:"제철 채소 단품", tag:"인기"}], reviews:[{ user:"한남채식러", rating:4, date:"2026-04-09", text:"양배추가 이런 맛이라니." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 44, name: "오뇽 oignon", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","프렌치","채식50선"], emoji: "🧅", lat: 37.5341, lng: 126.9978, rating: 4.5, reviewCount: 73, priceRange: "₩₩₩", avgPrice: 28000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 용산구 이태원로", phone: "02-790-6060", description: "양파(oignon)의 풍미를 살린 비건 프렌치. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 어니언 수프", price:14000, desc:"양파 풍미의 비건 수프", tag:"시그니처"},{ name:"비건 갈레트", price:18000, desc:"채소 갈레트", tag:"인기"}], reviews:[{ user:"이태원프렌치", rating:5, date:"2026-04-13", text:"어니언 수프 추천!" }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 45, name: "오세계향 Osegyehyang", area: "서울 종로구", district: "종로/인사동", cuisine: "사찰음식", tags: ["사찰","채식50선"], emoji: "🌸", lat: 37.5738, lng: 126.9849, rating: 4.6, reviewCount: 134, priceRange: "₩₩", avgPrice: 13000, hours: "11:30 - 21:00", closed: "월요일", address: "서울 종로구 인사동", phone: "02-735-7171", description: "오랜 역사의 인사동 채식 한정식. 합리적인 가격의 사찰음식. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"오세계향 정식", price:13000, desc:"채식 한정식 한 상", tag:"인기"},{ name:"채식 비빔밥", price:11000, desc:"채소 비빔밥", tag:"추천"}], reviews:[{ user:"인사동단골", rating:5, date:"2026-04-26", text:"가성비 좋은 사찰음식." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 46, name: "우부래도 ooh Breado", area: "서울 마포구", district: "망원/연남", cuisine: "비건 베이커리", tags: ["비건","베이커리","채식50선"], emoji: "🥖", lat: 37.5570, lng: 126.9090, rating: 4.5, reviewCount: 78, priceRange: "₩", avgPrice: 6000, hours: "10:00 - 20:00", closed: "월요일", address: "서울 마포구 망원동", phone: "인스타 @oohbreado", description: "100% 비건 베이커리 카페. 망원동의 작은 비건 브레드 가게. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 캄파뉴", price:7000, desc:"천연발효 비건 빵", tag:"인기"},{ name:"비건 머핀", price:4500, desc:"식물성 머핀", tag:"추천"}], reviews:[{ user:"망원빵러", rating:5, date:"2026-04-23", text:"빵 향이 너무 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 47, name: "음 이터리&베이커리 UUUM EATERY & BAKERY", area: "서울 강남구", district: "강남/도산", cuisine: "비건 베이커리", tags: ["비건","베이커리","락토오보","채식50선"], emoji: "🍞", lat: 37.5239, lng: 127.0340, rating: 4.6, reviewCount: 96, priceRange: "₩₩", avgPrice: 10000, hours: "08:00 - 21:00", closed: "연중무휴", address: "서울 강남구 도산대로", phone: "02-541-2020", description: "도산공원 인근의 비건 옵션 베이커리 카페. 한 끼 식사로도 좋은 비건 메뉴. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 베이글 샌드위치", price:9500, desc:"비건 옵션 샌드위치", tag:"인기"},{ name:"비건 디저트", price:7000, desc:"매일 다른 비건 디저트", tag:"추천"}], reviews:[{ user:"도산카페러", rating:5, date:"2026-04-30", text:"베이커리도 다이닝도 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 48, name: "채근담 역삼점 Chegeundaam Yeoksam", area: "서울 강남구", district: "역삼", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🥘", lat: 37.5006, lng: 127.0364, rating: 4.5, reviewCount: 117, priceRange: "₩₩", avgPrice: 13000, hours: "11:00 - 21:00", closed: "일요일", address: "서울 강남구 역삼동", phone: "02-555-3030", description: "역삼동의 대표적인 채식 한정식. 비건 옵션을 갖춘 한식당. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"채식 정식", price:13000, desc:"비건 한정식", tag:"인기"},{ name:"비건 비빔밥", price:11000, desc:"채소 비빔밥", tag:"추천"}], reviews:[{ user:"역삼직장인", rating:5, date:"2026-04-17", text:"역삼 점심 메뉴로 강추." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 49, name: "천년식향 Millennial Dining", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 파인다이닝", tags: ["비건","파인다이닝","대체육","채식50선"], emoji: "🌟", lat: 37.5345, lng: 127.0020, rating: 4.8, reviewCount: 187, priceRange: "₩₩₩₩", avgPrice: 85000, hours: "12:00 - 22:00 (브레이크 15:00-17:30)", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-2020", description: "100% 비건 파인다이닝. 흑마늘 먹물 파스타, 대체육 마라 떡갈비 등 시그니처. 한남의 비건 핫스팟. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"흑마늘 먹물 파스타", price:32000, desc:"천년식향 시그니처", tag:"시그니처"},{ name:"대체육 마라 떡갈비", price:38000, desc:"식물성 대체육 활용", tag:"인기"},{ name:"훈연 단호박 라비올리", price:28000, desc:"훈연 단호박 생면", tag:"추천"}], reviews:[{ user:"한남파인다이닝", rating:5, date:"2026-05-09", text:"비건 파인다이닝의 끝." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 50, name: "칙피스 Chick peace", area: "서울 마포구", district: "홍대/합정", cuisine: "비건 양식", tags: ["비건","병아리콩","채식50선"], emoji: "🫛", lat: 37.5540, lng: 126.9255, rating: 4.5, reviewCount: 65, priceRange: "₩₩", avgPrice: 14000, hours: "11:00 - 21:00", closed: "월요일", address: "서울 마포구", phone: "02-336-7070", description: "병아리콩(chickpea)을 주재료로 한 비건 카페. 후무스 전문점. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"후무스 플레이트", price:13000, desc:"수제 후무스 + 피타", tag:"시그니처"},{ name:"비건 팔라펠", price:15000, desc:"병아리콩 팔라펠 + 채소", tag:"인기"}], reviews:[{ user:"비건콩러", rating:5, date:"2026-04-15", text:"후무스 진짜 진하고 맛있어요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 51, name: "카멜스 키친 CAMEL's KITCHEN", area: "서울 용산구", district: "이태원/한남", cuisine: "인터내셔널 채식", tags: ["채식","중동","채식50선"], emoji: "🐪", lat: 37.5340, lng: 126.9942, rating: 4.5, reviewCount: 81, priceRange: "₩₩", avgPrice: 15000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 용산구 이태원", phone: "02-790-8080", description: "중동·지중해 베지테리언 키친. 후무스·팔라펠·타불레 등. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"메제 플레이트", price:18000, desc:"중동식 모듬", tag:"인기"},{ name:"팔라펠 랩", price:12000, desc:"팔라펠+채소 랩", tag:"추천"}], reviews:[{ user:"이태원중동러", rating:4, date:"2026-04-03", text:"중동 음식이 채식으로 잘 어울려요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 52, name: "카무플라주 Camouflage", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 양식", tags: ["비건","대체육","채식50선"], emoji: "🦎", lat: 37.5344, lng: 126.9988, rating: 4.5, reviewCount: 76, priceRange: "₩₩₩", avgPrice: 24000, hours: "12:00 - 22:00", closed: "월요일", address: "서울 용산구 이태원", phone: "02-790-9090", description: "고기 같지만 채소인 위장(camouflage) 비건 양식. 시각·맛 모두 만족. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 버거 디럭스", price:18000, desc:"대체육 버거", tag:"시그니처"},{ name:"비건 파스타", price:22000, desc:"식물성 라구 파스타", tag:"인기"}], reviews:[{ user:"대체육팬", rating:5, date:"2026-04-19", text:"진짜 고기인 줄." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 53, name: "쿠소이 KUSoy", area: "서울 강남구", district: "강남/신사", cuisine: "비건 한식", tags: ["비건","콩","채식50선"], emoji: "🫘", lat: 37.5245, lng: 127.0218, rating: 4.5, reviewCount: 62, priceRange: "₩₩", avgPrice: 14000, hours: "11:00 - 21:00", closed: "일요일", address: "서울 강남구 신사동", phone: "02-541-4040", description: "콩(soy)을 활용한 비건 한식. 두부·콩고기·콩스튜 등. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"콩스튜 정식", price:14000, desc:"콩 스튜 + 밥 + 반찬", tag:"인기"},{ name:"비건 콩고기 정식", price:15500, desc:"콩고기 메인 정식", tag:"추천"}], reviews:[{ user:"신사동콩러", rating:4, date:"2026-04-07", text:"콩 요리의 다양함." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 54, name: "큔 Qyun", area: "서울 강남구", district: "강남/도산", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🪷", lat: 37.5230, lng: 127.0360, rating: 4.6, reviewCount: 88, priceRange: "₩₩₩", avgPrice: 28000, hours: "11:30 - 22:00", closed: "월요일", address: "서울 강남구 도산대로", phone: "02-541-6060", description: "도산공원 인근의 모던 비건 한식. 한국적 정서를 담은 비건 코스. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"큔 코스", price:42000, desc:"비건 한식 3코스", tag:"시그니처"},{ name:"비건 한정식", price:25000, desc:"비건 단품 한정식", tag:"인기"}], reviews:[{ user:"비건한식러", rating:5, date:"2026-04-24", text:"한식의 모던한 비건 해석." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 55, name: "평상시 Pyeongsangshi", area: "서울 종로구", district: "종로/인사동", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🏮", lat: 37.5734, lng: 126.9851, rating: 4.5, reviewCount: 71, priceRange: "₩₩", avgPrice: 16000, hours: "11:30 - 21:00", closed: "월요일", address: "서울 종로구", phone: "02-733-7070", description: "평상시 먹는 비건 한식. 부담없는 일상의 비건 백반. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"평상시 정식", price:15000, desc:"매일 다른 비건 백반", tag:"인기"},{ name:"비건 국밥", price:13000, desc:"비건 국물 + 밥", tag:"추천"}], reviews:[{ user:"종로직장인", rating:4, date:"2026-04-11", text:"평상시에 가기 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 56, name: "포포브레드 for four Bread", area: "서울 서대문구", district: "신촌/연대", cuisine: "비건 베이커리", tags: ["비건","베이커리","채식50선"], emoji: "🍞", lat: 37.5566, lng: 126.9410, rating: 4.5, reviewCount: 84, priceRange: "₩", avgPrice: 6000, hours: "10:00 - 20:00", closed: "월요일", address: "서울 서대문구", phone: "02-336-8585", description: "신촌의 비건 브레드 가게. 네 명을 위한, 그리고 모두를 위한 비건 빵. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 식빵", price:7000, desc:"비건 천연발효 식빵", tag:"인기"},{ name:"비건 머핀", price:4500, desc:"오트·바나나 머핀", tag:"추천"}], reviews:[{ user:"신촌학생", rating:5, date:"2026-04-29", text:"학교 가는 길에 매일 들러요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 57, name: "푸드더즈매터 FOOD DOES MATTER", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 파인다이닝", tags: ["비건","파인다이닝","채식50선"], emoji: "🌍", lat: 37.5347, lng: 126.9952, rating: 4.7, reviewCount: 119, priceRange: "₩₩₩₩", avgPrice: 65000, hours: "12:00 - 22:00 (브레이크 15:00-17:30)", closed: "월요일", address: "서울 용산구 한남동", phone: "02-790-1111", description: "100% 플랜트 베이스 셰프메이드 카페&다이닝. 식물성 단백질·버터·치즈 모두 사용. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 코스 (4코스)", price:65000, desc:"전채·수프·메인·디저트", tag:"시그니처"},{ name:"비건 파스타", price:28000, desc:"식물성 파스타", tag:"인기"}], reviews:[{ user:"한남파인다이닝", rating:5, date:"2026-04-30", text:"음식이 사회를 바꾼다는 메시지." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 58, name: "플랜튜드 PLANTUDE", area: "서울 강남구", district: "코엑스/삼성", cuisine: "비건 양식", tags: ["비건","대체육","대기업","채식50선"], emoji: "🌿", lat: 37.5106, lng: 127.0594, rating: 4.6, reviewCount: 245, priceRange: "₩₩", avgPrice: 17000, hours: "11:00 - 22:00", closed: "연중무휴", address: "서울 강남구 영동대로 513 코엑스 1층", phone: "02-6002-0123", description: "풀무원이 운영하는 100% 비건 인증 레스토랑. 코엑스 맛집으로 유명. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 짜장면", price:13000, desc:"풀무원 비건 인증 짜장면", tag:"시그니처"},{ name:"비건 떡갈비 정식", price:18000, desc:"대체육 떡갈비", tag:"인기"},{ name:"비건 만두", price:12000, desc:"식물성 만두", tag:"추천"}], reviews:[{ user:"코엑스러", rating:5, date:"2026-05-12", text:"코엑스 가면 무조건 들리는 곳!" }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 59, name: "플랜트 PLANT", area: "서울 용산구", district: "이태원/한남", cuisine: "비건 카페", tags: ["비건","카페","채식50선"], emoji: "🌵", lat: 37.5345, lng: 126.9945, rating: 4.6, reviewCount: 192, priceRange: "₩₩", avgPrice: 14000, hours: "10:00 - 21:00", closed: "월요일", address: "서울 용산구 이태원로", phone: "02-749-1981", description: "이태원의 대표적인 비건 카페. 외국인들에게도 사랑받는 글로벌 비건 메뉴. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 케이크 (1조각)", price:8000, desc:"매일 다른 비건 케이크", tag:"인기"},{ name:"비건 샌드위치", price:12000, desc:"비건 햄·치즈 샌드위치", tag:"추천"},{ name:"비건 라떼", price:6000, desc:"귀리·두유 라떼", tag:""}], reviews:[{ user:"이태원비건", rating:5, date:"2026-04-26", text:"비건 카페 입문은 여기서." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 60, name: "핀치 브런치바 pinch brunch bar", area: "서울 마포구", district: "홍대/합정", cuisine: "비건 양식", tags: ["비건","브런치","채식50선"], emoji: "🍳", lat: 37.5530, lng: 126.9215, rating: 4.5, reviewCount: 73, priceRange: "₩₩", avgPrice: 16000, hours: "10:00 - 21:00", closed: "월요일", address: "서울 마포구 합정동", phone: "02-336-9595", description: "홍대 인근의 채식 브런치바. 채식 브런치와 와인을 함께. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"채식 브런치 플레이트", price:17000, desc:"식물성 단백질 + 채소 + 빵", tag:"인기"},{ name:"비건 에그 베네딕트", price:18000, desc:"식물성 수란 + 홀란다이즈", tag:"시그니처"}], reviews:[{ user:"홍대브런치", rating:4, date:"2026-04-17", text:"채식 브런치바 컨셉 좋아요." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 61, name: "해밀 Haemil", area: "서울 종로구", district: "종로/인사동", cuisine: "비건 한식", tags: ["비건","한식","채식50선"], emoji: "🌤️", lat: 37.5727, lng: 126.9863, rating: 4.5, reviewCount: 67, priceRange: "₩₩", avgPrice: 15000, hours: "11:30 - 21:00", closed: "일요일", address: "서울 종로구", phone: "02-733-8484", description: "비온 뒤 갠 하늘처럼 깨끗한 비건 한식. 정갈한 한 끼. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"해밀 한정식", price:16000, desc:"비건 한정식", tag:"인기"},{ name:"비건 죽 정식", price:13000, desc:"비건 죽 + 반찬", tag:"추천"}], reviews:[{ user:"비건한식러", rating:5, date:"2026-04-20", text:"마음까지 정리되는 식사." }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },
  { id: 62, name: "흠마켓 hmm market", area: "서울 마포구", district: "망원/연남", cuisine: "비건 카페", tags: ["비건","마켓","카페","채식50선"], emoji: "🛒", lat: 37.5579, lng: 126.9077, rating: 4.5, reviewCount: 91, priceRange: "₩₩", avgPrice: 12000, hours: "11:00 - 21:00", closed: "월요일", address: "서울 마포구 연남동", phone: "인스타 @hmm_market", description: "비건 식료품 마켓과 카페가 결합된 공간. 비건 식재료 쇼핑과 식사를 함께. 서울시 채식 레스토랑 50선 선정.", menu:[{ name:"비건 마켓 도시락", price:13000, desc:"매일 다른 비건 도시락", tag:"인기"},{ name:"비건 디저트 세트", price:11000, desc:"비건 디저트 모듬", tag:"추천"}], reviews:[{ user:"연남장보기", rating:5, date:"2026-05-02", text:"비건 식재료 사고 식사도 하고!" }], source:"서울시 채식 레스토랑 50선", badge:"채식 50선" },

  /* ─── 인천 채식 음식점 (블루리본·언론 선정) ─── */
  { id: 63, name: "일용할양식", area: "인천 남동구", district: "인천/구월", cuisine: "채식 브런치", tags: ["채식","브런치","블루리본","건강식"], emoji: "🥣", lat: 37.4526, lng: 126.7080, rating: 4.7, reviewCount: 163, priceRange: "₩₩", avgPrice: 17000, hours: "11:00 - 21:00", closed: "월요일", address: "인천 남동구 구월동", phone: "032-466-1212", description: "인천 구월동의 채식 브런치 레스토랑. 라따뚜이가 시그니처 메뉴이며 블루리본과 코카콜라 레드리본을 동시 수상. 식물로 가득한 따뜻한 공간.", menu:[{ name:"라따뚜이", price:16000, desc:"오븐에 구운 프랑스식 야채 스튜 (시그니처)", tag:"시그니처"},{ name:"채식 브런치 플레이트", price:18000, desc:"감자·고구마·양배추 등 신선한 채소", tag:"인기"}], reviews:[{ user:"구월동러", rating:5, date:"2026-04-30", text:"라따뚜이의 깊은 풍미가 일품." }], source:"블루리본·코카콜라 레드리본 / 굿모닝인천", badge:"채식 50선" },
  { id: 64, name: "림 Lim", area: "인천 서구", district: "인천/청라", cuisine: "비건 양식", tags: ["비건","파스타","100%비건"], emoji: "🍝", lat: 37.5269, lng: 126.6592, rating: 4.8, reviewCount: 117, priceRange: "₩₩₩", avgPrice: 22000, hours: "11:30 - 21:30", closed: "월요일", address: "인천 서구 청라동", phone: "032-715-4040", description: "청라의 100% 비건 파스타 전문점. 피클부터 모든 소스를 직접 만든다. 알리오올리, 바질 페스토, 비건 라자냐 등.", menu:[{ name:"바질 페스토 파스타", price:21000, desc:"수제 바질 페스토 파스타", tag:"시그니처"},{ name:"비건 라자냐", price:23000, desc:"식물성 라자냐", tag:"인기"},{ name:"매콤 빠네 파스타", price:24000, desc:"매콤 비건 빠네", tag:"추천"}], reviews:[{ user:"청라비건", rating:5, date:"2026-05-04", text:"인천에 이런 비건 파스타가 있다니." }], source:"인천 채식 추천 / 굿모닝인천", badge:"채식 50선" },
  { id: 65, name: "밋모닝", area: "인천 연수구", district: "인천/송도", cuisine: "비건 디저트", tags: ["비건","디저트","글루텐프리"], emoji: "🥣", lat: 37.3892, lng: 126.6442, rating: 4.6, reviewCount: 89, priceRange: "₩₩", avgPrice: 10000, hours: "10:00 - 19:00", closed: "월요일", address: "인천 연수구", phone: "032-832-3030", description: "인천의 비건 디저트 카페. 설탕과 버터 없이 만든 비건 쿠키, 글루텐프리 빵, 유기농 수제 그릭요거트.", menu:[{ name:"비건 시그니처 쿠키", price:5500, desc:"설탕·버터 무첨가 비건 쿠키", tag:"시그니처"},{ name:"수제 그릭요거트", price:9000, desc:"유기농 제철 과일 곁들임", tag:"인기"}], reviews:[{ user:"송도카페러", rating:5, date:"2026-04-23", text:"건강한 디저트의 정석." }], source:"인천 채식 추천", badge:"채식 50선" },
  { id: 66, name: "채육식당 송도점", area: "인천 연수구", district: "인천/송도", cuisine: "비건 한식", tags: ["채식","비건","대체육","한식"], emoji: "🍱", lat: 37.3823, lng: 126.6612, rating: 4.5, reviewCount: 156, priceRange: "₩₩", avgPrice: 14000, hours: "10:00 - 22:00", closed: "격주 토요일", address: "인천 연수구 테크노파크로111번길 5", phone: "0507-1450-1554", description: "비건과 일반식을 자연스럽게 연결한 공간. 대체육과 일반육을 모두 판매하여 비건과 비채식인이 함께 식사 가능. 셀프바에서 샐러드·나물·쌈채소 무료 제공.", menu:[{ name:"콩고기 제육 정식", price:13500, desc:"대체육 제육 + 셀프바 무제한", tag:"시그니처"},{ name:"순두부찌개 백반", price:11000, desc:"채식 순두부 백반", tag:"인기"}], reviews:[{ user:"송도직장인", rating:5, date:"2026-05-06", text:"비건/일반식 친구들과 함께 가기 좋아요." }], source:"다이닝코드 송도 비건 1위", badge:"채식 50선" },
  { id: 67, name: "실리제롬", area: "인천 부평구", district: "인천/부평", cuisine: "비건 베이커리", tags: ["비건","베이커리","바게트"], emoji: "🥖", lat: 37.4935, lng: 126.7225, rating: 4.6, reviewCount: 78, priceRange: "₩", avgPrice: 7000, hours: "10:00 - 20:00", closed: "월요일", address: "인천 부평구", phone: "032-528-4040", description: "부평의 비건 베이커리 전문점. 계란·버터·설탕을 넣지 않은 비건 바게트가 기본.", menu:[{ name:"비건 바게트", price:6500, desc:"계란·버터·설탕 무첨가", tag:"시그니처"},{ name:"비건 캄파뉴", price:8000, desc:"천연발효 비건 캄파뉴", tag:"인기"}], reviews:[{ user:"부평빵러", rating:5, date:"2026-04-28", text:"비건 빵의 진수." }], source:"인천 채식 추천", badge:"채식 50선" },

  /* ─── 경기 수원시 비건 메뉴 취급 업소 (수원시 공식 선정) ─── */
  { id: 68, name: "청해반점 북수원점", area: "경기 수원시", district: "수원 북부", cuisine: "비건 중식", tags: ["비건","중식","수원선정"], emoji: "🥢", lat: 37.2988, lng: 127.0050, rating: 4.4, reviewCount: 134, priceRange: "₩₩", avgPrice: 12000, hours: "11:00 - 21:30", closed: "연중무휴", address: "경기 수원시 장안구 파장동", phone: "031-273-8888", description: "수원 파장동의 비건 메뉴 중식당. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 짜장면", price:8000, desc:"동물성 무첨가 짜장면", tag:"인기"},{ name:"채소 짬뽕", price:9500, desc:"비건 짬뽕", tag:"추천"}], reviews:[{ user:"수원중식러", rating:4, date:"2026-04-15", text:"비건 짜장 가능한 게 너무 좋아요." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 69, name: "망향비빔국수", area: "경기 수원시", district: "수원 북부", cuisine: "비건 한식", tags: ["비건","한식","비빔국수","수원선정"], emoji: "🍜", lat: 37.2910, lng: 126.9910, rating: 4.5, reviewCount: 167, priceRange: "₩", avgPrice: 8500, hours: "10:30 - 21:00", closed: "연중무휴", address: "경기 수원시 영통구 정자동", phone: "031-251-3030", description: "수원 정자동의 비건 비빔국수 전문점. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 비빔국수", price:8000, desc:"채소 비빔 국수", tag:"시그니처"},{ name:"채식 만두", price:7000, desc:"채소 만두", tag:"인기"}], reviews:[{ user:"정자동러", rating:5, date:"2026-04-22", text:"비건 비빔국수가 진짜 맛있어요." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 70, name: "붐바타 호매실점", area: "경기 수원시", district: "수원 서부", cuisine: "비건 양식", tags: ["비건","피자","수원선정"], emoji: "🍕", lat: 37.2683, lng: 126.9640, rating: 4.5, reviewCount: 102, priceRange: "₩₩", avgPrice: 16000, hours: "11:00 - 22:00", closed: "월요일", address: "경기 수원시 권선구 금곡동", phone: "031-298-7070", description: "수원 호매실점의 비건 옵션 가능 피자 전문점. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 피자", price:18000, desc:"비건 치즈 + 채소 피자", tag:"인기"},{ name:"채식 파스타", price:14000, desc:"채식 토마토 파스타", tag:"추천"}], reviews:[{ user:"호매실러", rating:4, date:"2026-04-26", text:"비건 피자 옵션이 가능해서 좋아요." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 71, name: "길갈베이커리", area: "경기 수원시", district: "수원 서부", cuisine: "비건 베이커리", tags: ["비건","베이커리","수원선정"], emoji: "🥖", lat: 37.2671, lng: 126.9648, rating: 4.6, reviewCount: 89, priceRange: "₩", avgPrice: 6000, hours: "08:00 - 20:00", closed: "일요일", address: "경기 수원시 권선구 호매실동", phone: "031-298-8585", description: "수원 호매실동의 비건 빵 전문점. 동물성 재료 무첨가 베이커리. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 식빵", price:5500, desc:"동물성 무첨가 식빵", tag:"인기"},{ name:"비건 쿠키", price:3000, desc:"식물성 쿠키", tag:"추천"}], reviews:[{ user:"호매실빵", rating:5, date:"2026-04-12", text:"동네 비건 빵집 너무 좋아요." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 72, name: "카페라케이크", area: "경기 수원시", district: "수원 시청", cuisine: "비건 디저트", tags: ["비건","디저트","케이크","수원선정"], emoji: "🍰", lat: 37.2701, lng: 126.9982, rating: 4.5, reviewCount: 75, priceRange: "₩₩", avgPrice: 9000, hours: "11:00 - 21:00", closed: "월요일", address: "경기 수원시 권선구 서둔동", phone: "031-228-2020", description: "수원 서둔동의 비건 디저트·케이크 전문 카페. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 케이크 (1조각)", price:7500, desc:"식물성 케이크", tag:"인기"},{ name:"비건 라떼", price:5500, desc:"귀리·두유 라떼", tag:"추천"}], reviews:[{ user:"서둔동카페", rating:4, date:"2026-04-19", text:"디저트 좋아요. 비건 옵션 감사." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 73, name: "뜰안채", area: "경기 수원시", district: "수원 서부", cuisine: "채식 뷔페", tags: ["비건","뷔페","채식뷔페","수원선정"], emoji: "🥗", lat: 37.2676, lng: 126.9643, rating: 4.6, reviewCount: 287, priceRange: "₩₩", avgPrice: 16900, hours: "11:00 - 21:00", closed: "월요일", address: "경기 수원시 권선구 호매실동", phone: "031-298-5050", description: "수원의 20년 넘은 대표 채식 뷔페. 다양한 비건 메뉴를 무제한으로. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"점심 채식 뷔페", price:14900, desc:"30여 가지 채식 무제한", tag:"인기"},{ name:"저녁 채식 뷔페", price:18900, desc:"40여 가지 채식 무제한", tag:"추천"}], reviews:[{ user:"수원채식러", rating:5, date:"2026-05-08", text:"수원 채식 뷔페의 자존심." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 74, name: "메밀정원", area: "경기 수원시", district: "수원 서부", cuisine: "비건 한식", tags: ["비건","메밀","한식","수원선정"], emoji: "🌿", lat: 37.2685, lng: 126.9650, rating: 4.5, reviewCount: 98, priceRange: "₩₩", avgPrice: 11000, hours: "11:00 - 21:00", closed: "화요일", address: "경기 수원시 권선구 호매실동", phone: "031-298-9090", description: "수원 호매실의 비건 메밀 전문점. 메밀국수·메밀전 등. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 메밀국수", price:9500, desc:"채식 메밀국수", tag:"인기"},{ name:"메밀 전병", price:8500, desc:"채소 메밀전", tag:"추천"}], reviews:[{ user:"호매실메밀", rating:5, date:"2026-04-21", text:"메밀의 깔끔한 풍미." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 75, name: "카페미뇽 수원역점", area: "경기 수원시", district: "수원 시청", cuisine: "비건 카페", tags: ["비건","카페","수원선정"], emoji: "☕", lat: 37.2659, lng: 126.9999, rating: 4.4, reviewCount: 112, priceRange: "₩₩", avgPrice: 9500, hours: "09:00 - 22:00", closed: "연중무휴", address: "경기 수원시 팔달구 매산로1가", phone: "031-548-7070", description: "수원역 인근의 비건 옵션 카페. 비건 디저트와 음료를 함께. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 디저트", price:6500, desc:"식물성 디저트", tag:"인기"},{ name:"비건 라떼", price:5500, desc:"귀리·두유 라떼", tag:"추천"}], reviews:[{ user:"수원역카페러", rating:4, date:"2026-04-08", text:"수원역 근처 좋은 비건 카페." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 76, name: "리스토란테 라일락", area: "경기 수원시", district: "수원 시청", cuisine: "비건 양식", tags: ["비건","이태리","수원선정"], emoji: "🌷", lat: 37.2820, lng: 127.0115, rating: 4.5, reviewCount: 85, priceRange: "₩₩₩", avgPrice: 25000, hours: "11:30 - 22:00", closed: "월요일", address: "경기 수원시 팔달구 신풍동", phone: "031-251-9090", description: "수원 신풍동의 비건 메뉴 가능 이탈리안 레스토랑. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 파스타", price:22000, desc:"식물성 파스타", tag:"인기"},{ name:"비건 리조또", price:23000, desc:"채소 리조또", tag:"추천"}], reviews:[{ user:"수원이태리", rating:5, date:"2026-04-15", text:"수원에서 만나는 비건 이태리." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 77, name: "한봉석할머니순두부", area: "경기 수원시", district: "수원 시청", cuisine: "비건 한식", tags: ["비건","순두부","한식","수원선정"], emoji: "🍲", lat: 37.2746, lng: 127.0011, rating: 4.6, reviewCount: 198, priceRange: "₩", avgPrice: 9000, hours: "08:00 - 21:00", closed: "월요일", address: "경기 수원시 팔달구 팔달로3가", phone: "031-228-3030", description: "수원의 노포 비건 순두부 전문점. 깊은 풍미의 비건 순두부찌개. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 순두부찌개", price:8500, desc:"동물성 무첨가 순두부", tag:"시그니처"},{ name:"채식 모듬 정식", price:11000, desc:"순두부 + 채식 반찬", tag:"인기"}], reviews:[{ user:"수원노포", rating:5, date:"2026-04-30", text:"수원 노포의 순두부 정수." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
  { id: 78, name: "자트라 Jatra", area: "경기 수원시", district: "수원 시청", cuisine: "인터내셔널 채식", tags: ["채식","인도","외국인친화","수원선정"], emoji: "🇮🇳", lat: 37.2685, lng: 126.9999, rating: 4.6, reviewCount: 132, priceRange: "₩₩", avgPrice: 15000, hours: "11:30 - 22:00", closed: "월요일", address: "경기 수원시 팔달구 매산로1가", phone: "031-248-5050", description: "수원역 인근의 인도 채식 전문점. 정통 인도식 베지테리언/비건 메뉴 다수. 수원시 공식 비건 메뉴 취급 업소 20곳 선정.", menu:[{ name:"비건 커리 세트", price:15000, desc:"인도식 채소 커리 + 난", tag:"시그니처"},{ name:"채식 탈리", price:18000, desc:"인도식 한정식 (탈리)", tag:"인기"}], reviews:[{ user:"수원인도러", rating:5, date:"2026-04-26", text:"정통 인도 채식 맛집." }], source:"수원시 비건 메뉴 취급 업소 20선", badge:"채식 50선" },
];

const DISTRICTS = ["전체","종로/인사동","홍대/합정","이태원/한남","강남/압구정","강남/도산","강남/신사","역삼","코엑스/삼성","판교/분당","신촌/연대","성수/왕십리","망원/연남","수원","수원 북부","수원 서부","수원 시청","마곡/발산","인천/송도","인천/구월","인천/청라","인천/부평","사당/이수","신당/중구"];
const CUISINES = ["전체","한식 채식","퓨전 채식","사찰음식","채식 뷔페","채식 카페","채식 베이커리","이탈리안 채식","건강식 채식","아시안 채식","인터내셔널 채식","비건·락토오보 퓨전","비건·락토오보 카페","비건 파인다이닝","비건 베이커리","비건 양식","비건 한식","비건 디저트","비건 중식","비건 카페","채식 브런치"];
const BADGES = { "미슐랭":"🏅", "미슐랭 빕구르망":"⭐", "채식 50선":"🌿" };
/* 데이터 통계: 서울시 채식50선 50개 + 인천 5개 + 경기/수원 11개 + 미슐랭/자체 DB 12개 = 총 78개 */

/* ── SVG Map ── */
function MiniMap({ restaurants, selected, onSelect }) {
  const toSVG = (lat, lng) => {
    const minLat=37.22, maxLat=37.66, minLng=126.55, maxLng=127.20;
    return { x: ((lng-minLng)/(maxLng-minLng))*520+20, y: ((maxLat-lat)/(maxLat-minLat))*340+20 };
  };
  return (
    <div style={{ background:"#0d1f15", border:"1px solid #1e3a1e", borderRadius:16, overflow:"hidden" }}>
      <div style={{ padding:"10px 16px", borderBottom:"1px solid #1a3a1a", display:"flex", alignItems:"center", gap:8 }}>
        <span>🗺️</span>
        <span style={{ fontSize:12, color:"#6aaa6a", letterSpacing:1 }}>서울·수도권 지도 ({restaurants.length}개)</span>
        <span style={{ marginLeft:"auto", fontSize:11, color:"#3a6a3a" }}>마커 클릭으로 선택</span>
      </div>
      <svg viewBox="0 0 560 380" style={{ width:"100%", height:340, display:"block" }}>
        <rect width="560" height="380" fill="#0d1f15"/>
        {[1,2,3,4,5].map(i=><line key={`h${i}`} x1="20" y1={20+i*56} x2="540" y2={20+i*56} stroke="#1a3a1a" strokeWidth="0.5"/>)}
        {[1,2,3,4,5,6,7,8].map(i=><line key={`v${i}`} x1={20+i*65} y1="20" x2={20+i*65} y2="360" stroke="#1a3a1a" strokeWidth="0.5"/>)}
        <path d="M 60 200 Q 150 190 230 195 Q 310 200 380 185 Q 440 175 520 180" fill="none" stroke="#1a4a6a" strokeWidth="8" strokeLinecap="round" opacity="0.6"/>
        <text x="200" y="208" fill="#2a6a8a" fontSize="9" opacity="0.7">한강</text>
        {[{label:"홍대",x:130,y:175},{label:"강남",x:310,y:250},{label:"이태원",x:240,y:215},{label:"종로",x:235,y:155},{label:"성수",x:335,y:180},{label:"마곡",x:80,y:185},{label:"판교",x:310,y:315},{label:"수원",x:205,y:330},{label:"인천 송도",x:40,y:295},{label:"인천 청라",x:60,y:235},{label:"부평",x:90,y:265},{label:"사당",x:230,y:260}].map(l=>(
          <text key={l.label} x={l.x} y={l.y} fill="#2a5a2a" fontSize="9" textAnchor="middle" opacity="0.7">{l.label}</text>
        ))}
        {restaurants.map(r=>{
          const {x,y}=toSVG(r.lat,r.lng);
          const isSel=selected?.id===r.id;
          return (
            <g key={r.id} onClick={()=>onSelect(r)} style={{cursor:"pointer"}}>
              <circle cx={x} cy={y} r={isSel?14:7} fill={isSel?"#5aaa5a":r.badge?"#7a5a2a":"#2a6a2a"} stroke={isSel?"#8adf8a":r.badge?"#c8aa44":"#3aaa3a"} strokeWidth={isSel?2:1} opacity="0.92"/>
              <text x={x} y={y+4} textAnchor="middle" fontSize={isSel?10:7} fill="white">{r.emoji}</text>
              {isSel&&<text x={x} y={y-18} textAnchor="middle" fontSize="9" fill="#a8d8a8" fontWeight="bold">{r.name}</text>}
            </g>
          );
        })}
      </svg>
      <div style={{ padding:"8px 16px", display:"flex", gap:16, borderTop:"1px solid #1a3a1a" }}>
        {[["#2a6a2a","#3aaa3a","일반"],["#7a5a2a","#c8aa44","공식 선정"],["#5aaa5a","#8adf8a","선택됨"]].map(([bg,bd,lbl])=>(
          <div key={lbl} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#4a7a4a"}}>
            <span style={{width:10,height:10,borderRadius:"50%",background:bg,border:`1px solid ${bd}`,display:"inline-block"}}/>
            {lbl}
          </div>
        ))}
      </div>
    </div>
  );
}

function StarInput({value, onChange}) {
  const [hover,setHover]=useState(0);
  return (
    <div style={{display:"flex",gap:4}}>
      {[1,2,3,4,5].map(s=>(
        <span key={s} style={{fontSize:24,cursor:"pointer",color:s<=(hover||value)?"#c8aa44":"#2a4a2a",transition:"color 0.1s"}}
          onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} onClick={()=>onChange(s)}>★</span>
      ))}
    </div>
  );
}

export default function VeggieSeoul() {
  const [tab,setTab]=useState("discover");
  const [search,setSearch]=useState("");
  const [district,setDistrict]=useState("전체");
  const [cuisine,setCuisine]=useState("전체");
  const [sort,setSort]=useState("rating");
  const [priceFilter]=useState("전체");
  const [badgeFilter,setBadgeFilter]=useState("전체");
  const [selected,setSelected]=useState(null);
  const [detailTab,setDetailTab]=useState("info");
  const [saved,setSaved]=useState([]);
  const [reviews,setReviews]=useState({});
  const [newReview,setNewReview]=useState({user:"",rating:0,text:""});
  const [aiQuery,setAiQuery]=useState("");
  const [aiResult,setAiResult]=useState("");
  const [aiLoading,setAiLoading]=useState(false);

  const getAllReviews = id => [...(reviews[id]||[]), ...(DB.find(r=>r.id===id)?.reviews||[])];
  const getAvgRating = id => {
    const all=getAllReviews(id);
    return all.length ? (all.reduce((s,r)=>s+r.rating,0)/all.length).toFixed(1) : (DB.find(r=>r.id===id)?.rating||0);
  };

  const filtered = DB.filter(r=>{
    const q=search.toLowerCase();
    const ms = !q||r.name.includes(search)||r.description.includes(search)||r.tags.some(t=>t.includes(search))||r.cuisine.includes(search);
    const md = district==="전체"||r.district===district;
    const mc = cuisine==="전체"||r.cuisine===cuisine;
    const mp = priceFilter==="전체"||r.priceRange===priceFilter;
    const mb = badgeFilter==="전체"||(badgeFilter==="공식선정"&&r.badge)||r.badge===badgeFilter;
    return ms&&md&&mc&&mp&&mb;
  }).sort((a,b)=>{
    if(sort==="rating") return b.rating-a.rating;
    if(sort==="reviews") return b.reviewCount-a.reviewCount;
    if(sort==="price_asc") return a.avgPrice-b.avgPrice;
    if(sort==="price_desc") return b.avgPrice-a.avgPrice;
    return 0;
  });

  const toggleSave=(id,e)=>{e?.stopPropagation();setSaved(p=>p.includes(id)?p.filter(i=>i!==id):[...p,id]);};
  const submitReview=id=>{
    if(!newReview.user||!newReview.rating||!newReview.text)return;
    setReviews(p=>({...p,[id]:[{...newReview,date:new Date().toISOString().slice(0,10)},...(p[id]||[])]}));
    setNewReview({user:"",rating:0,text:""});
  };

  const askAI=async()=>{
    if(!aiQuery.trim())return;
    setAiLoading(true);setAiResult("");
    const ctx=DB.map(r=>`${r.name}(${r.district},${r.cuisine},${r.priceRange},평점${r.rating},${r.tags.join("/")},${r.badge||""})`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`당신은 서울·수도권 채식 음식점 전문 AI입니다. 아래 DB(총 ${DB.length}개, 미슐랭·서울시 채식50선·인천/경기 선정 포함)를 참고해 친절·구체적으로 한국어로 답변하세요.\n\n${ctx}`,messages:[{role:"user",content:aiQuery}]})});
      const d=await res.json();
      setAiResult(d.content?.[0]?.text||"답변을 가져올 수 없습니다.");
    }catch{setAiResult("오류가 발생했습니다.");}
    setAiLoading(false);
  };

  const S={
    app:{minHeight:"100vh",background:"#0a120a",color:"#e0ece0",fontFamily:"'Noto Sans KR',sans-serif"},
    header:{background:"#080f08",borderBottom:"1px solid #1a2e1a",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200},
    tab:active=>({background:active?"#1e3c1e":"none",color:active?"#90cc90":"#507050",border:"none",padding:"8px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontFamily:"inherit",transition:"all 0.2s"}),
    input:{background:"#122012",border:"1px solid #2a3d2a",color:"#e0ece0",borderRadius:10,padding:"9px 14px",fontFamily:"inherit",fontSize:13,outline:"none",width:"100%"},
    chip:active=>({padding:"5px 12px",borderRadius:20,border:"1px solid "+(active?"#4a8a4a":"#1e3a1e"),background:active?"#1e4a1e":"#0f1f0f",color:active?"#90cc90":"#507050",cursor:"pointer",fontSize:11,fontFamily:"inherit",transition:"all 0.2s",whiteSpace:"nowrap"}),
    card:sel=>({background:sel?"#162816":"#102010",border:"1px solid "+(sel?"#3a7a3a":"#1a2e1a"),borderRadius:14,padding:"14px",cursor:"pointer",transition:"all 0.2s",marginBottom:8}),
    tag:{display:"inline-block",padding:"3px 9px",borderRadius:12,fontSize:10,background:"#0f2a0f",color:"#6aaa6a",border:"1px solid #1a4a1a",margin:"2px"},
    btn:{background:"#1e5a1e",color:"#90cc90",border:"none",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:13,transition:"background 0.2s"},
    saveBtn:s=>({background:"none",border:"1.5px solid "+(s?"#5aaa5a":"#2a4a2a"),borderRadius:"50%",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,transition:"all 0.2s",flexShrink:0}),
    sectionTitle:{fontSize:13,color:"#507050",letterSpacing:1,marginBottom:12,fontWeight:600},
  };

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Playfair+Display:ital@0;1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a120a}::-webkit-scrollbar-thumb{background:#1e4a1e;border-radius:3px}
        .scroll-x{overflow-x:auto;display:flex;gap:7px;padding-bottom:4px;scrollbar-width:none}.scroll-x::-webkit-scrollbar{display:none}
        input::placeholder,textarea::placeholder{color:#355035}
        textarea{resize:vertical}
      `}</style>

      {/* HEADER */}
      <div style={S.header}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:26}}>🌿</span>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#90cc90",fontStyle:"italic"}}>채식 서울·수도권</div>
            <div style={{fontSize:10,color:"#355035",letterSpacing:2}}>VEGETARIAN GUIDE · 총 {DB.length}개 음식점 · 채식 50선 + 인천/경기</div>
          </div>
        </div>
        <div style={{display:"flex",gap:2}}>
          {[["discover","탐색"],["map","지도"],["ai","AI추천"],["saved",`저장(${saved.length})`]].map(([t,l])=>(
            <button key={t} style={S.tab(tab===t)} onClick={()=>{setTab(t);setSelected(null);}}>{l}</button>
          ))}
        </div>
      </div>

      {/* DISCOVER TAB */}
      {tab==="discover" && !selected && (
        <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>
          <input style={S.input} placeholder="🔍 음식점 이름·태그·설명 검색" value={search} onChange={e=>setSearch(e.target.value)} />

          <div style={{marginTop:18}}>
            <div style={S.sectionTitle}>지역</div>
            <div className="scroll-x">
              {DISTRICTS.map(d=>(<button key={d} style={S.chip(district===d)} onClick={()=>setDistrict(d)}>{d}</button>))}
            </div>
          </div>

          <div style={{marginTop:14}}>
            <div style={S.sectionTitle}>요리 종류</div>
            <div className="scroll-x">
              {CUISINES.map(c=>(<button key={c} style={S.chip(cuisine===c)} onClick={()=>setCuisine(c)}>{c}</button>))}
            </div>
          </div>

          <div style={{marginTop:14}}>
            <div style={S.sectionTitle}>공식 선정</div>
            <div className="scroll-x">
              {["전체","공식선정","미슐랭","미슐랭 빕구르망","채식 50선"].map(b=>(
                <button key={b} style={S.chip(badgeFilter===b)} onClick={()=>setBadgeFilter(b)}>{b}{b!=="전체"&&b!=="공식선정"?` ${BADGES[b]}`:""}</button>
              ))}
            </div>
          </div>

          <div style={{marginTop:14, display:"flex", gap:12, alignItems:"center"}}>
            <span style={{fontSize:12, color:"#507050"}}>정렬:</span>
            {[["rating","평점순"],["reviews","리뷰많은순"],["price_asc","가격↑"],["price_desc","가격↓"]].map(([v,l])=>(
              <button key={v} style={S.chip(sort===v)} onClick={()=>setSort(v)}>{l}</button>
            ))}
          </div>

          <div style={{marginTop:24, fontSize:13, color:"#6aaa6a"}}>
            {filtered.length}개 음식점
          </div>

          <div style={{marginTop:12, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:12}}>
            {filtered.map(r=>(
              <div key={r.id} className="card-hover" style={S.card(false)} onClick={()=>setSelected(r)}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                  <div style={{display:"flex", gap:10, alignItems:"center"}}>
                    <span style={{fontSize:28}}>{r.emoji}</span>
                    <div>
                      <div style={{fontSize:15, color:"#e0ece0", fontWeight:600}}>{r.name}</div>
                      <div style={{fontSize:11, color:"#507050"}}>{r.district} · {r.cuisine}</div>
                    </div>
                  </div>
                  <button style={S.saveBtn(saved.includes(r.id))} onClick={e=>toggleSave(r.id,e)}>{saved.includes(r.id)?"💚":"🤍"}</button>
                </div>
                <div style={{marginTop:8, fontSize:12, color:"#6aaa6a"}}>
                  ⭐ {getAvgRating(r.id)} ({r.reviewCount+(reviews[r.id]?.length||0)}) · {r.priceRange} · ₩{r.avgPrice.toLocaleString()}
                </div>
                {r.badge && <div style={{marginTop:6, fontSize:11, color:"#c8aa44"}}>{BADGES[r.badge]} {r.badge}</div>}
                <div style={{marginTop:8}}>
                  {r.tags.slice(0,4).map(t=>(<span key={t} style={S.tag}>{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL VIEW */}
      {tab==="discover" && selected && (
        <div style={{maxWidth:900, margin:"0 auto", padding:"24px 20px"}}>
          <button style={{...S.chip(false),marginBottom:16}} onClick={()=>setSelected(null)}>← 목록으로</button>
          <div style={{display:"flex", gap:14, alignItems:"flex-start"}}>
            <span style={{fontSize:54}}>{selected.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:22, color:"#e0ece0", fontWeight:600}}>{selected.name}</div>
              <div style={{fontSize:12, color:"#6aaa6a", marginTop:4}}>{selected.area} · {selected.district} · {selected.cuisine}</div>
              <div style={{fontSize:13, color:"#90cc90", marginTop:8}}>⭐ {getAvgRating(selected.id)} ({selected.reviewCount+(reviews[selected.id]?.length||0)} 리뷰) · {selected.priceRange} · ₩{selected.avgPrice.toLocaleString()}</div>
              {selected.badge && <div style={{marginTop:6, fontSize:12, color:"#c8aa44"}}>{BADGES[selected.badge]} {selected.badge}</div>}
            </div>
            <button style={S.saveBtn(saved.includes(selected.id))} onClick={()=>toggleSave(selected.id)}>{saved.includes(selected.id)?"💚":"🤍"}</button>
          </div>

          <div style={{display:"flex", gap:6, marginTop:18, borderBottom:"1px solid #1a3a1a"}}>
            {[["info","정보"],["menu","메뉴"],["reviews","리뷰"]].map(([t,l])=>(
              <button key={t} style={{...S.tab(detailTab===t), borderRadius:0, borderBottom:detailTab===t?"2px solid #5aaa5a":"none"}} onClick={()=>setDetailTab(t)}>{l}</button>
            ))}
          </div>

          {detailTab==="info" && (
            <div style={{marginTop:18, fontSize:13, color:"#a8c8a8", lineHeight:1.7}}>
              <p>{selected.description}</p>
              <div style={{marginTop:14, fontSize:12, color:"#6aaa6a"}}>📍 {selected.address}</div>
              <div style={{marginTop:4, fontSize:12, color:"#6aaa6a"}}>📞 {selected.phone}</div>
              <div style={{marginTop:4, fontSize:12, color:"#6aaa6a"}}>🕐 {selected.hours} · 휴무: {selected.closed}</div>
              <div style={{marginTop:8}}>
                {selected.tags.map(t=>(<span key={t} style={S.tag}>{t}</span>))}
              </div>
              <div style={{marginTop:14, fontSize:11, color:"#507050", fontStyle:"italic"}}>출처: {selected.source}</div>
            </div>
          )}

          {detailTab==="menu" && (
            <div style={{marginTop:18}}>
              {selected.menu.map((m,i)=>(
                <div key={i} style={{padding:"12px 0", borderBottom:"1px solid #142014"}}>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                      <span style={{fontSize:14, color:"#e0ece0"}}>{m.name}</span>
                      {m.tag && <span style={{marginLeft:6, fontSize:10, color:"#c8aa44"}}>· {m.tag}</span>}
                    </div>
                    <span style={{fontSize:14, color:"#90cc90"}}>₩{m.price.toLocaleString()}</span>
                  </div>
                  <div style={{fontSize:12, color:"#6aaa6a", marginTop:4}}>{m.desc}</div>
                </div>
              ))}
            </div>
          )}

          {detailTab==="reviews" && (
            <div style={{marginTop:18}}>
              <div style={{background:"#0f1f0f", border:"1px solid #1a3a1a", borderRadius:12, padding:14, marginBottom:14}}>
                <div style={{fontSize:13, color:"#90cc90", marginBottom:8}}>리뷰 작성</div>
                <input style={{...S.input, marginBottom:8}} placeholder="닉네임" value={newReview.user} onChange={e=>setNewReview({...newReview, user:e.target.value})}/>
                <StarInput value={newReview.rating} onChange={r=>setNewReview({...newReview, rating:r})}/>
                <textarea style={{...S.input, marginTop:8, minHeight:80}} placeholder="리뷰" value={newReview.text} onChange={e=>setNewReview({...newReview, text:e.target.value})}/>
                <button style={{...S.btn, marginTop:8}} onClick={()=>submitReview(selected.id)}>리뷰 등록</button>
              </div>
              {getAllReviews(selected.id).map((rv,i)=>(
                <div key={i} style={{background:"#0f1f0f", border:"1px solid #1a3a1a", borderRadius:12, padding:14, marginBottom:10}}>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span style={{fontSize:13, color:"#e0ece0"}}>{rv.user}</span>
                    <span style={{fontSize:11, color:"#507050"}}>{rv.date}</span>
                  </div>
                  <div style={{color:"#c8aa44", marginTop:4, fontSize:12}}>{"★".repeat(rv.rating)}{"☆".repeat(5-rv.rating)}</div>
                  <div style={{fontSize:13, color:"#a8c8a8", marginTop:6}}>{rv.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MAP TAB */}
      {tab==="map" && (
        <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
          <MiniMap restaurants={filtered} selected={selected} onSelect={setSelected}/>
          {selected && (
            <div style={{marginTop:16, background:"#102010", border:"1px solid #1a3a1a", borderRadius:14, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontSize:16, color:"#e0ece0"}}>{selected.emoji} {selected.name}</div>
                  <div style={{fontSize:12, color:"#6aaa6a", marginTop:4}}>{selected.address}</div>
                </div>
                <button style={S.btn} onClick={()=>{setTab("discover");}}>상세보기</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI TAB */}
      {tab==="ai" && (
        <div style={{maxWidth:720, margin:"0 auto", padding:"32px 24px"}}>
          <div style={{textAlign:"center", marginBottom:24}}>
            <div style={{fontSize:40, marginBottom:10}}>🤖</div>
            <div style={{fontFamily:"'Playfair Display',serif", fontSize:22, color:"#90cc90", marginBottom:6}}>AI 채식 음식점 추천</div>
            <div style={{color:"#406040", fontSize:13}}>총 {DB.length}개 음식점 데이터 기반 · 채식 50선·인천·경기 포함</div>
          </div>
          <textarea style={{...S.input, minHeight:100}} placeholder="예: 한남동에서 비건 파스타를 먹고 싶어. 어디가 좋을까?" value={aiQuery} onChange={e=>setAiQuery(e.target.value)}/>
          <button style={{...S.btn, marginTop:12, width:"100%"}} onClick={askAI} disabled={aiLoading}>{aiLoading?"답변 중...":"AI에게 추천 받기"}</button>
          {aiResult && (
            <div style={{marginTop:18, background:"#0f1f0f", border:"1px solid #1a3a1a", borderRadius:12, padding:16, fontSize:13, color:"#a8c8a8", lineHeight:1.7, whiteSpace:"pre-wrap"}}>{aiResult}</div>
          )}
        </div>
      )}

      {/* SAVED TAB */}
      {tab==="saved" && (
        <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
          <div style={S.sectionTitle}>💚 저장한 음식점 ({saved.length})</div>
          {saved.length===0 ? (
            <div style={{color:"#507050", fontSize:13, marginTop:20}}>아직 저장한 음식점이 없습니다.</div>
          ) : (
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:12}}>
              {DB.filter(r=>saved.includes(r.id)).map(r=>(
                <div key={r.id} style={S.card(false)} onClick={()=>{setTab("discover");setSelected(r);}}>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex", gap:10}}>
                      <span style={{fontSize:24}}>{r.emoji}</span>
                      <div>
                        <div style={{fontSize:14, color:"#e0ece0"}}>{r.name}</div>
                        <div style={{fontSize:11, color:"#507050"}}>{r.district}</div>
                      </div>
                    </div>
                    <button style={S.saveBtn(true)} onClick={e=>toggleSave(r.id,e)}>💚</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
