// index.js
import puppeteer from "puppeteer";
import axios from "axios";
import colors from "colors";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

async function main() {
  const login = await axios
    .post("http://localhost:3001/v1/auth/login", {
      email: "victoralvarezsaucedo@gmail.com",
      password: "123987xd",
    })
    .then((r) => r.data);

  const games = await axios
    .get("http://localhost:3001/v1/games")
    .then((r) => r.data.items);

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/124.0.0.0 Safari/537.36"
  );

  await page.setExtraHTTPHeaders({
    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
  });

  for (const g of games) {
    try {
      const gameInfo = await axios
        .post(
          `http://localhost:3001/v1/games/openGame/${g.slug}`,
          {
            provider: "322e916a-d91e-48bc-b291-0041b96751e3",
          },
          {
            headers: {
              Authorization: `Bearer ${login.access_token}`,
            },
          }
        )
        .then((r) => r.data);

      if (gameInfo.error === "hall_balance_less_100") {
        console.error("NOT ENOUGHT BALANCE");
        continue;
      }

      if (!gameInfo.content.game.url) {
        console.error("URL NULL");
        continue;
      }

      console.log(g.slug, colors.green("funciona"));

      await page.goto(gameInfo.content.game.url.replace("http:", "https:"), {
        waitUntil: "networkidle0",
      });

      await sleep(3000);
      console.log("siguiente");
    } catch (err) {
      console.error(err);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error("Error en Puppeteer:", err);
  process.exit(1);
});
