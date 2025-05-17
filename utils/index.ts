
// Función de utilidad para logging con colores ANSI y arte ASCII
export function logSection(title: string, content: string): void {
  // Colores ANSI
  const reset = "\x1b[0m";
  const cyan = "\x1b[36m";
  const yellow = "\x1b[33m";
  const magenta = "\x1b[35m";
  const brightGreen = "\x1b[92m";

  // Arte ASCII para la cabecera según el tipo de sección
  let asciiArt = "//==> ";

  console.log('\n' + cyan + '='.repeat(80) + reset);
  console.log(yellow + `${asciiArt}${title.toUpperCase()}${asciiArt}` + reset);
  console.log(magenta + '-'.repeat(80) + reset);
  console.log(brightGreen + content + reset + '\n');
}
