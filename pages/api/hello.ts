// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chromium from '@sparticuz/chromium'
import puppeteer from "puppeteer";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://google.com");
    await new Promise((res) => setTimeout(res, 2000));
    await page.screenshot({ type: "png" });

    console.log("good");
  } catch (error) {
    console.log("error");
    console.log(error);
  }

  res.status(200).json({ name: "John Doe" });
}
