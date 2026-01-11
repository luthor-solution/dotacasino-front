type DEVICE = "DESKTOP" | "MOBILE";

export interface OpenGameApiResponse {
  status: "success";
  html: string;
  game: {
    slug: string;
    devices: DEVICE[];
  };
}

export const reponseOpenGame = (data: OpenGameApiResponse) => {
  return {
    ok: data.status == "success",
  };
};
