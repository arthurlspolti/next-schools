import prisma from "@/app/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
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
        nomeEscolas: true,
      },
    });

    return NextResponse.json(schoolsNames);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "Ocorreu um erro com o servidor." });
    }
  }
}
