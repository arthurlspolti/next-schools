import prisma from "@/app/services/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    if (!req.body) {
      return NextResponse.json({ error: "Corpo da solicitação vazio" });
    }
    const body = await req.json();
    const { school1, school2, year, schoolYears } = body;
    const NumberYear = parseInt(year);
    try {
      const escola1 = await prisma.nomes.findUnique({
        where: { nomeEscolas: school1 },
      });
      const escola2 = await prisma.nomes.findUnique({
        where: { nomeEscolas: school2 },
      });
      if (!escola1 || !escola2) {
        return NextResponse.json({ error: "Escola não encontrada" });
      }
      const dadosEscola1 = await prisma.dados.findMany({
        where: {
          id_escola: escola1.INEP,
          ano: NumberYear,
          anos_escolares: schoolYears,
        },
        select: {
          ano: true,
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
      const dadosEscola2 = await prisma.dados.findMany({
        where: {
          id_escola: escola2.INEP,
          ano: NumberYear,
          anos_escolares: schoolYears,
        },
        select: {
          ano: true,
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
      if (dadosEscola1.length === 0 || dadosEscola2.length === 0) {
        let message =
          "Os filtros informados não possui dados encontrados para ";
        if (dadosEscola1.length === 0) {
          message += `a escola ${school1}`;
        }
        if (dadosEscola2.length === 0) {
          if (dadosEscola1.length === 0) {
            message += " e ";
          }
          message += `a escola ${school2}`;
        }
        return NextResponse.json({ error: message });
      }
      return NextResponse.json({
        escola1: dadosEscola1,
        escola2: dadosEscola2,
      });
    } catch (error) {
      return NextResponse.json({ error: "Erro no servidor" });
    }
  } else {
    NextResponse.json({ error: "Método inválido" });
  }
}
