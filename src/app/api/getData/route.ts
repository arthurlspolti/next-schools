import prisma from "@/app/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const schoolsData = await prisma.dados.findMany({
      select: {
        id: true,
        ano: true,
        id_escola: true,
        rede: true,
        ensino: true,
        anos_escolares: true,
        taxa_aprovacao: true,
        indicador_rendimento: true,
        nota_saeb_matematica: true,
        nota_saeb_lingua_portuguesa: true,
        nota_saeb_media_padronizada: true,
        ideb: true,
        projecao: true,
      },
    });

    return NextResponse.json(schoolsData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "Ocorreu um erro com o servidor." });
    }
  }
}
