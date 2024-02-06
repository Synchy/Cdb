import axios from "axios";
import { LanguageModels } from "../models/LanguageModels";

const packages = [
  {
    language: "node",
    version: "18.15.0",
  },
  {
    language: "typescript",
    version: "5.0.3",
  },
  {
    language: "php",
    version: "8.2.3",
  },
];

const addLanguages = async (datas: any) => {
  for (const data of datas) {
    const language = await LanguageModels.findOne({
      where: { name: data.language },
    });
    if (language === null) {
      await LanguageModels.create({
        name: data.language,
        version: data.version,
      }).save();
      console.log(`${data.language} ajouté en base de données!!.`);
    } else {
      console.log(`Rien a ajouter.`);
    }
  }
};

const checkPackages = async () => {
  for (const item of packages) {
    await addPackages(item);
  }
};

export const getRuntimes = async () => {
  await checkPackages();

  const response = await axios.get(
    String(process.env.PISTONAPI_URL) + "runtimes"
  );

  await addLanguages(response.data);
  try {
  } catch (error: any) {
    console.log("error", error);
  }
};

const addPackages = async (item: object) => {
  try {
    console.log(item);
    await axios.post(String(process.env.PISTONAPI_URL) + "packages", item);
  } catch (error: any) {}
};
