import { toast } from "react-toastify";

// CSS
export const BLACK_COLOR = "black" as const;
export const WHITE_COLOR = "white" as const;
export const BLUE_COLOR = "#1187cf" as const;
export const RED_COLOR = "#C02E4C" as const;
export const SKY_COLOR = "#7B9ACC" as const;
export const DEEP_BLUE_COLOR = "#5A66D7" as const;
export const PINK_COLOR = "#f6d6d6" as const;

export const SM_SIZE = "576px" as const;
export const MD_SIZE = "768px" as const;
export const LG_SIZE = "992px" as const;
export const XLG_SIZE = "1200px" as const;

export const RGB_BLACK = (opacity: number) => `
  rgba(0,0,0,${opacity})
`;

export const BORDER_THIN = (border: string, px?: number) => `
  ${border}:${px ? px : "1"}px solid rgba(0,0,0,0.15)
`;

export const BORDER_THICK = (border: string, px?: number) => `
  ${border}:${px ? px : "2"}px solid rgba(0,0,0,0.1)
`;

export const FLEX_STYLE = (justify: string, align: string) => `
  display:flex;
  justify-content:${justify};
  align-items:${align};
`;

export const GRID_STYLE = (gap: string, colums: string, row?: string) => `
  display:grid;
  grid-template-columns:${colums};
  grid-template-rows:${row};
  gap:${gap};
`;

export const MODAL_STYLE = (tailRight: string) => `
  position: absolute;
  padding: 2rem;
  ${BORDER_THIN("border")};
  background-color: ${WHITE_COLOR};
  box-shadow: 0px 0px 15px ${RGB_BLACK(0.2)};
  z-index:1;
  &:before {
    position: absolute;
    transform: rotateZ(45deg);
    z-index: 1;
    width: 9px;
    height: 9px;
    background-color: ${WHITE_COLOR};
    ${BORDER_THIN("border")};
    border-bottom: none;
    border-right: none;
    content: "";
    top: -6px;
    right: ${tailRight};
  }
`;

//JS

export const toastErrorMessage = (error: any) => {
  toast.error(error.response?.data?.data?.message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "toast",
  });
};

export const toastSuccessMessage = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "toast",
  });
};

export const goodsPosterSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 1500,
  vertical: true,
  verticalSwiping: true,
};

export const goodsFilterList = [
  "直接交換",
  "早め",
  "新しい",
  "ユニーク",
  "ポスター",
  "アルバム",
  "ぬいぐるみ",
  "担当じゃない",
  "卒業",
  "サイン",
  "カード",
  "チケット",
];

export const japanMapList = [
  { name: "北海道", eng: "hotkaido" },
  { name: "東北", eng: "tohoku" },
  { name: "関東(東京)", eng: "kanto" },
  { name: "中部", eng: "chubu" },
  { name: "関西(大阪)", eng: "kansai" },
  { name: "中国", eng: "chugoku" },
  { name: "四国", eng: "shikoku" },
  { name: "九州", eng: "kyushu" },
  { name: "沖縄", eng: "okinawa" },
];

export const NewsMainPostsettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
