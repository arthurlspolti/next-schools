import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/services/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Buscar todos os dados
    const schoolsData = await prisma.dados.findMany({
      select: {
        ano: true,
        id_escola: true,
        rede: true,
        ensino: true,
        anos_escolares: true,
        nota_saeb_media_padronizada: true,
      },
    });

    // Classificar os dados pela nota_saeb_media_padronizada e filtrar por ensino
    const sortedDataFundamental = [...schoolsData]
      .filter(
        (a) =>
          a.nota_saeb_media_padronizada !== null && a.ensino === "fundamental"
      )
      .sort(
        (a, b) =>
          (b.nota_saeb_media_padronizada || 0) -
          (a.nota_saeb_media_padronizada || 0)
      )
      .slice(0, 5);

    const sortedDataMedio = [...schoolsData]
      .filter(
        (a) => a.nota_saeb_media_padronizada !== null && a.ensino === "medio"
      )
      .sort(
        (a, b) =>
          (b.nota_saeb_media_padronizada || 0) -
          (a.nota_saeb_media_padronizada || 0)
      )
      .slice(0, 5);

    // Pegar as 5 primeiras escolas
    const top5SchoolsFundamental = sortedDataFundamental;
    const top5SchoolsMedio = sortedDataMedio;

    // Buscar os nomes das escolas
    const schoolsNames = await prisma.nomes.findMany({
      where: {
        INEP: {
          in: [...top5SchoolsFundamental, ...top5SchoolsMedio]
            .filter((school) => school.id_escola !== null)
            .map((school) => school.id_escola as number),
        },
      },
      select: {
        INEP: true,
        nomeEscolas: true,
      },
    });

    // Adicionar os nomes das escolas aos dados
    const top5SchoolsWithNamesFundamental = top5SchoolsFundamental.map(
      (school) => {
        const schoolName = schoolsNames.find(
          (name) => name.INEP === school.id_escola
        )?.nomeEscolas;
        return {
          ...school,
          nome_escola: schoolName || "Desconhecido",
        };
      }
    );

    const top5SchoolsWithNamesMedio = top5SchoolsMedio.map((school) => {
      const schoolName = schoolsNames.find(
        (name) => name.INEP === school.id_escola
      )?.nomeEscolas;
      return {
        ...school,
        nome_escola: schoolName || "Desconhecido",
      };
    });

    return NextResponse.json({
      fundamental: top5SchoolsWithNamesFundamental,
      medio: top5SchoolsWithNamesMedio,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "Ocorreu um erro com o servidor." });
    }
  }
}
