export function calculate(expression = "") {
  let value = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\^/g, "**")
    .replace(/,/g, "")
    .trim();

  // केवल सुरक्षित गणितीय characters
  if (!/^[0-9+\-*/().%\s]+$/.test(value)) {
    return null;
  }

  try {
    const result = Function(
      '"use strict"; return (' + value + ')'
    )();

    if (typeof result !== "number" || !Number.isFinite(result)) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
}

export function calculatePercentage(percent, number) {
  const p = Number(percent);
  const n = Number(number);

  if (!Number.isFinite(p) || !Number.isFinite(n)) {
    return null;
  }

  return (p / 100) * n;
}