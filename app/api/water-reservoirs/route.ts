import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

// Esta ruta de API simula cómo se implementaría el web scraping en un entorno real
// En una aplicación real, este código se ejecutaría en el servidor

export async function GET() {
  try {
    // Obtener la página web de la ACA
    const response = await fetch(
      "https://aca.gencat.cat/ca/laigua/estat-del-medi-hidric/recursos-disponibles/estat-de-les-reserves-daigua-als-embassaments/",
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      throw new Error("Error al obtener la página de la ACA")
    }

    const html = await response.text()

    // Usar cheerio para analizar el HTML
    const $ = cheerio.load(html)

    // Extraer el porcentaje global de las cuencas internas
    // Nota: Este selector es hipotético y debería ajustarse según la estructura real de la página
    const globalPercentageText = $(".percentage-value").first().text()
    const globalPercentage = Number.parseFloat(globalPercentageText.replace("%", "").trim())

    // Extraer datos de cada embalse
    // Nota: Estos selectores son hipotéticos
    const reservoirs = []

    $(".reservoir-item").each((i, el) => {
      const name = $(el).find(".reservoir-name").text().trim()
      const percentage = Number.parseFloat($(el).find(".reservoir-percentage").text().replace("%", "").trim())
      const currentVolume = Number.parseFloat($(el).find(".current-volume").text().replace("hm³", "").trim())
      const maxVolume = Number.parseFloat($(el).find(".max-volume").text().replace("hm³", "").trim())

      // Determinar la cuenca según el nombre
      let basin = "Altres"
      if (["Sau", "Susqueda", "El Pasteral"].includes(name)) {
        basin = "Ter"
      } else if (["La Baells", "La Llosa del Cavall", "Sant Ponç"].includes(name)) {
        basin = "Llobregat"
      } else if (["Siurana", "Riudecanyes"].includes(name)) {
        basin = "Siurana-Riudecanyes"
      } else if (["Darnius Boadella"].includes(name)) {
        basin = "Muga"
      }

      reservoirs.push({
        nom: name,
        percentatge: percentage,
        volumActual: currentVolume,
        volumMaxim: maxVolume,
        conca: basin,
        dataActualitzacio: new Date().toISOString(),
      })
    })

    return NextResponse.json({
      globalPercentage,
      reservoirs,
      lastUpdate: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error en el web scraping:", error)
    return NextResponse.json({ error: "Error al obtener los datos de los embalses" }, { status: 500 })
  }
}

