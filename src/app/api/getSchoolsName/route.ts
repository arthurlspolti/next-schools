import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/services/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const idSchoolsData = await prisma.dados.findMany({
      select: {
        id_escola: true,
      },
    });

    const idsSchools = idSchoolsData
      .filter(({ id_escola }) => id_escola !== null)
      .map(({ id_escola }) => id_escola) as number[];

    const schoolsNames = await prisma.nomes.findMany({
      where: {
        INEP: {
          in: idsSchools,
        },
      },
      select: {
        INEP: true,
        nomeEscolas: true,
      },
    });

    const result = schoolsNames.map(({ INEP, nomeEscolas }) => ({
      id_escola: INEP,
      nome_escola: nomeEscolas,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao obter nomes das escolas:", error);
    return NextResponse.json({ error: "Erro ao obter nomes das escolas" });
  }
}
